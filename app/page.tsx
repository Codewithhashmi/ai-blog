'use client';

import { useState } from 'react';
import { Sparkles, Loader2, Save, Wand2 } from 'lucide-react';

export default function HomePage() {
  const [topic, setTopic] = useState('');
  const [blog, setBlog] = useState('');
  const [loading, setLoading] = useState(false);

  const generateBlog = async () => {
    if (!topic.trim()) return;
    setLoading(true);
    setBlog('');

    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ topic }),
      });

      const data = await response.json();

      if (response.ok) {
        setBlog(data.content || 'No content generated.');
      } else {
        setBlog(data.error || 'Something went wrong.');
      }
    } catch (error) {
      setBlog('Error: Could not generate blog. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="max-w-4xl mx-auto px-6 py-12 font-sans">
      <h1 className="text-4xl font-bold text-center text-blue-700 flex items-center justify-center gap-2 mb-4">
        <Sparkles className="w-8 h-8 text-yellow-500" />
        AI Blog Generator
      </h1>
      <p className="text-center text-gray-600 mb-8">
        Type a blog topic and let AI write a full blog post for you.
      </p>

      <div className="bg-white shadow-lg rounded-xl p-6 mb-8 border border-gray-200">
        <label className="block text-lg font-semibold text-gray-800 mb-2">
          Enter Blog Topic
        </label>
        <input
          type="text"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          placeholder="e.g., Future of AI in Healthcare"
          className="w-full border border-gray-300 rounded-md px-4 py-2 text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <button
          onClick={generateBlog}
          disabled={loading}
          className="mt-4 flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-2 rounded-md font-semibold transition duration-200 disabled:opacity-50"
        >
          {loading ? (
            <>
              <Loader2 className="animate-spin w-5 h-5" />
              Generating...
            </>
          ) : (
            <>
              <Wand2 className="w-5 h-5" />
              Generate with AI
            </>
          )}
        </button>
      </div>

      <div className="bg-gray-100 border border-gray-300 rounded-xl p-6 min-h-[250px] text-gray-800 whitespace-pre-wrap shadow-inner transition-all duration-300">
        {blog ? (
          blog
        ) : (
          <p className="text-gray-400 italic">
            Generated blog content will appear here...
          </p>
        )}
      </div>

      {blog && (
        <div className="text-center mt-6">
          <button className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-md transition font-medium">
            <Save className="w-5 h-5" /> Save Post
          </button>
        </div>
      )}
    </main>
  );
}
