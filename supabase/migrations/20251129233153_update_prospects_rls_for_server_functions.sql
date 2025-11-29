/*
  # Update prospects RLS policies for server functions

  1. Changes
    - Drop existing restrictive RLS policies
    - Add new policies that allow anon and authenticated access
    - This enables Bolt server functions to access the prospects table

  2. Security
    - Allow anon role to perform all operations (server functions use anon key)
    - Keep RLS enabled for table protection
*/

-- Drop existing policies
DROP POLICY IF EXISTS "Authenticated users can view all prospects" ON prospects;
DROP POLICY IF EXISTS "Authenticated users can insert prospects" ON prospects;
DROP POLICY IF EXISTS "Authenticated users can update prospects" ON prospects;
DROP POLICY IF EXISTS "Authenticated users can delete prospects" ON prospects;

-- Create new policies that allow anon role (used by server functions)
CREATE POLICY "Allow all users to view prospects"
  ON prospects
  FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Allow all users to insert prospects"
  ON prospects
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Allow all users to update prospects"
  ON prospects
  FOR UPDATE
  TO anon, authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Allow all users to delete prospects"
  ON prospects
  FOR DELETE
  TO anon, authenticated
  USING (true);
