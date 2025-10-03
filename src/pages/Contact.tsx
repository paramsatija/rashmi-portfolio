/**
 * Contact Page
 * Contact form with purpose chips, validation, and info card
 */

import { motion } from "framer-motion";
import { useState, FormEvent } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Mail, MapPin, Building2, Instagram, Send, CheckCircle2 } from "lucide-react";
//import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import GradientBackground from "@/components/GradientBackground";
import { toast } from "sonner";

export default function Contact() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const initialType = searchParams.get("type") || "";

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    organization: "",
    purpose: initialType,
    message: "",
    website: "", // Honeypot
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const purposeOptions = [
    { value: "partnership", label: "Partnership Opportunities" },
    { value: "qiaf", label: "QIAF Participation" },
    { value: "youth", label: "Youth Programs" },
    { value: "press", label: "Press & Media" },
    { value: "other", label: "Other Inquiry" },
  ];

  const handlePurposeChip = (value: string) => {
    setFormData({ ...formData, purpose: value });
    navigate(`/contact?type=${value}`, { replace: true });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    // Honeypot check
    if (formData.website) {
      console.log("Bot detected");
      return;
    }

    // Basic validation
    if (!formData.name || !formData.email || !formData.message) {
      toast.error("Please fill in all required fields");
      return;
    }

    setIsSubmitting(true);

    // Simulate API call
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      
      // Here you would normally send to /api/contact or your backend
      console.log("Form submitted:", { ...formData, website: undefined });
      
      setIsSuccess(true);
      toast.success("Message sent successfully! ✨");
      
      // Reset form
      setTimeout(() => {
        setFormData({
          name: "",
          email: "",
          organization: "",
          purpose: "",
          message: "",
          website: "",
        });
        setIsSuccess(false);
      }, 3000);
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* <Nav /> */}

      {/* Hero */}
      <section className="relative min-h-[50vh] flex items-center justify-center overflow-hidden pt-24">
        <GradientBackground />
        
        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-7xl font-title font-bold mb-6 gradient-text"
          >
            Get in Touch
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl text-ink/80"
          >
            Let's start a conversation about your project or inquiry
          </motion.p>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Form */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="lg:col-span-2 glass p-8 md:p-12"
            >
              <h2 className="text-3xl font-title font-bold mb-6 gradient-text">
                Send a Message
              </h2>

              {/* Purpose Quick Chips */}
              <div className="mb-8">
                <label className="block text-sm font-semibold mb-3 text-ink/80">
                  What's this about?
                </label>
                <div className="flex flex-wrap gap-2">
                  {purposeOptions.map((option) => (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => handlePurposeChip(option.value)}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                        formData.purpose === option.value
                          ? "bg-accent-500 text-white"
                          : "bg-white/50 text-ink hover:bg-white/80"
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name */}
                <div>
                  <label htmlFor="name" className="block text-sm font-semibold mb-2 text-ink/80">
                    Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    required
                    autoComplete="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border border-primary-600/20 bg-white/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-accent-500"
                  />
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="email" className="block text-sm font-semibold mb-2 text-ink/80">
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    required
                    autoComplete="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border border-primary-600/20 bg-white/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-accent-500"
                  />
                </div>

                {/* Organization */}
                <div>
                  <label htmlFor="organization" className="block text-sm font-semibold mb-2 text-ink/80">
                    Organization (Optional)
                  </label>
                  <input
                    type="text"
                    id="organization"
                    autoComplete="organization"
                    value={formData.organization}
                    onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border border-primary-600/20 bg-white/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-accent-500"
                  />
                </div>

                {/* Purpose */}
                <div>
                  <label htmlFor="purpose" className="block text-sm font-semibold mb-2 text-ink/80">
                    Purpose *
                  </label>
                  <input
                    type="text"
                    id="purpose"
                    required
                    list="purpose-options"
                    value={formData.purpose}
                    onChange={(e) => setFormData({ ...formData, purpose: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border border-primary-600/20 bg-white/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-accent-500"
                    placeholder="Select or type your inquiry purpose"
                  />
                  <datalist id="purpose-options">
                    {purposeOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </datalist>
                </div>

                {/* Message */}
                <div>
                  <label htmlFor="message" className="block text-sm font-semibold mb-2 text-ink/80">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    required
                    rows={6}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border border-primary-600/20 bg-white/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-accent-500 resize-none"
                    placeholder="Tell me more about your inquiry..."
                  />
                </div>

                {/* Honeypot */}
                <input
                  type="text"
                  name="website"
                  value={formData.website}
                  onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                  className="hidden"
                  tabIndex={-1}
                  autoComplete="off"
                />

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting || isSuccess}
                  className="w-full glass-dark px-8 py-4 font-semibold text-ice-200 hover:scale-[1.02] transition-transform inline-flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSuccess ? (
                    <>
                      <CheckCircle2 size={20} />
                      Message Sent!
                    </>
                  ) : isSubmitting ? (
                    "Sending..."
                  ) : (
                    <>
                      <Send size={20} />
                      Send Message
                    </>
                  )}
                </button>

                {/* Success message region */}
                {isSuccess && (
                  <div
                    role="status"
                    aria-live="polite"
                    className="text-center text-accent-500 font-medium"
                  >
                    Thank you! I'll get back to you soon. ✨
                  </div>
                )}
              </form>
            </motion.div>

            {/* Info Card */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="space-y-6"
            >
              <div className="glass p-6">
                <h3 className="text-xl font-title font-bold mb-6 gradient-text">
                  Contact Information
                </h3>

                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Mail className="w-5 h-5 text-accent-500 mt-1" />
                    <div>
                      <div className="text-sm text-ink/60 mb-1">Email</div>
                      <a
                        href="mailto:rashmi@example.com"
                        className="text-ink hover:text-accent-500 transition-colors"
                      >
                        rashmi@example.com
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Mail className="w-5 h-5 text-accent-500 mt-1" />
                    <div>
                      <div className="text-sm text-ink/60 mb-1">Business Inquiries</div>
                      <a
                        href="mailto:contact@qiaf.org"
                        className="text-ink hover:text-accent-500 transition-colors"
                      >
                        contact@qiaf.org
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Building2 className="w-5 h-5 text-accent-500 mt-1" />
                    <div>
                      <div className="text-sm text-ink/60 mb-1">Company</div>
                      <div className="text-ink">Al Thuraya Astronomia</div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-accent-500 mt-1" />
                    <div>
                      <div className="text-sm text-ink/60 mb-1">Location</div>
                      <div className="text-ink">Doha, Qatar</div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Instagram className="w-5 h-5 text-accent-500 mt-1" />
                    <div>
                      <div className="text-sm text-ink/60 mb-1">Instagram</div>
                      <a
                        href="https://instagram.com/rashmiagarwal"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-ink hover:text-accent-500 transition-colors"
                      >
                        @rashmiagarwal
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              <div className="glass p-6">
                <h3 className="text-lg font-title font-bold mb-3">Response Time</h3>
                <p className="text-sm text-ink/70">
                  I typically respond to inquiries within 24-48 hours during business days. For urgent matters, please indicate so in your message.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
