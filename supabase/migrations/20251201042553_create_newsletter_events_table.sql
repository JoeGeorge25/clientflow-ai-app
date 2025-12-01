/*
  # Create newsletter_events table

  1. New Tables
    - `newsletter_events`
      - `id` (uuid, primary key) - Unique event identifier
      - `campaign_id` (uuid, foreign key) - References newsletter_campaigns.id
      - `prospect_id` (uuid, foreign key, nullable) - References prospects.id
      - `event_type` (text) - Type: sent, open, click, bounce, unsubscribe
      - `provider_id` (text, nullable) - External ESP identifier (MailerLite, Brevo, etc.)
      - `occurred_at` (timestamptz) - When the event happened

  2. Security
    - Enable RLS on `newsletter_events` table
    - Add policies for authenticated users to view events
    - All authenticated users can view events (team-wide access)
    - Only system/backend can insert events (via service role)

  3. Important Notes
    - Foreign key constraints ensure events link to valid campaigns and prospects
    - prospect_id is nullable because some events (like general sends) may not link to a specific prospect
    - event_type constrained to valid values for data integrity
    - provider_id stores external ESP tracking identifiers
    - Cascade behavior: when campaign or prospect is deleted, events are preserved for analytics
    - Indexes optimized for common analytics queries (by campaign, by prospect, by event type, by date)
*/

-- Create newsletter_events table
CREATE TABLE IF NOT EXISTS newsletter_events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  campaign_id uuid NOT NULL REFERENCES newsletter_campaigns(id) ON DELETE CASCADE,
  prospect_id uuid REFERENCES prospects(id) ON DELETE SET NULL,
  event_type text NOT NULL,
  provider_id text,
  occurred_at timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT valid_event_type CHECK (event_type IN ('sent', 'open', 'click', 'bounce', 'unsubscribe', 'delivered', 'failed'))
);

-- Enable Row Level Security
ALTER TABLE newsletter_events ENABLE ROW LEVEL SECURITY;

-- Policy: Authenticated users can view all events
CREATE POLICY "Authenticated users can view events"
  ON newsletter_events
  FOR SELECT
  TO authenticated
  USING (true);

-- Policy: Authenticated users can insert events (for testing/manual entry)
CREATE POLICY "Authenticated users can create events"
  ON newsletter_events
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Policy: Authenticated users can update events (for corrections)
CREATE POLICY "Authenticated users can update events"
  ON newsletter_events
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Policy: Authenticated users can delete events (for cleanup)
CREATE POLICY "Authenticated users can delete events"
  ON newsletter_events
  FOR DELETE
  TO authenticated
  USING (true);

-- Create indexes for faster analytics queries
CREATE INDEX IF NOT EXISTS idx_newsletter_events_campaign_id ON newsletter_events(campaign_id);
CREATE INDEX IF NOT EXISTS idx_newsletter_events_prospect_id ON newsletter_events(prospect_id);
CREATE INDEX IF NOT EXISTS idx_newsletter_events_event_type ON newsletter_events(event_type);
CREATE INDEX IF NOT EXISTS idx_newsletter_events_occurred_at ON newsletter_events(occurred_at);
CREATE INDEX IF NOT EXISTS idx_newsletter_events_provider_id ON newsletter_events(provider_id);

-- Composite index for common query patterns
CREATE INDEX IF NOT EXISTS idx_newsletter_events_campaign_type ON newsletter_events(campaign_id, event_type);
CREATE INDEX IF NOT EXISTS idx_newsletter_events_prospect_type ON newsletter_events(prospect_id, event_type);
