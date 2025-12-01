import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

export const GET = async () => {
  try {
    const { data, error } = await supabase
      .from("newsletter_templates")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) throw error;
    return new Response(JSON.stringify(data), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("[Templates] GET error", err);
    return new Response("Failed to load templates", { status: 500 });
  }
};

export const POST = async (req) => {
  try {
    const body = await req.json();

    const { data, error } = await supabase
      .from("newsletter_templates")
      .insert(body)
      .select()
      .single();

    if (error) throw error;
    return new Response(JSON.stringify(data), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("[Templates] POST error", err);
    return new Response("Failed to save template", { status: 500 });
  }
};
