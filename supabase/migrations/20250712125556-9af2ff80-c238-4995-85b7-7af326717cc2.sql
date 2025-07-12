
-- Create a storage bucket for video files
INSERT INTO storage.buckets (id, name, public) 
VALUES ('videos', 'videos', true);

-- Create storage policies for video bucket
CREATE POLICY "Allow public uploads to videos bucket" ON storage.objects
FOR INSERT WITH CHECK (bucket_id = 'videos');

CREATE POLICY "Allow public access to videos bucket" ON storage.objects
FOR SELECT USING (bucket_id = 'videos');

CREATE POLICY "Allow public updates to videos bucket" ON storage.objects
FOR UPDATE USING (bucket_id = 'videos');

CREATE POLICY "Allow public deletes from videos bucket" ON storage.objects
FOR DELETE USING (bucket_id = 'videos');

-- Create videos table
CREATE TABLE public.videos (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  category TEXT NOT NULL CHECK (category IN ('shorts', 'full')),
  thumbnail_url TEXT,
  video_file_path TEXT NOT NULL,
  youtube_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on videos table (public access for this use case)
ALTER TABLE public.videos ENABLE ROW LEVEL SECURITY;

-- Create policies for public access to videos
CREATE POLICY "Allow public read access to videos" ON public.videos
FOR SELECT USING (true);

CREATE POLICY "Allow public insert to videos" ON public.videos
FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow public update to videos" ON public.videos
FOR UPDATE USING (true);

CREATE POLICY "Allow public delete to videos" ON public.videos
FOR DELETE USING (true);

-- Enable realtime for videos table
ALTER TABLE public.videos REPLICA IDENTITY FULL;
ALTER PUBLICATION supabase_realtime ADD TABLE public.videos;
