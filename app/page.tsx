// app/page.tsx
'use client';
import { useRouter } from 'next/navigation';

export default function HomePage() {
  const router = useRouter();

  return (
    <div className="p-10 text-center">
      <h1 className="text-3xl font-bold mb-4">🧠 Welcome to the AI Blogging Platform</h1>
      <p className="mb-6">Click on "Create Blog" to start writing with AI.</p>
      <button
        onClick={() => router.push('/create-blog')}
        className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
      >
        Create Blog
      </button>
    </div>
  );
}
