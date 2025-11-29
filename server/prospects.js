import { db } from "bolt:database";

export const GET = async (req) => {
  console.log("HIT GET /server/prospects");
  try {
    console.log("Fetching prospects from database...");
    const { data, error } = await db
      .from("prospects")
      .select("*")
      .order("created_at", { ascending: false });

    console.log("DB response:", { data, error });
    if (error) throw error;
    console.log("Returning prospects:", data?.length || 0, "rows");
    return Response.json({ prospects: data || [] });
  } catch (err) {
    console.error("Prospects fetch error:", err);
    return Response.json(
      { error: "Failed to fetch prospects", details: err.message },
      { status: 500 }
    );
  }
};

export const POST = async (req) => {
  console.log("HIT POST /server/prospects");
  try {
    const body = await req.json();
    console.log("POST body:", body);
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
      console.log("Missing business_name");
      return Response.json(
        { error: "business_name is required" },
        { status: 400 }
      );
    }

    console.log("Inserting prospect into database...");
    const { data, error } = await db
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

    console.log("DB insert response:", { data, error });
    if (error) throw error;
    console.log("Prospect created successfully:", data);
    return Response.json({ prospect: data }, { status: 201 });
  } catch (err) {
    console.error("Prospects create error:", err);
    return Response.json(
      { error: "Failed to create prospect", details: err.message },
      { status: 500 }
    );
  }
};

export const PUT = async (req) => {
  console.log("HIT PUT /server/prospects");
  try {
    const body = await req.json();
    const { id, status, notes } = body;
    console.log("PUT body:", { id, status, notes });

    if (!id) {
      console.log("Missing id");
      return Response.json(
        { error: "id is required for update" },
        { status: 400 }
      );
    }

    console.log("Updating prospect in database...");
    const { data, error } = await db
      .from("prospects")
      .update({
        ...(status && { status }),
        ...(notes !== undefined && { notes }),
        updated_at: new Date().toISOString(),
      })
      .eq("id", id)
      .select()
      .single();

    console.log("DB update response:", { data, error });
    if (error) throw error;
    console.log("Prospect updated successfully:", data);
    return Response.json({ prospect: data });
  } catch (err) {
    console.error("Prospects update error:", err);
    return Response.json(
      { error: "Failed to update prospect", details: err.message },
      { status: 500 }
    );
  }
};
