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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-blue-950 dark:to-indigo-950 p-8 animate-fade-in">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8 animate-slide-in-right">
          <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            Admin Panel
          </h1>
          <p className="text-muted-foreground">Manage your dropshipping video content</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Upload Form */}
          <Card className="animate-scale-in shadow-lg border-0 bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Upload className="h-5 w-5 mr-2 text-blue-600" />
                {editingVideo ? 'Edit Video' : 'Upload New Video'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={editingVideo ? handleUpdate : handleSubmit} className="space-y-4">
                <div className="animate-fade-in">
                  <label className="block text-sm font-medium mb-2">Title *</label>
                  <Input
                    value={formData.title}
                    onChange={(e) => handleChange('title', e.target.value)}
                    placeholder="Enter video title"
                    required
                    className="bg-white/50 dark:bg-slate-700/50"
                  />
                </div>

                <div className="animate-fade-in" style={{ animationDelay: '0.1s' }}>
                  <label className="block text-sm font-medium mb-2">Category *</label>
                  <Select value={formData.category} onValueChange={(value: 'shorts' | 'full') => handleChange('category', value)}>
                    <SelectTrigger className="bg-white/50 dark:bg-slate-700/50">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="shorts">Shorts</SelectItem>
                      <SelectItem value="full">Full Videos</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="animate-fade-in" style={{ animationDelay: '0.2s' }}>
                  <label className="block text-sm font-medium mb-2">Description *</label>
                  <Textarea
                    value={formData.description}
                    onChange={(e) => handleChange('description', e.target.value)}
                    placeholder="Enter video description"
                    rows={4}
                    required
                    className="bg-white/50 dark:bg-slate-700/50"
                  />
                </div>

                {!editingVideo && (
                  <>
                    <div className="animate-fade-in" style={{ animationDelay: '0.3s' }}>
                      <label className="block text-sm font-medium mb-2">Video File *</label>
                      <Input
                        type="file"
                        accept="video/*"
                        onChange={(e) => setVideoFile(e.target.files?.[0] || null)}
                        required
                        className="bg-white/50 dark:bg-slate-700/50"
                      />
                    </div>

                    <div className="animate-fade-in" style={{ animationDelay: '0.4s' }}>
                      <label className="block text-sm font-medium mb-2">Thumbnail (Optional)</label>
                      <Input
                        type="file"
                        accept="image/*"
                        onChange={(e) => setThumbnailFile(e.target.files?.[0] || null)}
                        className="bg-white/50 dark:bg-slate-700/50"
                      />
                    </div>
                  </>
                )}

                <div className="animate-fade-in" style={{ animationDelay: '0.5s' }}>
                  <label className="block text-sm font-medium mb-2">YouTube URL (Optional)</label>
                  <Input
                    value={formData.youtubeUrl}
                    onChange={(e) => handleChange('youtubeUrl', e.target.value)}
                    placeholder="Enter YouTube video URL"
                    type="url"
                    className="bg-white/50 dark:bg-slate-700/50"
                  />
                </div>

                <div className="flex gap-2 animate-fade-in" style={{ animationDelay: '0.6s' }}>
                  <Button type="submit" className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700" disabled={isUploading}>
                    <Save className="h-4 w-4 mr-2" />
                    {isUploading ? 'Uploading...' : editingVideo ? 'Update Video' : 'Upload Video'}
                  </Button>
                  {editingVideo && (
                    <Button
                      type="button"
                      variant="outline"
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
          <Card className="animate-scale-in shadow-lg border-0 bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm" style={{ animationDelay: '0.2s' }}>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Video className="h-5 w-5 mr-2 text-blue-600" />
                Uploaded Videos ({videos.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 max-h-96 overflow-y-auto">
                {videos.length === 0 ? (
                  <p className="text-muted-foreground text-center py-8 animate-fade-in">
                    No videos uploaded yet. Upload your first video to get started!
                  </p>
                ) : (
                  videos.map((video, index) => (
                    <div key={video.id} className="border rounded-lg p-4 space-y-2 bg-white/50 dark:bg-slate-700/50 animate-fade-in hover:shadow-md transition-all duration-300" style={{ animationDelay: `${index * 0.1}s` }}>
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <h3 className="font-semibold line-clamp-1">{video.title}</h3>
                          <p className="text-sm text-muted-foreground line-clamp-2">
                            {video.description}
                          </p>
                          <div className="flex items-center gap-2 mt-2">
                            <span className={`px-2 py-1 text-xs rounded ${
                              video.category === 'shorts' 
                                ? 'bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-400' 
                                : 'bg-blue-100 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400'
                            }`}>
                              {video.category === 'shorts' ? 'Short' : 'Full Video'}
                            </span>
                            <span className="text-xs text-muted-foreground">
                              {new Date(video.created_at).toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                        <div className="flex gap-2 ml-4">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleEdit(video)}
                            className="hover:bg-blue-50 dark:hover:bg-blue-900/20"
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => handleDelete(video.id)}
                            className="hover:bg-red-600"
                          >
                            <Trash2 className="h-4 w-4" />
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
        <Card className="mt-8 animate-fade-in shadow-lg border-0 bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm" style={{ animationDelay: '0.4s' }}>
          <CardHeader>
            <CardTitle>Instructions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="font-semibold mb-2">How to Upload Videos:</h4>
              <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                <li>Fill in the title and description for your dropshipping video</li>
                <li>Select the category: "Shorts" for quick tips, "Full Videos" for detailed tutorials</li>
                <li>Upload your video file directly from your device</li>
                <li>Optionally upload a custom thumbnail image</li>
                <li>Optionally add a YouTube URL to allow viewers to watch on YouTube</li>
                <li>Click "Upload Video" and it will be processed and appear on your website</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Video Management:</h4>
              <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
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
