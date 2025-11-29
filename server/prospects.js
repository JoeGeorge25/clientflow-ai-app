import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

export default async function handler(req, res) {
  try {
    if (req.method === "GET") {
      const { data, error } = await supabase
        .from("prospects")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      return res.status(200).json({ prospects: data || [] });
    }

    if (req.method === "POST") {
      const body = req.body || {};

      const { business_name, email, phone, niche, city, state, website } = body;

      if (!business_name) {
        return res.status(400).json({ error: "business_name is required" });
      }

      const { data, error } = await supabase
        .from("prospects")
        .insert([
          {
            business_name,
            email,
            phone,
            niche,
            city,
            state,
            website,
            source: body.source || "manual",
            status: "new",
            notes: body.notes || "",
          },
        ])
        .select()
        .single();

      if (error) throw error;
      return res.status(201).json({ prospect: data });
    }

    return res.status(405).json({ error: "Method not allowed" });
  } catch (err) {
    console.error("Prospects handler error:", err);
    return res
      .status(500)
      .json({ error: "Server error", details: err.message });
  }
}
