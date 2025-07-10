
import { OpenAI } from 'openai';
import { NextResponse } from 'next/server';

// ✅ Initialize OpenAI client with your API key
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// ✅ POST handler
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { topic } = body;

    // ✅ Check if topic is provided
    if (!topic) {
      return NextResponse.json({ error: 'Topic is required' }, { status: 400 });
    }

    // ✅ Call OpenAI Chat Completion API
    const response = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [
        {
          role: 'system',
          content: 'You are a helpful AI that writes educational and engaging blog posts.',
        },
        {
          role: 'user',
          content: `Write a detailed blog post on the topic: "${topic}"`,
        },
      ],
    });

    const generatedText = response.choices[0].message.content;

    // ✅ Return generated content
    return NextResponse.json({ content: generatedText });

  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json({ error: 'Failed to generate blog' }, { status: 500 });
  }
}





