import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

const systemPrompt = `You are Architect AI, an expert business consultant for local newsletter agencies.
You help entrepreneurs build and scale their newsletter business following proven methodologies.
You provide strategic advice on:
- Prospecting local businesses
- Pricing strategies (typical: $500-2000/month per client)
- Choosing profitable niches (restaurants, real estate, fitness, etc.)
- Automating newsletter creation and delivery
- Scaling to $10k-50k/month revenue
- Building systems and SOPs

Be concise, actionable, and encouraging. Focus on practical next steps.`;

const knowledgeBase = {
  pricing: "For local newsletters, charge $500-2000/month per client depending on their business size. Start at $750/month for small businesses. Include content creation, email design, and monthly analytics.",
  niches: "Best niches: restaurants, real estate agents, fitness studios, medical practices, law firms. Look for businesses with existing customer bases who need regular communication.",
  prospecting: "Start with 100 businesses in your city. Focus on one niche initially. Use Google Maps to build your list. Reach out via email, phone, and in-person visits. Expect 2-5% conversion rate.",
  scaling: "To reach $10k/month: 10-20 clients at $500-1000 each. Automate content curation using AI tools. Hire a VA for design at $5-15/hour. Build templates and SOPs to scale efficiently.",
  systems: "Create SOPs for: client onboarding, content creation workflow, email scheduling, performance reporting. Use tools like Beehiiv, ConvertKit, or Mailchimp for delivery.",
  starting: "Start by: 1) Choose one niche, 2) Build a list of 100 prospects, 3) Create a sample newsletter, 4) Reach out to 10 businesses per day, 5) Close your first 3 clients, 6) Systematize and scale.",
};

function generateResponse(userMessage: string): string {
  const msg = userMessage.toLowerCase();
  
  if (msg.includes("pric") || msg.includes("charge") || msg.includes("cost")) {
    return knowledgeBase.pricing;
  }
  
  if (msg.includes("niche") || msg.includes("industry") || msg.includes("business type")) {
    return knowledgeBase.niches;
  }
  
  if (msg.includes("prospect") || msg.includes("find client") || msg.includes("get client")) {
    return knowledgeBase.prospecting;
  }
  
  if (msg.includes("scale") || msg.includes("grow") || msg.includes("10k") || msg.includes("50k")) {
    return knowledgeBase.scaling;
  }
  
  if (msg.includes("system") || msg.includes("sop") || msg.includes("automat") || msg.includes("process")) {
    return knowledgeBase.systems;
  }
  
  if (msg.includes("start") || msg.includes("begin") || msg.includes("first") || msg.includes("how do i")) {
    return knowledgeBase.starting;
  }
  
  return `Great question! Here's my advice: Focus on taking action. The newsletter business model is simple - find local businesses, offer to create and send monthly newsletters to their customers for $500-2000/month. Start with one niche, build a prospect list, and start reaching out. What specific aspect would you like help with - pricing, niches, prospecting, or scaling?`;
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 200,
      headers: corsHeaders,
    });
  }

  try {
    console.log("[Architect AI] Received request");
    
    const { message } = await req.json();
    console.log("[Architect AI] User message:", message);
    
    if (!message || typeof message !== "string") {
      return new Response(
        JSON.stringify({ error: "Message is required" }),
        {
          status: 400,
          headers: {
            ...corsHeaders,
            "Content-Type": "application/json",
          },
        }
      );
    }

    const reply = generateResponse(message);
    console.log("[Architect AI] Generated reply:", reply);

    return new Response(
      JSON.stringify({ reply, success: true }),
      {
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    console.error("[Architect AI] Error:", error);
    return new Response(
      JSON.stringify({ 
        error: "Failed to process message",
        details: error.message,
        success: false 
      }),
      {
        status: 500,
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
        },
      }
    );
  }
});