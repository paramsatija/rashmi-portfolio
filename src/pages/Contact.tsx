/**
 * CONTACT PAGE — THE PORTAL
 * Dynamic gradient portal that opens as form fills
 * Particle system | Success animations | Immersive experience
 */

import React, { useState, useEffect, useRef } from "react";
import { motion, useMotionValue, useTransform, AnimatePresence } from "framer-motion";
import {
  Mail,
  Building2,
  MapPin,
  Globe,
  Sparkles,
  CheckCircle2,
  Heart,
  Send,
  User,
  Briefcase,
  BookOpen,
} from "lucide-react";
import { tokens } from "@/lib/tokens";

/* ==========================================
   PARTICLE SYSTEM
   ========================================== */
const ParticleField: React.FC<{ active: boolean }> = ({ active }) => {
  const particles = Array.from({ length: 30 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 4 + 2,
    duration: Math.random() * 3 + 2,
  }));

  if (!active) return null;

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full bg-gradient-to-r from-coral to-sky"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
          }}
          animate={{
            y: [0, -100, -200],
            opacity: [0, 1, 0],
            scale: [0, 1, 0.5],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            ease: "easeOut",
          }}
        />
      ))}
    </div>
  );
};

/* ==========================================
   PORTAL ANIMATION
   ========================================== */
