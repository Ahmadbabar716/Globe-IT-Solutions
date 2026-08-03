import React from "react";

const courses = [
  {
    icon: "🤖",
    title: "Machine Learning",
    description: "Build intelligent models with Python, TensorFlow & scikit-learn",
    color: "from-purple-500/20 to-blue-500/20",
    border: "border-purple-500/30",
    glow: "hover:shadow-[0_0_30px_rgba(168,85,247,0.3)]",
  },
  {
    icon: "🌐",
    title: "Web Development",
    description: "Full-stack web apps with modern frameworks and best practices",
    color: "from-cyan-500/20 to-teal-500/20",
    border: "border-cyan-500/30",
    glow: "hover:shadow-[0_0_30px_rgba(6,182,212,0.3)]",
  },
  {
    icon: "🐘",
    title: "PHP",
    description: "Server-side scripting, MySQL databases & dynamic web pages",
    color: "from-blue-500/20 to-indigo-500/20",
    border: "border-blue-500/30",
    glow: "hover:shadow-[0_0_30px_rgba(59,130,246,0.3)]",
  },
  {
    icon: "⚡",
    title: "AI Flow / AI Automation",
    description: "Automate workflows using AI tools, prompt engineering & n8n",
    color: "from-yellow-500/20 to-orange-500/20",
    border: "border-yellow-500/30",
    glow: "hover:shadow-[0_0_30px_rgba(234,179,8,0.3)]",
  },
  {
    icon: "🎨",
    title: "Frontend Development",
    description: "React, Next.js, Tailwind CSS — pixel-perfect responsive UIs",
    color: "from-pink-500/20 to-rose-500/20",
    border: "border-pink-500/30",
    glow: "hover:shadow-[0_0_30px_rgba(236,72,153,0.3)]",
  },
  {
    icon: "⚙️",
    title: "Backend Development",
    description: "Node.js, APIs, databases, authentication & server architecture",
    color: "from-emerald-500/20 to-green-500/20",
    border: "border-emerald-500/30",
    glow: "hover:shadow-[0_0_30px_rgba(16,185,129,0.3)]",
  },
  {
    icon: "📣",
    title: "Digital Marketing",
    description: "SEO, social media strategy, ads & analytics for modern brands",
    color: "from-orange-500/20 to-red-500/20",
    border: "border-orange-500/30",
    glow: "hover:shadow-[0_0_30px_rgba(249,115,22,0.3)]",
  },
  {
    icon: "🛡️",
    title: "Cybersecurity",
    description: "Ethical hacking, network security, penetration testing & defense",
    color: "from-slate-500/20 to-gray-500/20",
    border: "border-slate-400/30",
    glow: "hover:shadow-[0_0_30px_rgba(100,116,139,0.3)]",
  },
];

export default function CourseGrid() {
  return (
    <section id="courses" className="w-full">
      <h2 className="mb-3 text-center text-sm font-semibold uppercase tracking-widest text-neon-cyan">
        Our Courses
      </h2>
      <h3 className="mb-8 text-center text-2xl md:text-3xl font-bold text-white">
        Choose Your Learning Path
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {courses.map((course) => (
          <div
            key={course.title}
            className={`group relative overflow-hidden rounded-2xl border ${course.border} bg-gradient-to-br ${course.color} backdrop-blur-sm p-5 transition-all duration-300 hover:scale-[1.02] hover:-translate-y-1 ${course.glow} cursor-default`}
          >
            {/* Subtle inner glow on hover */}
            <div className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white/[0.03]" />

            <div className="flex items-start gap-4">
              <span className="text-3xl leading-none mt-0.5 animate-float" style={{ animationDelay: `${Math.random() * 2}s` }}>
                {course.icon}
              </span>
              <div>
                <h4 className="font-bold text-white text-base mb-1">{course.title}</h4>
                <p className="text-gray-400 text-sm leading-relaxed">{course.description}</p>
              </div>
            </div>

            {/* Corner accent */}
            <div className="absolute top-3 right-3 h-1.5 w-1.5 rounded-full bg-neon-cyan/60 animate-pulse" />
          </div>
        ))}
      </div>
    </section>
  );
}
