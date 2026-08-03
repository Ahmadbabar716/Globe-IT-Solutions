import React from "react";

const infoItems = [
  { icon: "📅", label: "Registration Starts", value: "5th August" },
  { icon: "🚀", label: "Classes Start", value: "15th August" },
  { icon: "💰", label: "Registration Fee", value: "2,000 PKR (one-time)" },
  { icon: "💵", label: "Monthly Fee", value: "4,000 PKR" },
  { icon: "⏰", label: "Timing", value: "3 PM to 6 PM" },
  { icon: "🕒", label: "Duration", value: "3 to 6 Months" },
  { icon: "💻", label: "Format", value: "100% Online Classes (Weekdays)" },
];

export default function InfoBar() {
  return (
    <section id="course-info" className="w-full">
      <h2 className="mb-6 text-center text-sm font-semibold uppercase tracking-widest text-neon-cyan">
        Program Details
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-3">
        {infoItems.map((item) => (
          <div
            key={item.label}
            className="group flex items-center gap-4 rounded-xl border border-white/8 bg-white/4 backdrop-blur-sm px-4 py-3.5 transition-all duration-200 hover:border-neon-cyan/30 hover:bg-neon-cyan/5"
          >
            <span className="flex-shrink-0 text-xl w-8 text-center">{item.icon}</span>
            <div className="min-w-0">
              <p className="text-xs text-gray-500 uppercase tracking-wider leading-none mb-0.5">
                {item.label}
              </p>
              <p className="text-sm font-semibold text-white truncate">{item.value}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
