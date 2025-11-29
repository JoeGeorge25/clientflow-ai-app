import { db } from "bolt:database";

export const GET = async (req) => {
  try {
    const { data, error } = await db
      .from("prospects")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) throw error;
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
  try {
    const body = await req.json();
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
      return Response.json(
        { error: "business_name is required" },
        { status: 400 }
      );
    }

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

    if (error) throw error;
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
  try {
    const body = await req.json();
    const { id, status, notes } = body;

    if (!id) {
      return Response.json(
        { error: "id is required for update" },
        { status: 400 }
      );
    }

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

    if (error) throw error;
    return Response.json({ prospect: data });
  } catch (err) {
    console.error("Prospects update error:", err);
    return Response.json(
      { error: "Failed to update prospect", details: err.message },
      { status: 500 }
    );
  }
};
