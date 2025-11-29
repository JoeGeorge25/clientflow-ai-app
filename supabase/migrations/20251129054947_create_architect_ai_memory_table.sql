/*
  # Create architect_ai_memory table

  1. New Tables
    - `architect_ai_memory`
      - `id` (uuid, primary key) - Unique identifier for each memory entry
      - `scope` (text, not null) - The scope or context of the memory
      - `route_key` (text, nullable) - Optional routing key for memory organization
      - `content` (text, not null) - The actual memory content
      - `created_at` (timestamptz) - Timestamp when the memory was created

  2. Security
    - Enable RLS on `architect_ai_memory` table
    - Add policy for authenticated users to read all memories
    - Add policy for authenticated users to insert memories
    - Add policy for authenticated users to update memories
    - Add policy for authenticated users to delete memories

  3. Important Notes
    - All columns use sensible defaults where applicable
    - RLS is enabled to ensure secure access control
    - Policies allow authenticated users full access to memories
*/

CREATE TABLE IF NOT EXISTS architect_ai_memory (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  scope TEXT NOT NULL,
  route_key TEXT,
  content TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE architect_ai_memory ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Authenticated users can read memories"
  ON architect_ai_memory FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can insert memories"
  ON architect_ai_memory FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update memories"
  ON architect_ai_memory FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete memories"
  ON architect_ai_memory FOR DELETE
  TO authenticated
  USING (true);