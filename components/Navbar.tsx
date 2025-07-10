'use client';

import { useSession, signIn, signOut } from 'next-auth/react';

export default function Navbar() {
  const { data: session, status } = useSession();

  return (
    <nav className="flex justify-between items-center p-4 bg-gray-100 shadow">
      <h1 className="text-xl font-bold">🧠 AI Blog</h1>

      {status === 'loading' ? (
        <p>Loading...</p>
      ) : session?.user ? (
        <div className="flex items-center gap-4">
          <p>Hello, {session.user.name || session.user.email}</p>
          <button
            onClick={() => signOut()}
            className="bg-red-500 text-white px-4 py-1 rounded"
          >
            Logout
          </button>
        </div>
      ) : (
        <button
          onClick={() => signIn('github')}
          className="bg-black text-white px-4 py-1 rounded"
        >
          Login with GitHub
        </button>
      )}
    </nav>
  );
}
