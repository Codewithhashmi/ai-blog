'use client';

import { useState } from 'react';

export default function CreateBlogPage() {
  const [topic, setTopic] = useState('');
  const [blog, setBlog] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const generateBlog = async () => {
    setLoading(true);
    setError('');
    setBlog('');

    try {
      const res = await fetch('/api/generate-ai-content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topic }),
      });

      const data = await res.json();
      console.log('🧪 API Response:', data);

      if (!res.ok || !data.blog) {
        throw new Error(data.error || 'No blog returned');
      }

      setBlog(data.blog);
    } catch (err: any) {
      console.error('❌ Fetch error:', err.message);
      setError(err.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="p-6 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">📝 Create an AI Blog</h1>

      <input
        value={topic}
        onChange={(e) => setTopic(e.target.value)}
        placeholder="Enter a blog topic..."
        className="w-full border p-3 rounded mb-4"
      />

      <button
        onClick={generateBlog}
        disabled={!topic || loading}
        className="w-full bg-blue-600 text-white py-2 rounded disabled:bg-gray-400"
      >
        {loading ? 'Generating...' : 'Generate Blog'}
      </button>

      {error && <p className="text-red-600 mt-4">❌ {error}</p>}

      {blog && (
        <div className="mt-6 bg-gray-100 p-4 rounded">
          <h2 className="text-xl font-semibold mb-2">Generated Blog:</h2>
          <p className="whitespace-pre-line">{blog}</p>
        </div>
      )}
    </main>
  );
}


