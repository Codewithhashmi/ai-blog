'use client';
import { useState } from 'react';

export default function CreatePostPage() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);

  const generateAIContent = async () => {
    if (!title) return alert('Please enter a topic/title first.');

    setLoading(true);
    try {
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topic: title }),
      });

      const data = await res.json();
      if (data.content) {
        setContent(data.content);
      } else {
        alert('Failed to generate content.');
      }
    } catch (err) {
      alert('Error generating content.');
      console.error(err);
    }
    setLoading(false);
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 px-4">
      <h1 className="text-3xl font-bold mb-6">📝 Create Blog Post</h1>

      <input
        type="text"
        placeholder="Enter blog title"
        className="w-full p-2 mb-4 border rounded"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Blog Content</h2>
        <button
          onClick={generateAIContent}
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700 transition"
        >
          {loading ? 'Generating...' : '✨ Generate with AI'}
        </button>
      </div>

      <textarea
        rows={12}
        className="w-full p-2 border rounded mb-4"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Generated blog content will appear here..."
      />

      <button
        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
        onClick={() => alert('💾 Save functionality coming soon')}
      >
        Save Post
      </button>
    </div>
  );
}