const Portal: React.FC<{ progress: number }> = ({ progress }) => {
  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
      <motion.div
        className="relative"
        style={{
          width: "600px",
          height: "600px",
        }}
      >
        {/* Portal rings */}
        {[0, 1, 2, 3].map((i) => (
          <motion.div
            key={i}
            className="absolute inset-0 rounded-full border-2"
            style={{
              borderColor: i % 2 === 0 ? tokens.colors.coral.base : tokens.colors.sky.base,
              scale: progress * (1 + i * 0.2),
              opacity: progress * (1 - i * 0.2),
            }}
            animate={{
              rotate: i % 2 === 0 ? 360 : -360,
            }}
            transition={{
              duration: 20 + i * 5,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        ))}

        {/* Center glow */}
        <motion.div
          className="absolute inset-0 rounded-full blur-3xl"
          style={{
            background: `radial-gradient(circle, ${tokens.colors.coral.base}, ${tokens.colors.sky.base}, transparent)`,
            scale: progress,
            opacity: progress * 0.3,
          }}
        />
      </motion.div>
    </div>
  );
};

/* ==========================================
   MAIN CONTACT COMPONENT
   ========================================== */
export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    organization: "",
    message: "",
    purpose: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Calculate form progress (0-1)
  const formProgress = 
    (formData.name ? 0.2 : 0) +
    (formData.email ? 0.2 : 0) +
    (formData.organization ? 0.2 : 0) +
    (formData.message.length > 20 ? 0.2 : 0) +
    (formData.purpose ? 0.2 : 0);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
      
    setIsSubmitting(false);
      setIsSuccess(true);
      
    // Reset after 5 seconds
      setTimeout(() => {
      setIsSuccess(false);
        setFormData({
          name: "",
          email: "",
          organization: "",
        message: "",
          purpose: "",
      });
    }, 5000);
  };

  const purposes = [
    { id: "partnership", label: "Partnership", icon: Heart },
    { id: "qiaf", label: "QIAF Inquiry", icon: Sparkles },
    { id: "youth", label: "Youth Program", icon: User },
    { id: "press", label: "Press/Media", icon: Mail },
    { id: "other", label: "Other", icon: Briefcase },
  ];

  return (
    <main className="relative min-h-screen bg-canvas overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-3xl opacity-20"
          style={{
            background: `radial-gradient(circle, ${tokens.colors.coral.base}, transparent)`,
          }}
          animate={{
            x: [0, 100, 0],
            y: [0, -50, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full blur-3xl opacity-15"
          style={{
            background: `radial-gradient(circle, ${tokens.colors.sky.base}, transparent)`,
          }}
          animate={{
            x: [0, -80, 0],
            y: [0, 60, 0],
            scale: [1, 1.3, 1],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      {/* Portal animation */}
      <Portal progress={formProgress} />

      {/* Particle field (active when form is being filled) */}
      <ParticleField active={formProgress > 0.3 && !isSuccess} />

      {/* FAQs Section */}
      <section className="relative z-10 py-20 px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-sky/20 mb-6"
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <Sparkles className="w-4 h-4 text-sky" />
              <span className="text-sm font-medium text-sky">Common Questions</span>
            </motion.div>

            <h2 className="text-5xl font-bold gradient-text mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-secondary max-w-2xl mx-auto">
              Everything you need to know about partnerships, programs, and collaborations
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-8">
            {[
              {
                q: "How can I partner with QIAF?",
                a: "We welcome partnerships with cultural institutions, educational organizations, and government entities. Contact us to discuss collaboration opportunities and partnership benefits including visibility, networking, and cultural impact."
              },
              {
                q: "Can I exhibit my work at QIAF?",
                a: "Yes! QIAF 2025 is open to artists from all 70+ participating countries. Registration opens in early 2025. Visit qiaf.net for application details, submission requirements, and selection criteria."
              },
              {
                q: "How do I enroll in youth programs?",
                a: "Our youth programs are open to individuals aged 13-25 and educational institutions. Registration is available through our website and partner institutions. Programs include Innovation & Technology, Arts & Creative Expression, STEM Research, and more."
              },
              {
                q: "Are you available for speaking engagements?",
                a: "Yes, Rashmi is available for speaking engagements on cultural diplomacy, youth development, educational innovation, and festival management. Contact us to discuss topics, audience, and scheduling."
              },
              {
                q: "How can my organization collaborate with MAPS International?",
                a: "We offer various collaboration opportunities including educational partnerships, cultural exchange programs, institutional support, and government collaborations. Each partnership is customized to align with your organization's mission and our cultural impact goals."
              },
              {
                q: "What is the response time for inquiries?",
                a: "We typically respond to inquiries within 24-48 hours during business days. For urgent matters, please call our office directly. All partnership proposals are reviewed within one week."
              },
              {
                q: "How do I become a cultural ambassador?",
                a: "Cultural ambassadors are selected based on cultural expertise, local influence, and artistic background. Applications are reviewed annually for QIAF participation. Ambassadors help connect international artists, facilitate cultural exchange, and promote local cultural initiatives."
              },
              {
                q: "What support do you provide to international artists?",
                a: "We provide comprehensive support including visa assistance, accommodation coordination, exhibition space, networking facilitation, media exposure, and cultural orientation. Our team ensures smooth participation for all international artists."
              },
            ].map((faq, i) => (
              <motion.div
                key={i}
                className="bento-card p-8 group"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                whileHover={{ y: -4, scale: 1.01 }}
              >
                <h3 className="text-xl font-bold text-primary mb-4 group-hover:text-coral transition-colors">
                  {faq.q}
                </h3>
                <p className="text-secondary leading-relaxed">
                  {faq.a}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Partnership Opportunities */}
          <motion.div
            className="mt-20 glass rounded-3xl p-12"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
          >
            <h3 className="text-3xl font-bold gradient-text mb-8 text-center">
              Partnership Opportunities
            </h3>
            <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-6">
              {[
                { icon: BookOpen, title: "Educational Partnerships", desc: "Schools, universities, research institutions" },
                { icon: Globe, title: "Cultural Exchange", desc: "International organizations, embassies" },
                { icon: Building2, title: "Government Collaborations", desc: "Cultural ministries, tourism authorities" },
                { icon: Mail, title: "Media Partnerships", desc: "Publications, broadcasters, platforms" },
                { icon: Briefcase, title: "Corporate Sponsorships", desc: "Businesses supporting culture" },
              ].map((opp, i) => (
                <motion.div
                  key={opp.title}
                  className="text-center"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1.2 + i * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                >
                  <div 
                    className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-coral/20 to-sky/20 flex items-center justify-center"
                  >
                    <opp.icon className="w-8 h-8 text-coral" />
                  </div>
                  <h4 className="text-sm font-bold text-primary mb-2">{opp.title}</h4>
                  <p className="text-xs text-tertiary">{opp.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center py-20 px-8">
        <div className="max-w-6xl mx-auto w-full">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <motion.div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-coral/20 mb-8"
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <Sparkles className="w-4 h-4 text-coral" />
              <span className="text-sm font-medium text-coral">Let's Connect</span>
            </motion.div>

            <h1 className="text-6xl lg:text-7xl font-bold gradient-text mb-6">
              {isSuccess ? "Connection Established!" : "Open a Conversation"}
            </h1>

            <p className="text-xl text-secondary max-w-2xl mx-auto">
              {isSuccess 
                ? "Thank you for reaching out. We'll respond within 24 hours." 
                : "Whether it's a partnership, program inquiry, or collaboration idea—let's make it happen."
              }
            </p>
          </motion.div>

          <AnimatePresence mode="wait">
            {isSuccess ? (
              /* Success Animation */
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="glass rounded-3xl p-12 text-center max-w-2xl mx-auto"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{
                    type: "spring",
                    stiffness: 200,
                    damping: 15,
                  }}
                >
                  <CheckCircle2 className="w-24 h-24 mx-auto mb-6 text-green-500" />
                </motion.div>

                <h2 className="text-3xl font-bold text-primary mb-4">
                  Message Received!
              </h2>

                <p className="text-lg text-secondary mb-8">
                  Your message is traveling through the portal. We'll get back to you soon.
                </p>

                <motion.div
                  className="flex items-center justify-center gap-2 text-sm text-tertiary"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                  <span>Response within 24 hours</span>
                </motion.div>
              </motion.div>
            ) : (
              /* Form */
              <motion.div
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="grid lg:grid-cols-3 gap-8"
              >
                {/* Form */}
                <div className="lg:col-span-2">
                  <form onSubmit={handleSubmit} className="glass rounded-3xl p-8 space-y-6">
                    {/* Purpose chips */}
                    <div>
                      <label className="text-sm font-semibold text-primary mb-3 block">
                        What brings you here?
                </label>
                      <div className="flex flex-wrap gap-3">
                        {purposes.map((purpose) => (
                    <motion.button
                            key={purpose.id}
                      type="button"
                            onClick={() => setFormData({ ...formData, purpose: purpose.id })}
                            className={`chip transition-all ${
                              formData.purpose === purpose.id
                                ? "bg-gradient-to-r from-coral to-sky text-white border-transparent"
                                : ""
                            }`}
                            whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                          >
                            <purpose.icon className="w-4 h-4" />
                            <span>{purpose.label}</span>
                    </motion.button>
                  ))}
                </div>
              </div>

                {/* Name */}
                <div>
                      <label htmlFor="name" className="text-sm font-semibold text-primary mb-2 block">
                        Your Name
                  </label>
                  <input
                        id="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-6 py-4 rounded-2xl glass border border-white/50 focus:border-coral focus:ring-2 focus:ring-coral/20 transition-all text-primary placeholder:text-tertiary"
                        placeholder="Rashmi Agarwal"
                  />
                </div>

                {/* Email */}
                <div>
                      <label htmlFor="email" className="text-sm font-semibold text-primary mb-2 block">
                        Email Address
                  </label>
                  <input
                        id="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-6 py-4 rounded-2xl glass border border-white/50 focus:border-coral focus:ring-2 focus:ring-coral/20 transition-all text-primary placeholder:text-tertiary"
                        placeholder="name@example.com"
                  />
                </div>

                {/* Organization */}
                <div>
                      <label htmlFor="organization" className="text-sm font-semibold text-primary mb-2 block">
                    Organization (Optional)
                  </label>
                  <input
                        id="organization"
                    type="text"
                    value={formData.organization}
                    onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                        className="w-full px-6 py-4 rounded-2xl glass border border-white/50 focus:border-sky focus:ring-2 focus:ring-sky/20 transition-all text-primary placeholder:text-tertiary"
                        placeholder="Your company or institution"
                  />
                </div>

                {/* Message */}
                <div>
                      <label htmlFor="message" className="text-sm font-semibold text-primary mb-2 block">
                        Message
                  </label>
                  <textarea
                    id="message"
                    required
                    rows={6}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        className="w-full px-6 py-4 rounded-2xl glass border border-white/50 focus:border-coral focus:ring-2 focus:ring-coral/20 transition-all text-primary placeholder:text-tertiary resize-none"
                        placeholder="Tell me about your project, partnership idea, or inquiry..."
                      />
                      <div className="mt-2 text-xs text-tertiary">
                        {formData.message.length} / 500 characters
                      </div>
                </div>

                    {/* Submit button */}
                <motion.button
                  type="submit"
                      disabled={isSubmitting || !formData.purpose || !formData.name || !formData.email || !formData.message}
                      className="w-full btn btn-primary py-5 text-lg relative overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed"
                      whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                    >
                      <span className="relative z-10 flex items-center justify-center gap-2">
                        {isSubmitting ? (
                    <>
                      <motion.div
                              className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                            />
                            <span>Sending...</span>
                    </>
                  ) : (
                    <>
                            <Send className="w-5 h-5" />
                            <span>Send Message</span>
                    </>
                  )}
                      </span>
                </motion.button>

                    {/* Form progress indicator */}
                    <div className="flex items-center gap-2 text-xs text-tertiary">
                      <div className="flex-1 h-1 bg-mist rounded-full overflow-hidden">
                        <motion.div
                          className="h-full bg-gradient-to-r from-coral to-sky"
                          style={{ width: `${formProgress * 100}%` }}
                          transition={{ duration: 0.3 }}
                        />
                      </div>
                      <span>{Math.round(formProgress * 100)}% complete</span>
                    </div>
                  </form>
                </div>

                {/* Contact Info */}
                <div className="space-y-6">
                  {/* Response time */}
                  <motion.div
                    className="glass rounded-2xl p-6"
                    initial={{ opacity: 0, x: 40 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-xl bg-green-500/20 flex items-center justify-center flex-shrink-0">
                        <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-primary mb-1">Quick Response</h3>
                        <p className="text-sm text-secondary">We typically respond within 24 hours</p>
                      </div>
                    </div>
            </motion.div>

                  {/* Contact details */}
                  {[
                    { icon: Mail, label: "Email", value: "contact@example.com", color: tokens.colors.coral.base },
                    { icon: Building2, label: "Organization", value: "Qatar International Art Festival", color: tokens.colors.sky.base },
                    { icon: MapPin, label: "Location", value: "Doha, Qatar", color: tokens.colors.amber.base },
                    { icon: Globe, label: "Website", value: "qiaf.net", link: "https://qiaf.net", color: "#9B59B6" },
                  ].map((contact, i) => (
            <motion.div
                      key={contact.label}
                      className="glass rounded-2xl p-6 group hover:shadow-lg transition-all"
                      initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 + i * 0.1 }}
                      whileHover={{ x: 4 }}
                    >
                      <div className="flex items-start gap-4">
                        <div
                          className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 transition-transform group-hover:scale-110"
                          style={{ backgroundColor: `${contact.color}20` }}
                        >
                          <contact.icon className="w-5 h-5" style={{ color: contact.color }} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="text-xs font-semibold text-tertiary uppercase tracking-wider mb-1">
                            {contact.label}
                </h3>
                          {contact.link ? (
                            <a
                              href={contact.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-sm font-medium text-primary hover:text-coral transition-colors truncate block"
                            >
                              {contact.value}
                            </a>
                          ) : (
                            <p className="text-sm font-medium text-primary truncate">{contact.value}</p>
                          )}
                    </div>
                  </div>
                    </motion.div>
                  ))}

                  {/* 📸 PLACEHOLDER Note */}
                  <motion.div
                    className="glass rounded-2xl p-6 border-2 border-dashed border-coral/30"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                  >
                  <div className="flex items-start gap-3">
                      <Building2 className="w-5 h-5 text-coral flex-shrink-0 mt-0.5" />
                    <div>
                        <p className="text-xs text-secondary">
                          <strong className="text-coral">📸 Office Photo:</strong> Add workspace/studio photo to show where magic happens.
                        </p>
                  </div>
                    </div>
                  </motion.div>
              </div>
            </motion.div>
            )}
          </AnimatePresence>
        </div>
    </div>
    </main>
  );
}
