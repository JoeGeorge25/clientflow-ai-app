import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

export const GET = async () => {
  try {
    const { data, error } = await supabase
      .from("newsletter_schedules")
      .select("*, newsletter_campaigns(campaign_name)")
      .order("send_at", { ascending: true });

    if (error) throw error;
    return new Response(JSON.stringify(data), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("[Schedules] GET error", err);
    return new Response("Failed to load schedules", { status: 500 });
  }
};

export const POST = async (req) => {
  try {
    const body = await req.json();

    const { data, error } = await supabase
      .from("newsletter_schedules")
      .insert(body)
      .select()
      .single();

    if (error) throw error;
    return new Response(JSON.stringify(data), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("[Schedules] POST error", err);
    return new Response("Failed to create schedule", { status: 500 });
  }
};
