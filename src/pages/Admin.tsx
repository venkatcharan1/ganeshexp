
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Upload, Trash2, Edit, Save, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Video {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  videoUrl: string;
  youtubeUrl?: string;
  category: 'shorts' | 'full';
  createdAt: string;
}

const Admin = () => {
  const [videos, setVideos] = useState<Video[]>([]);
  const [editingVideo, setEditingVideo] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    thumbnail: "",
    videoUrl: "",
    youtubeUrl: "",
    category: "full" as 'shorts' | 'full'
  });
  const { toast } = useToast();

  useEffect(() => {
    const savedVideos = localStorage.getItem('ganeshdrsr-videos');
    if (savedVideos) {
      setVideos(JSON.parse(savedVideos));
    }
  }, []);

  const saveVideos = (updatedVideos: Video[]) => {
    localStorage.setItem('ganeshdrsr-videos', JSON.stringify(updatedVideos));
    setVideos(updatedVideos);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title || !formData.description || !formData.videoUrl) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    const newVideo: Video = {
      id: Date.now().toString(),
      ...formData,
      createdAt: new Date().toISOString()
    };

    const updatedVideos = [newVideo, ...videos];
    saveVideos(updatedVideos);
    
    setFormData({
      title: "",
      description: "",
      thumbnail: "",
      videoUrl: "",
      youtubeUrl: "",
      category: "full"
    });

    toast({
      title: "Success!",
      description: "Video uploaded successfully and is now visible on the website"
    });
  };

  const handleDelete = (id: string) => {
    const updatedVideos = videos.filter(video => video.id !== id);
    saveVideos(updatedVideos);
    toast({
      title: "Deleted",
      description: "Video has been removed from the website"
    });
  };

  const handleEdit = (video: Video) => {
    setEditingVideo(video.id);
    setFormData({
      title: video.title,
      description: video.description,
      thumbnail: video.thumbnail,
      videoUrl: video.videoUrl,
      youtubeUrl: video.youtubeUrl || "",
      category: video.category
    });
  };

  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!editingVideo) return;

    const updatedVideos = videos.map(video => 
      video.id === editingVideo 
        ? { ...video, ...formData }
        : video
    );
    
    saveVideos(updatedVideos);
    setEditingVideo(null);
    setFormData({
      title: "",
      description: "",
      thumbnail: "",
      videoUrl: "",
      youtubeUrl: "",
      category: "full"
    });

    toast({
      title: "Updated!",
      description: "Video has been updated successfully"
    });
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Admin Panel</h1>
          <p className="text-muted-foreground">Manage your dropshipping video content</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Upload Form */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Upload className="h-5 w-5 mr-2" />
                {editingVideo ? 'Edit Video' : 'Upload New Video'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={editingVideo ? handleUpdate : handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Title *</label>
                  <Input
                    value={formData.title}
                    onChange={(e) => handleChange('title', e.target.value)}
                    placeholder="Enter video title"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Category *</label>
                  <Select value={formData.category} onValueChange={(value: 'shorts' | 'full') => handleChange('category', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="shorts">Shorts</SelectItem>
                      <SelectItem value="full">Full Videos</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Description *</label>
                  <Textarea
                    value={formData.description}
                    onChange={(e) => handleChange('description', e.target.value)}
                    placeholder="Enter video description"
                    rows={4}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Thumbnail URL</label>
                  <Input
                    value={formData.thumbnail}
                    onChange={(e) => handleChange('thumbnail', e.target.value)}
                    placeholder="Enter thumbnail image URL"
                    type="url"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Video URL *</label>
                  <Input
                    value={formData.videoUrl}
                    onChange={(e) => handleChange('videoUrl', e.target.value)}
                    placeholder="Enter video file URL"
                    type="url"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">YouTube URL (Optional)</label>
                  <Input
                    value={formData.youtubeUrl}
                    onChange={(e) => handleChange('youtubeUrl', e.target.value)}
                    placeholder="Enter YouTube video URL"
                    type="url"
                  />
                </div>

                <div className="flex gap-2">
                  <Button type="submit" className="flex-1">
                    <Save className="h-4 w-4 mr-2" />
                    {editingVideo ? 'Update Video' : 'Upload Video'}
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
                          thumbnail: "",
                          videoUrl: "",
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
          <Card>
            <CardHeader>
              <CardTitle>Uploaded Videos ({videos.length})</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 max-h-96 overflow-y-auto">
                {videos.length === 0 ? (
                  <p className="text-muted-foreground text-center py-8">
                    No videos uploaded yet. Upload your first video to get started!
                  </p>
                ) : (
                  videos.map((video) => (
                    <div key={video.id} className="border rounded-lg p-4 space-y-2">
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
                              {new Date(video.createdAt).toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                        <div className="flex gap-2 ml-4">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleEdit(video)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => handleDelete(video.id)}
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
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Instructions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="font-semibold mb-2">How to Upload Videos:</h4>
              <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                <li>Fill in the title and description for your dropshipping video</li>
                <li>Select the category: "Shorts" for quick tips, "Full Videos" for detailed tutorials</li>
                <li>Add a thumbnail image URL (optional but recommended for better engagement)</li>
                <li>Provide the video file URL (hosted on your preferred platform)</li>
                <li>Optionally add a YouTube URL to allow viewers to watch on YouTube</li>
                <li>Click "Upload Video" and it will immediately appear on your website</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Video Management:</h4>
              <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                <li>Edit any video by clicking the edit button - changes are reflected immediately</li>
                <li>Delete videos that are no longer relevant to keep your content fresh</li>
                <li>Videos appear on the homepage in chronological order (newest first)</li>
                <li>Both video categories are displayed together but clearly labeled</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Admin;
