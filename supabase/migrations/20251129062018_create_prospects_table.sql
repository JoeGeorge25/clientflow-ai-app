/*
  # Create prospects table

  1. New Tables
    - `prospects`
      - `id` (uuid, primary key) - Unique identifier for each prospect
      - `business_name` (text, required) - Name of the prospect's business
      - `contact_name` (text) - Primary contact person name
      - `email` (text) - Contact email address
      - `phone` (text) - Contact phone number
      - `niche` (text) - Business niche or industry
      - `city` (text) - Business location city
      - `state` (text) - Business location state
      - `website` (text) - Business website URL
      - `source` (text) - How the prospect was added (manual, csv, n8n)
      - `status` (text, default: 'new') - Current prospect status (new/contacted/qualified/client/lost)
      - `notes` (text) - Additional notes about the prospect
      - `created_at` (timestamptz, default: now()) - Record creation timestamp
      - `updated_at` (timestamptz, default: now()) - Last update timestamp

  2. Security
    - Enable RLS on `prospects` table
    - Add policy for authenticated users to read all prospects
    - Add policy for authenticated users to insert prospects
    - Add policy for authenticated users to update prospects
    - Add policy for authenticated users to delete prospects
*/

CREATE TABLE IF NOT EXISTS prospects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  business_name TEXT NOT NULL,
  contact_name TEXT,
  email TEXT,
  phone TEXT,
  niche TEXT,
  city TEXT,
  state TEXT,
  website TEXT,
  source TEXT,
  status TEXT NOT NULL DEFAULT 'new',
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE prospects ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Authenticated users can view all prospects"
  ON prospects
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can insert prospects"
  ON prospects
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update prospects"
  ON prospects
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete prospects"
  ON prospects
  FOR DELETE
  TO authenticated
  USING (true);
