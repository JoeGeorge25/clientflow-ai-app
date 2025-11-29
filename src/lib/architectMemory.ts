import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

export async function getArchitectMemory(routeKey) {
  const { data: global, error: gErr } = await supabase
    .from("architect_ai_memory")
    .select("content")
    .eq("scope", "global")
    .is("route_key", null)
    .order("created_at");

  if (gErr) console.error("Global memory error:", gErr);

  let route = [];
  if (routeKey) {
    const { data, error } = await supabase
      .from("architect_ai_memory")
      .select("content")
      .eq("route_key", routeKey)
      .order("created_at");

    if (!error && data) route = data;
  }

  const parts = [
    "You are Architect AI, the system architect inside ClientFlow AI.",
    "Use ALL memory below to guide the user:",
    "",
  ];

  (global || []).forEach((row) => parts.push(row.content));

  if (route.length > 0) {
    parts.push(`\nRoute Memory (${routeKey}):`);
    route.forEach((row) => parts.push(row.content));
  }

  return parts.join("\n");
}
