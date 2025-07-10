// app/layout.tsx
import './globals.css'; // ✅ optional, only if using global styles

export const metadata = {
  title: 'AI Blog',
  description: 'Generate AI-powered blogs easily',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
