/*
  # Create newsletter_templates table

  1. New Tables
    - `newsletter_templates`
      - `id` (uuid, primary key) - Unique template identifier
      - `name` (text) - Template name/title
      - `industry` (text, nullable) - Target industry (restaurants, real estate, etc.)
      - `subject_line` (text) - Email subject line template
      - `preview_text` (text, nullable) - Email preview text
      - `body_html` (text) - HTML version of email body
      - `body_text` (text, nullable) - Plain text version of email body
      - `created_at` (timestamptz) - Timestamp when template was created
      - `updated_at` (timestamptz) - Timestamp when template was last updated

  2. Security
    - Enable RLS on `newsletter_templates` table
    - Add policies for authenticated users to manage templates
    - All authenticated users can view and use templates (team-wide access)

  3. Important Notes
    - Templates are reusable across multiple campaigns
    - Industry field helps categorize templates by business type
    - Both HTML and plain text versions for email compatibility
    - Timestamps automatically managed via trigger
*/

-- Create newsletter_templates table
CREATE TABLE IF NOT EXISTS newsletter_templates (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  industry text,
  subject_line text NOT NULL,
  preview_text text,
  body_html text NOT NULL,
  body_text text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE newsletter_templates ENABLE ROW LEVEL SECURITY;

-- Policy: Authenticated users can view all templates
CREATE POLICY "Authenticated users can view templates"
  ON newsletter_templates
  FOR SELECT
  TO authenticated
  USING (true);

-- Policy: Authenticated users can create templates
CREATE POLICY "Authenticated users can create templates"
  ON newsletter_templates
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Policy: Authenticated users can update templates
CREATE POLICY "Authenticated users can update templates"
  ON newsletter_templates
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Policy: Authenticated users can delete templates
CREATE POLICY "Authenticated users can delete templates"
  ON newsletter_templates
  FOR DELETE
  TO authenticated
  USING (true);

-- Create indexes for faster queries
CREATE INDEX IF NOT EXISTS idx_newsletter_templates_industry ON newsletter_templates(industry);
CREATE INDEX IF NOT EXISTS idx_newsletter_templates_name ON newsletter_templates(name);

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_newsletter_templates_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to automatically update updated_at
DROP TRIGGER IF EXISTS update_newsletter_templates_updated_at_trigger ON newsletter_templates;
CREATE TRIGGER update_newsletter_templates_updated_at_trigger
  BEFORE UPDATE ON newsletter_templates
  FOR EACH ROW
  EXECUTE FUNCTION update_newsletter_templates_updated_at();
