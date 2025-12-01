/*
  # Create newsletter_campaigns table

  1. New Tables
    - `newsletter_campaigns`
      - `id` (uuid, primary key) - Unique campaign identifier
      - `campaign_name` (text) - Name of the campaign
      - `subject_line` (text) - Email subject line
      - `send_datetime` (timestamptz) - Scheduled send date and time
      - `audience_segment` (text) - Target audience description
      - `status` (text) - Campaign status: draft, scheduled, or sent
      - `created_at` (timestamptz) - Timestamp when campaign was created
      - `updated_at` (timestamptz) - Timestamp when campaign was last updated

  2. Security
    - Enable RLS on `newsletter_campaigns` table
    - Add policies for authenticated users to manage their campaigns
    - For now, allow all authenticated users to access all campaigns (team-wide access)

  3. Important Notes
    - Status field constrained to valid values: 'draft', 'scheduled', 'sent'
    - Default status is 'draft'
    - Timestamps automatically managed
    - All fields required except audience_segment (optional)
*/

-- Create newsletter_campaigns table
CREATE TABLE IF NOT EXISTS newsletter_campaigns (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  campaign_name text NOT NULL,
  subject_line text NOT NULL,
  send_datetime timestamptz NOT NULL,
  audience_segment text DEFAULT '',
  status text NOT NULL DEFAULT 'draft',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  CONSTRAINT valid_status CHECK (status IN ('draft', 'scheduled', 'sent'))
);

-- Enable Row Level Security
ALTER TABLE newsletter_campaigns ENABLE ROW LEVEL SECURITY;

-- Policy: Authenticated users can view all campaigns
CREATE POLICY "Authenticated users can view campaigns"
  ON newsletter_campaigns
  FOR SELECT
  TO authenticated
  USING (true);

-- Policy: Authenticated users can create campaigns
CREATE POLICY "Authenticated users can create campaigns"
  ON newsletter_campaigns
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Policy: Authenticated users can update campaigns
CREATE POLICY "Authenticated users can update campaigns"
  ON newsletter_campaigns
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Policy: Authenticated users can delete campaigns
CREATE POLICY "Authenticated users can delete campaigns"
  ON newsletter_campaigns
  FOR DELETE
  TO authenticated
  USING (true);

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_newsletter_campaigns_status ON newsletter_campaigns(status);
CREATE INDEX IF NOT EXISTS idx_newsletter_campaigns_send_datetime ON newsletter_campaigns(send_datetime);

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_newsletter_campaigns_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to automatically update updated_at
DROP TRIGGER IF EXISTS update_newsletter_campaigns_updated_at_trigger ON newsletter_campaigns;
CREATE TRIGGER update_newsletter_campaigns_updated_at_trigger
  BEFORE UPDATE ON newsletter_campaigns
  FOR EACH ROW
  EXECUTE FUNCTION update_newsletter_campaigns_updated_at();
