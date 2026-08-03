import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Globe IT Solutions — Course Registration 2026",
  description:
    "Register now for Globe IT Solutions tech courses: Machine Learning, Web Development, AI Automation, Digital Marketing, and more. Limited seats — August 2026 batch. Instructor: Qaiser Riaz.",
  keywords: [
    "Globe IT Solutions",
    "tech courses Pakistan",
    "machine learning course",
    "web development course",
    "online IT courses",
    "Qaiser Riaz",
  ],
  openGraph: {
    title: "Globe IT Solutions — Course Registration 2026",
    description: "Join our August 2026 tech batch. Only 25 seats. Top performers get hired!",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-deep-navy font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
