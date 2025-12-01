/*
  # Create newsletter_schedules table

  1. New Tables
    - `newsletter_schedules`
      - `id` (uuid, primary key) - Unique schedule identifier
      - `campaign_id` (uuid, foreign key) - References newsletter_campaigns.id
      - `send_at` (timestamptz) - Scheduled send date and time
      - `timezone` (text) - Timezone for scheduling (e.g., 'America/New_York')
      - `status` (text) - Schedule status: pending, queued, sent, failed
      - `created_at` (timestamptz) - Timestamp when schedule was created
      - `updated_at` (timestamptz) - Timestamp when schedule was last updated

  2. Security
    - Enable RLS on `newsletter_schedules` table
    - Add policies for authenticated users to manage schedules
    - All authenticated users can view and manage schedules (team-wide access)

  3. Important Notes
    - Foreign key constraint ensures schedules link to valid campaigns
    - Status constrained to valid values for data integrity
    - Timezone tracking allows proper scheduling across time zones
    - Cascade delete: when a campaign is deleted, its schedules are deleted too
    - Timestamps automatically managed via trigger
*/

-- Create newsletter_schedules table
CREATE TABLE IF NOT EXISTS newsletter_schedules (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  campaign_id uuid NOT NULL REFERENCES newsletter_campaigns(id) ON DELETE CASCADE,
  send_at timestamptz NOT NULL,
  timezone text NOT NULL,
  status text NOT NULL DEFAULT 'pending',
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT valid_schedule_status CHECK (status IN ('pending', 'queued', 'sent', 'failed'))
);

-- Enable Row Level Security
ALTER TABLE newsletter_schedules ENABLE ROW LEVEL SECURITY;

-- Policy: Authenticated users can view all schedules
CREATE POLICY "Authenticated users can view schedules"
  ON newsletter_schedules
  FOR SELECT
  TO authenticated
  USING (true);

-- Policy: Authenticated users can create schedules
CREATE POLICY "Authenticated users can create schedules"
  ON newsletter_schedules
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Policy: Authenticated users can update schedules
CREATE POLICY "Authenticated users can update schedules"
  ON newsletter_schedules
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Policy: Authenticated users can delete schedules
CREATE POLICY "Authenticated users can delete schedules"
  ON newsletter_schedules
  FOR DELETE
  TO authenticated
  USING (true);

-- Create indexes for faster queries
CREATE INDEX IF NOT EXISTS idx_newsletter_schedules_campaign_id ON newsletter_schedules(campaign_id);
CREATE INDEX IF NOT EXISTS idx_newsletter_schedules_send_at ON newsletter_schedules(send_at);
CREATE INDEX IF NOT EXISTS idx_newsletter_schedules_status ON newsletter_schedules(status);

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_newsletter_schedules_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to automatically update updated_at
DROP TRIGGER IF EXISTS update_newsletter_schedules_updated_at_trigger ON newsletter_schedules;
CREATE TRIGGER update_newsletter_schedules_updated_at_trigger
  BEFORE UPDATE ON newsletter_schedules
  FOR EACH ROW
  EXECUTE FUNCTION update_newsletter_schedules_updated_at();
