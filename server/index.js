import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import OpenAI from 'openai';
import { createClient } from '@supabase/supabase-js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const supabase = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.VITE_SUPABASE_ANON_KEY
);

app.post('/server/architectAiChat.js', async (req, res) => {
  try {
    const { message, routeKey } = req.body;

    const systemPrompt = `You are Architect AI, an expert business consultant for local newsletter agencies.
You help entrepreneurs build and scale their newsletter business following the "Luther" methodology.
You provide strategic advice on prospecting, pricing, niches, automation, and scaling to $50k/month.`;

    const response = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: message },
      ],
      temperature: 0.7,
    });

    const reply = response.choices[0].message.content;

    res.json({ reply, success: true });
  } catch (error) {
    console.error('Architect AI chat error:', error);
    res.status(500).json({
      reply: 'Sorry, I encountered an error. Please try again.',
      success: false,
      error: error.message
    });
  }
});

app.get('/server/prospects.js', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('prospects')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;

    res.json({ prospects: data || [] });
  } catch (error) {
    console.error('Prospects GET error:', error);
    res.status(500).json({ prospects: [], error: error.message });
  }
});

app.post('/server/prospects.js', async (req, res) => {
  try {
    const prospectData = req.body;

    const { data, error } = await supabase
      .from('prospects')
      .insert([prospectData])
      .select();

    if (error) throw error;

    res.json({ success: true, prospect: data[0] });
  } catch (error) {
    console.error('Prospects POST error:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

app.put('/server/prospects.js', async (req, res) => {
  try {
    const { id, status } = req.body;

    const { data, error } = await supabase
      .from('prospects')
      .update({ status })
      .eq('id', id)
      .select();

    if (error) throw error;

    res.json({ success: true, prospect: data[0] });
  } catch (error) {
    console.error('Prospects PUT error:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
