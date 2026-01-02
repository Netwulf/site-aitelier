-- Add cargo column to applications table
ALTER TABLE applications ADD COLUMN IF NOT EXISTS cargo text;