/*
  # Add template_id to newsletter_campaigns

  1. Changes
    - Add `template_id` column to `newsletter_campaigns` table
      - Type: uuid (nullable)
      - Foreign key reference to newsletter_templates.id
      - ON DELETE SET NULL (preserve campaign if template is deleted)

  2. Important Notes
    - Nullable to allow campaigns without templates
    - Foreign key ensures template_id references valid templates
    - SET NULL on delete preserves campaign history even if template is removed
*/

-- Add template_id column to newsletter_campaigns
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'newsletter_campaigns' AND column_name = 'template_id'
  ) THEN
    ALTER TABLE newsletter_campaigns 
    ADD COLUMN template_id uuid REFERENCES newsletter_templates(id) ON DELETE SET NULL;
  END IF;
END $$;

-- Create index for faster template lookups
CREATE INDEX IF NOT EXISTS idx_newsletter_campaigns_template_id ON newsletter_campaigns(template_id);
