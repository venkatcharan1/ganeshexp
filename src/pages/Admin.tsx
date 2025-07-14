
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Upload, Trash2, Edit, Save, X, Video } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface Video {
  id: string;
  title: string;
  description: string;
  thumbnail_url?: string;
  video_file_path: string;
  youtubeUrl?: string;
  category: 'shorts' | 'full';
  created_at: string;
}

const Admin = () => {
  const [videos, setVideos] = useState<Video[]>([]);
  const [editingVideo, setEditingVideo] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    youtubeUrl: "",
    category: "full" as 'shorts' | 'full'
  });
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    fetchVideos();
  }, []);

  const fetchVideos = async () => {
    try {
      const { data, error } = await supabase
        .from('videos')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching videos:', error);
        return;
      }

      // Cast the data to ensure proper typing
      const typedVideos: Video[] = (data || []).map(video => ({
        ...video,
        category: video.category as 'shorts' | 'full',
        youtubeUrl: video.youtube_url
      }));

      setVideos(typedVideos);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const uploadFile = async (file: File, bucket: string, path: string) => {
    const { data, error } = await supabase.storage
      .from(bucket)
      .upload(path, file);

    if (error) {
      throw error;
    }

    const { data: urlData } = supabase.storage
      .from(bucket)
      .getPublicUrl(path);

    return urlData.publicUrl;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title || !formData.description || !videoFile) {
      toast({
        title: "Error",
        description: "Please fill in all required fields and select a video file",
        variant: "destructive"
      });
      return;
    }

    setIsUploading(true);

    try {
      // Upload video file
      const videoPath = `videos/${Date.now()}_${videoFile.name}`;
      const videoUrl = await uploadFile(videoFile, 'videos', videoPath);

      // Upload thumbnail if provided
      let thumbnailUrl = null;
      if (thumbnailFile) {
        const thumbnailPath = `thumbnails/${Date.now()}_${thumbnailFile.name}`;
        thumbnailUrl = await uploadFile(thumbnailFile, 'videos', thumbnailPath);
      }

      // Insert video record
      const { data, error } = await supabase
        .from('videos')
        .insert([
          {
            title: formData.title,
            description: formData.description,
            category: formData.category,
            video_file_path: videoUrl,
            thumbnail_url: thumbnailUrl,
            youtube_url: formData.youtubeUrl || null
          }
        ])
        .select();

      if (error) {
        throw error;
      }

      // Reset form
      setFormData({
        title: "",
        description: "",
        youtubeUrl: "",
        category: "full"
      });
      setVideoFile(null);
      setThumbnailFile(null);

      // Refresh videos list
      await fetchVideos();

      toast({
        title: "Success!",
        description: "Video uploaded successfully and is now visible on the website"
      });
    } catch (error) {
      console.error('Upload error:', error);
      toast({
        title: "Error",
        description: "Failed to upload video. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsUploading(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const { error } = await supabase
        .from('videos')
        .delete()
        .eq('id', id);

      if (error) {
        throw error;
      }

      await fetchVideos();
      toast({
        title: "Deleted",
        description: "Video has been removed from the website"
      });
    } catch (error) {
      console.error('Delete error:', error);
      toast({
        title: "Error",
        description: "Failed to delete video",
        variant: "destructive"
      });
    }
  };

  const handleEdit = (video: Video) => {
    setEditingVideo(video.id);
    setFormData({
      title: video.title,
      description: video.description,
      youtubeUrl: video.youtubeUrl || "",
      category: video.category
    });
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!editingVideo) return;

    try {
      const { error } = await supabase
        .from('videos')
        .update({
          title: formData.title,
          description: formData.description,
          category: formData.category,
          youtube_url: formData.youtubeUrl || null
        })
        .eq('id', editingVideo);

      if (error) {
        throw error;
      }

      setEditingVideo(null);
      setFormData({
        title: "",
        description: "",
        youtubeUrl: "",
        category: "full"
      });

      await fetchVideos();

      toast({
        title: "Updated!",
        description: "Video has been updated successfully"
      });
    } catch (error) {
      console.error('Update error:', error);
      toast({
        title: "Error",
        description: "Failed to update video",
        variant: "destructive"
      });
    }
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 p-2 sm:p-4 md:p-8 animate-fade-in">
      <div className="max-w-6xl mx-auto">
        <div className="mb-6 sm:mb-8 animate-slide-in-right">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2 text-white">
            Admin Panel
          </h1>
          <p className="text-gray-300 text-sm sm:text-base">Manage your dropshipping video content</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
          {/* Upload Form */}
          <Card className="animate-scale-in shadow-lg border border-slate-700/50 bg-slate-800/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center text-white text-lg sm:text-xl">
                <Upload className="h-4 sm:h-5 w-4 sm:w-5 mr-2 text-blue-400" />
                {editingVideo ? 'Edit Video' : 'Upload New Video'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={editingVideo ? handleUpdate : handleSubmit} className="space-y-3 sm:space-y-4">
                <div className="animate-fade-in">
                  <label className="block text-sm font-medium mb-2 text-white">Title *</label>
                  <Input
                    value={formData.title}
                    onChange={(e) => handleChange('title', e.target.value)}
                    placeholder="Enter video title"
                    required
                    className="bg-slate-700/70 border-slate-600 text-white placeholder:text-gray-400"
                  />
                </div>

                <div className="animate-fade-in" style={{ animationDelay: '0.1s' }}>
                  <label className="block text-sm font-medium mb-2 text-white">Category *</label>
                  <Select value={formData.category} onValueChange={(value: 'shorts' | 'full') => handleChange('category', value)}>
                    <SelectTrigger className="bg-slate-700/70 border-slate-600 text-white">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-800 border-slate-600">
                      <SelectItem value="shorts" className="text-white hover:bg-slate-700">Shorts</SelectItem>
                      <SelectItem value="full" className="text-white hover:bg-slate-700">Full Videos</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="animate-fade-in" style={{ animationDelay: '0.2s' }}>
                  <label className="block text-sm font-medium mb-2 text-white">Description *</label>
                  <Textarea
                    value={formData.description}
                    onChange={(e) => handleChange('description', e.target.value)}
                    placeholder="Enter video description"
                    rows={4}
                    required
                    className="bg-slate-700/70 border-slate-600 text-white placeholder:text-gray-400"
                  />
                </div>

                {!editingVideo && (
                  <>
                    <div className="animate-fade-in" style={{ animationDelay: '0.3s' }}>
                      <label className="block text-sm font-medium mb-2 text-white">Video File *</label>
                      <Input
                        type="file"
                        accept="video/*"
                        onChange={(e) => setVideoFile(e.target.files?.[0] || null)}
                        required
                        className="bg-slate-700/70 border-slate-600 text-white file:text-white file:bg-slate-600"
                      />
                    </div>

                    <div className="animate-fade-in" style={{ animationDelay: '0.4s' }}>
                      <label className="block text-sm font-medium mb-2 text-white">Thumbnail (Optional)</label>
                      <Input
                        type="file"
                        accept="image/*"
                        onChange={(e) => setThumbnailFile(e.target.files?.[0] || null)}
                        className="bg-slate-700/70 border-slate-600 text-white file:text-white file:bg-slate-600"
                      />
                    </div>
                  </>
                )}

                <div className="animate-fade-in" style={{ animationDelay: '0.5s' }}>
                  <label className="block text-sm font-medium mb-2 text-white">YouTube URL (Optional)</label>
                  <Input
                    value={formData.youtubeUrl}
                    onChange={(e) => handleChange('youtubeUrl', e.target.value)}
                    placeholder="Enter YouTube video URL"
                    type="url"
                    className="bg-slate-700/70 border-slate-600 text-white placeholder:text-gray-400"
                  />
                </div>

                <div className="flex gap-2 animate-fade-in" style={{ animationDelay: '0.6s' }}>
                  <Button type="submit" className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white" disabled={isUploading}>
                    <Save className="h-4 w-4 mr-2" />
                    {isUploading ? 'Uploading...' : editingVideo ? 'Update Video' : 'Upload Video'}
                  </Button>
                  {editingVideo && (
                    <Button
                      type="button"
                      variant="outline"
                      className="border-slate-600 text-white hover:bg-slate-700"
                      onClick={() => {
                        setEditingVideo(null);
                        setFormData({
                          title: "",
                          description: "",
                          youtubeUrl: "",
                          category: "full"
                        });
                      }}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </form>
            </CardContent>
          </Card>

          {/* Video List */}
          <Card className="animate-scale-in shadow-lg border border-slate-700/50 bg-slate-800/80 backdrop-blur-sm" style={{ animationDelay: '0.2s' }}>
            <CardHeader>
              <CardTitle className="flex items-center text-white text-lg sm:text-xl">
                <Video className="h-4 sm:h-5 w-4 sm:w-5 mr-2 text-blue-400" />
                Uploaded Videos ({videos.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 sm:space-y-4 max-h-96 overflow-y-auto">
                {videos.length === 0 ? (
                  <p className="text-gray-400 text-center py-6 sm:py-8 animate-fade-in text-sm sm:text-base">
                    No videos uploaded yet. Upload your first video to get started!
                  </p>
                ) : (
                  videos.map((video, index) => (
                    <div key={video.id} className="border border-slate-600 rounded-lg p-3 sm:p-4 space-y-2 bg-slate-700/50 animate-fade-in hover:shadow-md transition-all duration-300" style={{ animationDelay: `${index * 0.1}s` }}>
                      <div className="flex justify-between items-start">
                        <div className="flex-1 pr-2 min-w-0">
                          <h3 className="font-semibold line-clamp-1 text-white text-sm sm:text-base">{video.title}</h3>
                          <p className="text-xs sm:text-sm text-gray-300 line-clamp-2">
                            {video.description}
                          </p>
                          <div className="flex items-center gap-2 mt-2 flex-wrap">
                            <span className={`px-2 py-1 text-xs rounded ${
                              video.category === 'shorts' 
                                ? 'bg-red-600/80 text-white' 
                                : 'bg-blue-600/80 text-white'
                            }`}>
                              {video.category === 'shorts' ? 'Short' : 'Full Video'}
                            </span>
                            <span className="text-xs text-gray-400">
                              {new Date(video.created_at).toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                        <div className="flex gap-1 sm:gap-2 ml-2 flex-shrink-0">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleEdit(video)}
                            className="hover:bg-blue-600/20 border-blue-500/50 text-blue-300 hover:text-white hover:border-blue-400 p-1.5 sm:p-2 bg-blue-950/30"
                          >
                            <Edit className="h-3 w-3 sm:h-4 sm:w-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => handleDelete(video.id)}
                            className="hover:bg-red-600 p-1.5 sm:p-2 bg-red-600/80"
                          >
                            <Trash2 className="h-3 w-3 sm:h-4 sm:w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Instructions */}
        <Card className="mt-6 sm:mt-8 animate-fade-in shadow-lg border border-slate-700/50 bg-slate-800/80 backdrop-blur-sm" style={{ animationDelay: '0.4s' }}>
          <CardHeader>
            <CardTitle className="text-white text-lg sm:text-xl">Instructions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 sm:space-y-4">
            <div>
              <h4 className="font-semibold mb-2 text-white text-sm sm:text-base">How to Upload Videos:</h4>
              <ul className="list-disc list-inside space-y-1 text-xs sm:text-sm text-gray-300">
                <li>Fill in the title and description for your dropshipping video</li>
                <li>Select the category: "Shorts" for quick tips, "Full Videos" for detailed tutorials</li>
                <li>Upload your video file directly from your device</li>
                <li>Optionally upload a custom thumbnail image</li>
                <li>Optionally add a YouTube URL to allow viewers to watch on YouTube</li>
                <li>Click "Upload Video" and it will be processed and appear on your website</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2 text-white text-sm sm:text-base">Video Management:</h4>
              <ul className="list-disc list-inside space-y-1 text-xs sm:text-sm text-gray-300">
                <li>Edit video details by clicking the edit button</li>
                <li>Delete videos that are no longer relevant</li>
                <li>Videos appear on the homepage organized by category</li>
                <li>File uploads are securely stored and optimized for web delivery</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Admin;
