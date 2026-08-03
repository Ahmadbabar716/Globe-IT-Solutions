"use client";

import { useState } from "react";

const COURSES = [
  "Machine Learning",
  "Web Development",
  "PHP",
  "AI Flow / AI Automation",
  "Frontend Development",
  "Backend Development",
  "Digital Marketing",
  "Cybersecurity",
];

// Apply CNIC mask: XXXXX-XXXXXXX-X
function applyCnicMask(value: string): string {
  const digits = value.replace(/\D/g, "").substring(0, 13);
  if (digits.length <= 5) return digits;
  if (digits.length <= 12) return `${digits.slice(0, 5)}-${digits.slice(5)}`;
  return `${digits.slice(0, 5)}-${digits.slice(5, 12)}-${digits.slice(12)}`;
}

export default function RegistrationForm() {
  const [form, setForm] = useState({
    name: "",
    fatherName: "",
    phone: "",
    cnic: "",
    address: "",
    course: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [serverError, setServerError] = useState("");

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) {
    const { name, value } = e.target;
    if (name === "cnic") {
      setForm((prev) => ({ ...prev, cnic: applyCnicMask(value) }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
    // Clear field error on change
    setErrors((prev) => ({ ...prev, [name]: "" }));
  }

  function validate(): boolean {
    const newErrors: Record<string, string> = {};
    if (!form.name.trim()) newErrors.name = "Full name is required.";
    if (!form.fatherName.trim()) newErrors.fatherName = "Father name is required.";
    if (!/^03[0-9]{9}$/.test(form.phone.trim()))
      newErrors.phone = "Enter a valid Pakistani number (e.g. 03001234567).";
    if (!/^\d{5}-\d{7}-\d{1}$/.test(form.cnic.trim()))
      newErrors.cnic = "Enter CNIC as XXXXX-XXXXXXX-X.";
    if (!form.address.trim()) newErrors.address = "Address is required.";
    if (!form.course) newErrors.course = "Please select a course.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setServerError("");
    if (!validate()) return;

    setLoading(true);
    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) {
        setServerError(data.error || "Something went wrong.");
      } else {
        setSuccess(true);
      }
    } catch {
      setServerError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  if (success) {
    return (
      <div
        id="registration-success"
        className="relative overflow-hidden rounded-2xl border border-neon-cyan/30 bg-card-bg backdrop-blur-xl p-10 text-center shadow-card-glow"
      >
        {/* Animated success rings */}
        <div className="relative mx-auto mb-6 h-24 w-24">
          <div className="absolute inset-0 rounded-full bg-neon-cyan/20 animate-ping" />
          <div className="absolute inset-2 rounded-full bg-neon-cyan/30 animate-pulse" />
          <div className="relative flex items-center justify-center h-full w-full rounded-full bg-gradient-to-br from-neon-cyan/40 to-glow-purple/40 border-2 border-neon-cyan">
            <svg className="w-10 h-10 text-neon-cyan" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
        </div>
        <h3 className="text-2xl font-bold text-white mb-3">Registration Successful! 🎉</h3>
        <p className="text-soft-cyan text-lg leading-relaxed">
          Thank you! We&apos;ll contact you on{" "}
          <span className="text-neon-cyan font-semibold">WhatsApp</span> shortly.
        </p>
        <p className="mt-4 text-gray-400 text-sm">
          Keep your phone handy — our team will reach out within 24 hours.
        </p>
      </div>
    );
  }

  const inputClass =
    "w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-gray-500 outline-none transition-all duration-200 focus:border-neon-cyan/60 focus:bg-white/8 focus:shadow-[0_0_0_2px_rgba(0,229,255,0.15)] text-sm";
  const labelClass = "block text-sm font-medium text-gray-300 mb-1.5";
  const errorClass = "mt-1.5 text-xs text-red-400";

  return (
    <form
      id="registration-form"
      onSubmit={handleSubmit}
      className="relative overflow-hidden rounded-2xl border border-neon-cyan/30 bg-card-bg backdrop-blur-xl p-6 md:p-8 shadow-card-glow"
      noValidate
    >
      {/* Decorative corner glows */}
      <div className="pointer-events-none absolute -top-10 -right-10 h-40 w-40 rounded-full bg-neon-cyan/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-10 -left-10 h-40 w-40 rounded-full bg-glow-purple/10 blur-3xl" />

      <h2 className="text-2xl font-bold text-white mb-2">
        Register Now{" "}
        <span className="text-neon-cyan">✨</span>
      </h2>
      <p className="text-gray-400 text-sm mb-6">
        Fill in the form below — we&apos;ll confirm your slot via WhatsApp.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Full Name */}
        <div>
          <label htmlFor="name" className={labelClass}>Full Name *</label>
          <input
            id="name"
            name="name"
            type="text"
            placeholder="e.g. Ahmed Ali"
            value={form.name}
            onChange={handleChange}
            className={inputClass}
            autoComplete="name"
          />
          {errors.name && <p className={errorClass}>{errors.name}</p>}
        </div>

        {/* Father Name */}
        <div>
          <label htmlFor="fatherName" className={labelClass}>Father Name *</label>
          <input
            id="fatherName"
            name="fatherName"
            type="text"
            placeholder="e.g. Muhammad Ali"
            value={form.fatherName}
            onChange={handleChange}
            className={inputClass}
          />
          {errors.fatherName && <p className={errorClass}>{errors.fatherName}</p>}
        </div>

        {/* Phone */}
        <div>
          <label htmlFor="phone" className={labelClass}>Phone Number *</label>
          <input
            id="phone"
            name="phone"
            type="tel"
            placeholder="03001234567"
            value={form.phone}
            onChange={handleChange}
            className={inputClass}
            maxLength={11}
            autoComplete="tel"
          />
          {errors.phone && <p className={errorClass}>{errors.phone}</p>}
        </div>

        {/* CNIC */}
        <div>
          <label htmlFor="cnic" className={labelClass}>CNIC *</label>
          <input
            id="cnic"
            name="cnic"
            type="text"
            placeholder="XXXXX-XXXXXXX-X"
            value={form.cnic}
            onChange={handleChange}
            className={inputClass}
            maxLength={15}
          />
          {errors.cnic && <p className={errorClass}>{errors.cnic}</p>}
        </div>

        {/* Course */}
        <div className="md:col-span-2">
          <label htmlFor="course" className={labelClass}>Course Interested In *</label>
          <select
            id="course"
            name="course"
            value={form.course}
            onChange={handleChange}
            className={`${inputClass} cursor-pointer`}
          >
            <option value="" disabled className="bg-dark-purple">
              — Select a course —
            </option>
            {COURSES.map((c) => (
              <option key={c} value={c} className="bg-dark-purple">
                {c}
              </option>
            ))}
          </select>
          {errors.course && <p className={errorClass}>{errors.course}</p>}
        </div>

        {/* Address */}
        <div className="md:col-span-2">
          <label htmlFor="address" className={labelClass}>Address *</label>
          <textarea
            id="address"
            name="address"
            placeholder="Your full residential address"
            value={form.address}
            onChange={handleChange}
            className={`${inputClass} resize-none h-24`}
            rows={3}
          />
          {errors.address && <p className={errorClass}>{errors.address}</p>}
        </div>
      </div>

      {serverError && (
        <div className="mt-4 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400">
          ⚠️ {serverError}
        </div>
      )}

      <button
        id="submit-registration"
        type="submit"
        disabled={loading}
        className="relative mt-6 w-full overflow-hidden rounded-xl bg-btn-gradient py-4 text-base font-bold text-deep-navy shadow-btn-glow transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_35px_rgba(0,229,255,0.8)] active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed disabled:scale-100"
      >
        {loading ? (
          <span className="flex items-center justify-center gap-2">
            <svg className="h-5 w-5 animate-spin" viewBox="0 0 24 24" fill="none">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
            </svg>
            Submitting...
          </span>
        ) : (
          "Register Now 🚀"
        )}
        {/* Shimmer overlay */}
        <div className="pointer-events-none absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-white/20 to-transparent" />
      </button>
    </form>
  );
}
