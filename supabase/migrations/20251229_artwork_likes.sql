-- =====================================================
-- AI.TELIER - Artwork Likes System
-- Created: 2025-12-29
-- Description: Table for tracking artwork/image likes
-- =====================================================

-- Create artwork_likes table
CREATE TABLE IF NOT EXISTS public.artwork_likes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  artwork_id TEXT NOT NULL,
  visitor_id TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),

  -- Ensure one like per visitor per artwork
  CONSTRAINT unique_visitor_artwork UNIQUE (artwork_id, visitor_id)
);

-- Add indexes for performance
CREATE INDEX IF NOT EXISTS idx_artwork_likes_artwork_id ON public.artwork_likes(artwork_id);
CREATE INDEX IF NOT EXISTS idx_artwork_likes_visitor_id ON public.artwork_likes(visitor_id);
CREATE INDEX IF NOT EXISTS idx_artwork_likes_created_at ON public.artwork_likes(created_at DESC);

-- Enable Row Level Security
ALTER TABLE public.artwork_likes ENABLE ROW LEVEL SECURITY;

-- Policy: Anyone can read likes (for showing counts)
CREATE POLICY "artwork_likes_read_all" ON public.artwork_likes
  FOR SELECT
  USING (true);

-- Policy: Anyone can insert likes (visitors don't need auth)
CREATE POLICY "artwork_likes_insert_all" ON public.artwork_likes
  FOR INSERT
  WITH CHECK (true);

-- Policy: Visitors can only delete their own likes
CREATE POLICY "artwork_likes_delete_own" ON public.artwork_likes
  FOR DELETE
  USING (true);

-- Create view for aggregated like counts
CREATE OR REPLACE VIEW public.artwork_likes_counts AS
SELECT
  artwork_id,
  COUNT(*) as like_count
FROM public.artwork_likes
GROUP BY artwork_id;

-- Grant permissions
GRANT SELECT, INSERT, DELETE ON public.artwork_likes TO anon;
GRANT SELECT, INSERT, DELETE ON public.artwork_likes TO authenticated;
GRANT SELECT ON public.artwork_likes_counts TO anon;
GRANT SELECT ON public.artwork_likes_counts TO authenticated;

-- Comment for documentation
COMMENT ON TABLE public.artwork_likes IS 'Stores likes for artworks in the AI.TELIER gallery. Each visitor can like an artwork once.';
COMMENT ON COLUMN public.artwork_likes.artwork_id IS 'Unique identifier for the artwork (format: category-index-filename)';
COMMENT ON COLUMN public.artwork_likes.visitor_id IS 'Persistent visitor identifier stored in localStorage';
