import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

export const POST = async (req) => {
  try {
    const payload = await req.json();

    const { data, error } = await supabase
      .from("newsletter_events")
      .insert(payload)
      .select()
      .single();

    if (error) throw error;

    return new Response(JSON.stringify({ ok: true }), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("[Events] POST error", err);
    return new Response("Failed to record event", { status: 500 });
  }
};
