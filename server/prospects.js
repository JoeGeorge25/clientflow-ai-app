import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

export const GET = async (req) => {
  console.log("[Prospects API] HIT GET /server/prospects");
  try {
    console.log("[Prospects API] Fetching prospects from database...");
    const { data, error } = await supabase
      .from("prospects")
      .select("*")
      .order("created_at", { ascending: false });

    console.log("[Prospects API] DB response:", { data, error });

    if (error) {
      console.error("[Prospects API] DB error:", error);
      throw error;
    }

    console.log("[Prospects API] Returning", data?.length || 0, "prospects");
    return Response.json({ prospects: data || [] });
  } catch (err) {
    console.error("[Prospects API] GET error:", err);
    return Response.json(
      { error: "Failed to fetch prospects", details: err.message },
      { status: 500 }
    );
  }
};

export const POST = async (req) => {
  console.log("[Prospects API] HIT POST /server/prospects");
  try {
    const body = await req.json();
    console.log("[Prospects API] POST body:", body);

    const {
      business_name,
      contact_name,
      email,
      phone,
      niche,
      city,
      state,
      website,
      source,
      notes,
    } = body;

    if (!business_name) {
      console.log("[Prospects API] Missing business_name");
      return Response.json(
        { error: "business_name is required" },
        { status: 400 }
      );
    }

    console.log("[Prospects API] Inserting prospect into database...");
    const { data, error } = await supabase
      .from("prospects")
      .insert([
        {
          business_name,
          contact_name,
          email,
          phone,
          niche,
          city,
          state,
          website,
          source: source || "manual",
          status: "new",
          notes: notes || "",
        },
      ])
      .select()
      .single();

    console.log("[Prospects API] DB insert response:", { data, error });

    if (error) {
      console.error("[Prospects API] DB error:", error);
      throw error;
    }

    console.log("[Prospects API] Prospect created successfully:", data);
    return Response.json({ prospect: data }, { status: 201 });
  } catch (err) {
    console.error("[Prospects API] POST error:", err);
    return Response.json(
      { error: "Failed to create prospect", details: err.message },
      { status: 500 }
    );
  }
};

export const PUT = async (req) => {
  console.log("[Prospects API] HIT PUT /server/prospects");
  try {
    const body = await req.json();
    const { id, status, notes } = body;
    console.log("[Prospects API] PUT body:", { id, status, notes });

    if (!id) {
      console.log("[Prospects API] Missing id");
      return Response.json(
        { error: "id is required for update" },
        { status: 400 }
      );
    }

    console.log("[Prospects API] Updating prospect in database...");
    const { data, error } = await supabase
      .from("prospects")
      .update({
        ...(status && { status }),
        ...(notes !== undefined && { notes }),
        updated_at: new Date().toISOString(),
      })
      .eq("id", id)
      .select()
      .single();

    console.log("[Prospects API] DB update response:", { data, error });

    if (error) {
      console.error("[Prospects API] DB error:", error);
      throw error;
    }

    console.log("[Prospects API] Prospect updated successfully:", data);
    return Response.json({ prospect: data });
  } catch (err) {
    console.error("[Prospects API] PUT error:", err);
    return Response.json(
      { error: "Failed to update prospect", details: err.message },
      { status: 500 }
    );
  }
};
