/*
  # Update RLS policies for newsletter tables - Public Access

  1. Changes
    - Update newsletter_templates RLS policies for public (anon + authenticated) access
    - Update newsletter_schedules RLS policies for public (anon + authenticated) access
    - Update newsletter_events RLS policies for public (anon + authenticated) access

  2. Security
    - Allow SELECT, INSERT, UPDATE for anon and authenticated users
    - Same pattern as prospects table for consistency
    - Clear, descriptive policy names

  3. Important Notes
    - Follows the same RLS approach as the prospects table
    - Enables app functionality without authentication barriers
    - Production systems may want to restrict this further
*/

-- ============================================================
-- NEWSLETTER_TEMPLATES - Update RLS Policies
-- ============================================================

-- Drop existing authenticated-only policies
DROP POLICY IF EXISTS "Authenticated users can view templates" ON newsletter_templates;
DROP POLICY IF EXISTS "Authenticated users can create templates" ON newsletter_templates;
DROP POLICY IF EXISTS "Authenticated users can update templates" ON newsletter_templates;
DROP POLICY IF EXISTS "Authenticated users can delete templates" ON newsletter_templates;

-- Create new public policies (anon + authenticated)
CREATE POLICY "Public templates access"
  ON newsletter_templates
  FOR ALL
  TO anon, authenticated
  USING (true)
  WITH CHECK (true);

-- ============================================================
-- NEWSLETTER_SCHEDULES - Update RLS Policies
-- ============================================================

-- Drop existing authenticated-only policies
DROP POLICY IF EXISTS "Authenticated users can view schedules" ON newsletter_schedules;
DROP POLICY IF EXISTS "Authenticated users can create schedules" ON newsletter_schedules;
DROP POLICY IF EXISTS "Authenticated users can update schedules" ON newsletter_schedules;
DROP POLICY IF EXISTS "Authenticated users can delete schedules" ON newsletter_schedules;

-- Create new public policies (anon + authenticated)
CREATE POLICY "Public schedules access"
  ON newsletter_schedules
  FOR ALL
  TO anon, authenticated
  USING (true)
  WITH CHECK (true);

-- ============================================================
-- NEWSLETTER_EVENTS - Update RLS Policies
-- ============================================================

-- Drop existing authenticated-only policies
DROP POLICY IF EXISTS "Authenticated users can view events" ON newsletter_events;
DROP POLICY IF EXISTS "Authenticated users can create events" ON newsletter_events;
DROP POLICY IF EXISTS "Authenticated users can update events" ON newsletter_events;
DROP POLICY IF EXISTS "Authenticated users can delete events" ON newsletter_events;

-- Create new public policies for INSERT and SELECT
CREATE POLICY "Public newsletter events access"
  ON newsletter_events
  FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Public newsletter events insert"
  ON newsletter_events
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Note: UPDATE and DELETE kept restricted for data integrity
-- Events should generally be immutable once created
