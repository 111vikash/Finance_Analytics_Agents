"use client";

import React, { useState } from "react";
import { Eye, EyeOff, Mail, Lock } from "lucide-react";
import { useRouter } from "next/navigation";

export default function Login() {
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
    form: "",
  });

  const [touched, setTouched] = useState({
    email: false,
    password: false,
  });

  const dummyCreds = {
    email: "Admin@capgemini.com",
    password: "Admin@1234",
  };

  const validate = () => {
    const newErrors = { email: "", password: "", form: "" };

    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/^[a-zA-Z0-9._%+-]+@capgemini\.com$/.test(formData.email)) {
      newErrors.email = "Use a valid Capgemini email address";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }

    setErrors(newErrors);
    return !newErrors.email && !newErrors.password;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    setErrors((prev) => ({
      ...prev,
      [name]: "",
      form: "",
    }));
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    validate();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setTouched({ email: true, password: true });

    if (!validate()) return;

    setIsSubmitting(true);

    try {
      if (
        formData.email === dummyCreds.email &&
        formData.password === dummyCreds.password
      ) {
        console.log("Login successful");
        router.push("/dashboard");
      } else {
        setErrors((prev) => ({
          ...prev,
          form: "Invalid credentials. Try test@capgemini.com / Test@1234",
        }));
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClass =
    "w-full rounded-xl border bg-[#0f1218] px-4 py-3 pl-11 text-sm text-slate-100 outline-none transition-all duration-300 placeholder:text-slate-500 focus:border-[#34d399]/60 focus:ring-4 focus:ring-[#34d399]/10";

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Error Message */}
      {errors.form && (
        <div className="rounded-xl border border-[#f87171]/30 bg-[#f87171]/10 px-4 py-3 text-sm text-[#f87171]">
          {errors.form}
        </div>
      )}

      {/* Email */}
      <div>
        <label
          htmlFor="email"
          className="mb-2 block text-sm font-medium text-slate-200"
        >
          Email
        </label>
        <div className="relative">
          <Mail className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
          <input
            id="email"
            name="email"
            type="email"
            placeholder="test@capgemini.com"
            value={formData.email}
            onChange={handleChange}
            onBlur={handleBlur}
            className={`${inputClass} ${touched.email && errors.email
              ? "border-[#f87171]/60 focus:border-[#f87171]/60 focus:ring-[#f87171]/10"
              : "border-[#2a2f3a]"
              }`}
          />
        </div>
        {touched.email && errors.email && (
          <p className="mt-2 text-sm text-[#f87171]">{errors.email}</p>
        )}
      </div>

      {/* Password */}
      <div>
        <label
          htmlFor="password"
          className="mb-2 block text-sm font-medium text-slate-200"
        >
          Password
        </label>
        <div className="relative">
          <Lock className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
          <input
            id="password"
            name="password"
            type={showPassword ? "text" : "password"}
            placeholder="Test@1234"
            value={formData.password}
            onChange={handleChange}
            onBlur={handleBlur}
            className={`${inputClass} pr-12 ${touched.password && errors.password
              ? "border-[#f87171]/60 focus:border-[#f87171]/60 focus:ring-[#f87171]/10"
              : "border-[#2a2f3a]"
              }`}
          />
          <button
            type="button"
            onClick={() => setShowPassword((v) => !v)}
            className="absolute inset-y-0 right-3 flex items-center text-slate-500 hover:text-slate-200"
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
        </div>
        {touched.password && errors.password && (
          <p className="mt-2 text-sm text-[#f87171]">{errors.password}</p>
        )}
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={isSubmitting}
        className={`w-full rounded-xl bg-amber-400 px-4 py-3 text-sm font-semibold text-[#071015] transition-all duration-300 hover:bg-amber-300 hover:shadow-[0_0_24px_rgba(52,211,153,0.18)] active:scale-[0.99] ${isSubmitting ? "cursor-not-allowed opacity-60" : ""
          }`}
      >
        {isSubmitting ? "Signing In..." : "Sign In"}
      </button>


    </form>
  );
}