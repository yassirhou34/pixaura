"use client"

import type React from "react"

import { useState } from "react"
import { SectionHeading } from "./section-heading"

export function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    service: "",
    budget: "",
    timeline: "",
    message: "",
  })

  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        setSubmitted(true)
        setFormData({
          name: "",
          email: "",
          phone: "",
          company: "",
          service: "",
          budget: "",
          timeline: "",
          message: "",
        })
        setTimeout(() => setSubmitted(false), 5000)
      }
    } catch (error) {
      console.error("Form submission error:", error)
    }
  }

  return (
    <section id="contact" className="relative py-20 px-6 bg-black overflow-hidden">
      {/* Section Separator - Top */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent blur-sm" />
      
      <div className="max-w-5xl mx-auto">
        <SectionHeading
          title="Let's Talk About Your Project"
          subtitle="Tell us about your vision, and let's create something extraordinary together."
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mt-16">
          {/* Contact Info */}
          <div className="space-y-8">
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <svg className="w-6 h-6 text-primary mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <div>
                <h4 className="font-semibold mb-1">Email</h4>
                <a href="mailto:contact@pixaura.eu" className="text-foreground/70 hover:text-primary transition-colors">
                  contact@pixaura.eu
                </a>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <svg className="w-6 h-6 text-primary mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
              </div>
              <div>
                <h4 className="font-semibold mb-1">Phone</h4>
                <a href="tel:+33123456789" className="text-foreground/70 hover:text-primary transition-colors">
                  +33 1 23 45 67 89
                </a>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <svg className="w-6 h-6 text-primary mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              </div>
              <div>
                <h4 className="font-semibold mb-1">Location</h4>
                <p className="text-foreground/70">Paris, France</p>
              </div>
            </div>

            <div className="pt-8 border-t border-primary/20">
              <h4 className="font-semibold mb-4">Business Hours</h4>
              <p className="text-foreground/70 text-sm">
                Monday – Friday
                <br />
                9:00 AM – 6:00 PM (CET)
              </p>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-2">
            {submitted ? (
              <div className="p-8 bg-gradient-to-br from-primary/20 to-muted/10 border border-primary rounded-xl text-center">
                <h3 className="text-2xl font-bold mb-2 text-primary">Thank You!</h3>
                <p className="text-foreground/80">
                  We've received your message and will get back to you within 24 hours. Get ready to elevate your brand.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold mb-2">Full Name *</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-primary/10 border border-primary/20 rounded-lg focus:outline-none focus:border-primary transition-colors text-foreground"
                      placeholder="Your name"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold mb-2">Email *</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-primary/10 border border-primary/20 rounded-lg focus:outline-none focus:border-primary transition-colors text-foreground"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold mb-2">Phone</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-primary/10 border border-primary/20 rounded-lg focus:outline-none focus:border-primary transition-colors text-foreground"
                      placeholder="+33 1 23 45 67 89"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold mb-2">Company</label>
                    <input
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-primary/10 border border-primary/20 rounded-lg focus:outline-none focus:border-primary transition-colors text-foreground"
                      placeholder="Your company"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold mb-2">Service Type</label>
                    <select
                      name="service"
                      value={formData.service}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-primary/10 border border-primary/20 rounded-lg focus:outline-none focus:border-primary transition-colors text-foreground"
                    >
                      <option value="">Select a service</option>
                      <option value="branding">Branding & Identity</option>
                      <option value="video">Video Production</option>
                      <option value="social">Social Media</option>
                      <option value="ads">Ad Campaigns</option>
                      <option value="strategy">Marketing Strategy</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold mb-2">Budget Range</label>
                    <select
                      name="budget"
                      value={formData.budget}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-primary/10 border border-primary/20 rounded-lg focus:outline-none focus:border-primary transition-colors text-foreground"
                    >
                      <option value="">Select budget range</option>
                      <option value="under-1k">Under €1,000</option>
                      <option value="1k-5k">€1,000 - €5,000</option>
                      <option value="5k-10k">€5,000 - €10,000</option>
                      <option value="10k-plus">€10,000+</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2">Project Timeline</label>
                  <select
                    name="timeline"
                    value={formData.timeline}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-primary/10 border border-primary/20 rounded-lg focus:outline-none focus:border-primary transition-colors text-foreground"
                  >
                    <option value="">Select timeline</option>
                    <option value="urgent">ASAP (1 month)</option>
                    <option value="normal">1-3 months</option>
                    <option value="flexible">3-6 months</option>
                    <option value="planning">Just exploring</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2">Tell us about your project</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={4}
                    className="w-full px-4 py-3 bg-primary/10 border border-primary/20 rounded-lg focus:outline-none focus:border-primary transition-colors resize-none text-foreground"
                    placeholder="What's your vision?"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full px-6 py-4 bg-primary text-black font-bold rounded-lg hover-glow transition-all duration-300 hover:scale-105"
                >
                  Send My Project Brief
                </button>

                <p className="text-xs text-foreground/50 text-center">
                  We respect your privacy. Your information will never be shared.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
      
      {/* Section Separator - Bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent blur-sm" />
    </section>
  )
}
