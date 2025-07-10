import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { topic } = await req.json();

    if (!topic || topic.trim() === '') {
      return NextResponse.json({ error: 'No topic provided' }, { status: 400 });
    }

    // ✅ Dummy blog content to test response
    const blog = `🧠 Blog about: ${topic}\n\nThis is a sample AI-generated blog about "${topic}".`;

    // ✅ Ensure we're returning the blog
    return NextResponse.json({ blog }, { status: 200 });
  } catch (error: any) {
    console.error('❌ API Error:', error.message);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}




