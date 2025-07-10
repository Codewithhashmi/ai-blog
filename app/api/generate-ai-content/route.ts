import { OpenAI } from 'openai';
import { NextResponse } from 'next/server';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  const { topic } = await req.json();

  if (!topic) {
    return NextResponse.json({ error: 'Topic is required' }, { status: 400 });
  }

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
  return NextResponse.json({ content: generatedText });
}





