import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Mail,
  Phone,
  MapPin,
  Send,
  CheckCircle2,
  Building2,
  Globe,
  MessageSquare,
  User,
  Briefcase,
  Sparkles
} from 'lucide-react';
import { Footer } from './Footer';
import { Nav } from './Nav';

// Animated particle background component
const ParticleField = () => {
  return (
    <div className="absolute inset-0 overflow-hidden opacity-30 m-[0px]">
      {[...Array(40)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-purple-400 rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0.2, 0.8, 0.2],
            scale: [1, 1.5, 1],
          }}
          transition={{
            duration: 3 + Math.random() * 4,
            repeat: Infinity,
            delay: Math.random() * 2,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
};

// Mesh gradient background
const MeshGradient = () => {
  return (
    <div className="absolute inset-0 opacity-40">
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-transparent to-violet-900/20" />
      <div className="absolute inset-0 bg-gradient-to-tl from-fuchsia-900/10 via-transparent to-purple-900/10" />
      <motion.div
        className="absolute inset-0"
        style={{
          background: "radial-gradient(circle at 30% 50%, rgba(139, 92, 246, 0.15) 0%, transparent 50%)",
        }}
        animate={{
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </div>
  );
};

const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    company: '',
    jobTitle: '',
    interest: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsSubmitting(false);
    setIsSubmitted(true);

    // Reset form after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        company: '',
        jobTitle: '',
        interest: '',
        message: ''
      });
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0118] via-[#1a0b2e] to-[#0a0118] text-white">
      {/* Unified Header - Nav component includes both desktop and mobile */}
      <Nav />

      {/* Hero Section */}
      <section className="relative pt-24 pb-8 md:pt-28 md:pb-12 lg:pt-32 lg:pb-16 overflow-hidden">
        <MeshGradient />
        <ParticleField />
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            {/* Small Badge */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="inline-block mb-8 md:mb-10"
            >
              <div className="px-4 py-1.5 rounded-full border border-purple-500/30 bg-purple-500/5 backdrop-blur-sm">
                <span className="text-[11px] md:text-xs font-medium tracking-[0.2em] text-purple-300 uppercase">
                  GET IN TOUCH
                </span>
              </div>
            </motion.div>

            {/* Main Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="font-['Montserrat:SemiBold',sans-serif] text-[40px] md:text-[72px] lg:text-[84px] leading-[1.05] mb-6 md:mb-8 tracking-tight px-4"
            >
              <span className="block text-white">
                Contact our{' '}
                <span className="bg-gradient-to-r from-purple-400 via-fuchsia-400 to-purple-500 bg-clip-text text-transparent">
                  sales team
                </span>
              </span>
            </motion.h1>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-base md:text-lg lg:text-xl text-gray-400 max-w-3xl mx-auto px-4 leading-relaxed"
            >
              Ready to transform your business? Let's discuss your cloud journey.
            </motion.p>

            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="mt-8 md:mt-10"
            >
              
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section id="contact-form" className="relative py-6 md:py-8 lg:py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative bg-gradient-to-br from-purple-500/5 to-fuchsia-500/5 rounded-2xl md:rounded-3xl border border-purple-500/20 p-6 md:p-8 lg:p-12 backdrop-blur-sm"
          >
            {/* Decorative Elements */}
            <div className="absolute top-0 right-0 w-48 h-48 md:w-64 md:h-64 bg-purple-500/10 rounded-full blur-3xl -z-10" />
            <div className="absolute bottom-0 left-0 w-48 h-48 md:w-64 md:h-64 bg-fuchsia-500/10 rounded-full blur-3xl -z-10" />

            {/* Form Header */}
            <div className="mb-6 md:mb-8">
              <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-white mb-2 md:mb-3">
                Get Started Today
              </h2>
              <p className="text-sm md:text-base text-gray-300">
                Fill out the form below and our sales team will contact you within 24 hours.
              </p>
            </div>

            {/* Contact Form */}
            <form onSubmit={handleSubmit} className="space-y-5 md:space-y-6">
              {/* Name Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
                <div>
                  <label htmlFor="firstName" className="block text-xs md:text-sm font-medium text-gray-300 mb-2">
                    First Name <span className="text-red-400">*</span>
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 md:left-4 top-1/2 -translate-y-1/2 w-4 h-4 md:w-5 md:h-5 text-gray-400" />
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      placeholder="John"
                      required
                      className="w-full pl-10 md:pl-12 pr-4 py-2.5 md:py-3 text-sm md:text-base bg-white/5 border border-purple-500/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-purple-500/40 transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="lastName" className="block text-xs md:text-sm font-medium text-gray-300 mb-2">
                    Last Name <span className="text-red-400">*</span>
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 md:left-4 top-1/2 -translate-y-1/2 w-4 h-4 md:w-5 md:h-5 text-gray-400" />
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      placeholder="Smith"
                      required
                      className="w-full pl-10 md:pl-12 pr-4 py-2.5 md:py-3 text-sm md:text-base bg-white/5 border border-purple-500/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-purple-500/40 transition-colors"
                    />
                  </div>
                </div>
              </div>

              {/* Email and Phone */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
                <div>
                  <label htmlFor="email" className="block text-xs md:text-sm font-medium text-gray-300 mb-2">
                    Email Address <span className="text-red-400">*</span>
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 md:left-4 top-1/2 -translate-y-1/2 w-4 h-4 md:w-5 md:h-5 text-gray-400" />
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="john@company.com"
                      required
                      className="w-full pl-10 md:pl-12 pr-4 py-2.5 md:py-3 text-sm md:text-base bg-white/5 border border-purple-500/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-purple-500/40 transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="phone" className="block text-xs md:text-sm font-medium text-gray-300 mb-2">
                    Phone Number
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3 md:left-4 top-1/2 -translate-y-1/2 w-4 h-4 md:w-5 md:h-5 text-gray-400" />
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+1 (555) 123-4567"
                      className="w-full pl-10 md:pl-12 pr-4 py-2.5 md:py-3 text-sm md:text-base bg-white/5 border border-purple-500/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-purple-500/40 transition-colors"
                    />
                  </div>
                </div>
              </div>

              {/* Company and Job Title */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
                <div>
                  <label htmlFor="company" className="block text-xs md:text-sm font-medium text-gray-300 mb-2">
                    Company Name
                  </label>
                  <div className="relative">
                    <Building2 className="absolute left-3 md:left-4 top-1/2 -translate-y-1/2 w-4 h-4 md:w-5 md:h-5 text-gray-400" />
                    <input
                      type="text"
                      id="company"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      placeholder="Your Company"
                      className="w-full pl-10 md:pl-12 pr-4 py-2.5 md:py-3 text-sm md:text-base bg-white/5 border border-purple-500/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-purple-500/40 transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="jobTitle" className="block text-xs md:text-sm font-medium text-gray-300 mb-2">
                    Job Title
                  </label>
                  <div className="relative">
                    <Briefcase className="absolute left-3 md:left-4 top-1/2 -translate-y-1/2 w-4 h-4 md:w-5 md:h-5 text-gray-400" />
                    <input
                      type="text"
                      id="jobTitle"
                      name="jobTitle"
                      value={formData.jobTitle}
                      onChange={handleChange}
                      placeholder="CTO, IT Director, etc."
                      className="w-full pl-10 md:pl-12 pr-4 py-2.5 md:py-3 text-sm md:text-base bg-white/5 border border-purple-500/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-purple-500/40 transition-colors"
                    />
                  </div>
                </div>
              </div>

              {/* Interest Dropdown */}
              <div>
                <label htmlFor="interest" className="block text-xs md:text-sm font-medium text-gray-300 mb-2">
                  What are you interested in?
                </label>
                <div className="relative">
                  <Globe className="absolute left-3 md:left-4 top-1/2 -translate-y-1/2 w-4 h-4 md:w-5 md:h-5 text-gray-400 pointer-events-none z-10" />
                  <select
                    id="interest"
                    name="interest"
                    value={formData.interest}
                    onChange={handleChange}
                    className="w-full pl-10 md:pl-12 pr-4 py-2.5 md:py-3 text-sm md:text-base bg-white/5 border border-purple-500/20 rounded-xl text-white appearance-none cursor-pointer focus:outline-none focus:border-purple-500/40 transition-colors"
                  >
                    <option value="" className="bg-[#1a0b2e] text-white">Select an option</option>
                    <option value="cloud-practice" className="bg-[#1a0b2e] text-white">Cloud Practice</option>
                    <option value="digital-engineering" className="bg-[#1a0b2e] text-white">Digital Engineering</option>
                    <option value="ai-solutions" className="bg-[#1a0b2e] text-white">AI Solutions</option>
                    <option value="data-analytics" className="bg-[#1a0b2e] text-white">Data & Analytics</option>
                    <option value="security" className="bg-[#1a0b2e] text-white">Security Solutions</option>
                    <option value="other" className="bg-[#1a0b2e] text-white">Other</option>
                  </select>
                  <div className="absolute right-3 md:right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                    <svg className="w-4 h-4 md:w-5 md:h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Message */}
              <div>
                <label htmlFor="message" className="block text-xs md:text-sm font-medium text-gray-300 mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  placeholder="Tell us about your project requirements, timeline, and any specific questions you have..."
                  className="w-full px-4 py-2.5 md:py-3 text-sm md:text-base bg-white/5 border border-purple-500/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-purple-500/40 transition-colors resize-none"
                />
              </div>

              {/* Submit Button */}
              <div className="pt-3 md:pt-4">
                <motion.button
                  type="submit"
                  disabled={isSubmitting || isSubmitted}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                  className="group w-full relative overflow-hidden rounded-full bg-white hover:bg-gray-100 px-6 md:px-8 py-3 md:py-4 text-sm md:text-base font-semibold text-black shadow-lg shadow-white/20 transition-all duration-300 hover:shadow-2xl hover:shadow-white/30 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span className="relative z-10 flex items-center justify-center gap-2 md:gap-3">
                    {isSubmitting ? (
                      <>
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                          className="w-4 h-4 md:w-5 md:h-5 border-2 border-black border-t-transparent rounded-full"
                        />
                        Sending...
                      </>
                    ) : isSubmitted ? (
                      <>
                        <CheckCircle2 className="w-4 h-4 md:w-5 md:h-5" />
                        Message Sent Successfully!
                      </>
                    ) : (
                      <>
                        Send Message
                        <svg 
                          className="w-4 h-4 md:w-5 md:h-5 transition-transform duration-300 group-hover:translate-x-1" 
                          fill="none" 
                          stroke="currentColor" 
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </>
                    )}
                  </span>
                </motion.button>
              </div>
            </form>
          </motion.div>

          {/* Contact Information Cards */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mt-8 md:mt-12"
          >
            {/* Email Card */}
            <div className="relative bg-gradient-to-br from-purple-500/10 to-fuchsia-500/10 rounded-xl md:rounded-2xl border border-purple-500/20 p-5 md:p-6 hover:border-purple-500/40 transition-all duration-300">
              <div className="flex items-start gap-3 md:gap-4">
                <div className="p-2 md:p-3 rounded-lg md:rounded-xl bg-purple-500/20 flex-shrink-0">
                  <Mail className="w-5 h-5 md:w-6 md:h-6 text-purple-400" />
                </div>
                <div>
                  <h3 className="text-sm md:text-base font-semibold text-white mb-1">Email Us</h3>
                  <p className="text-xs md:text-sm text-gray-300">sales@accdata.com</p>
                </div>
              </div>
            </div>

            {/* Phone Card */}
            <div className="relative bg-gradient-to-br from-purple-500/10 to-fuchsia-500/10 rounded-xl md:rounded-2xl border border-purple-500/20 p-5 md:p-6 hover:border-purple-500/40 transition-all duration-300">
              <div className="flex items-start gap-3 md:gap-4">
                <div className="p-2 md:p-3 rounded-lg md:rounded-xl bg-purple-500/20 flex-shrink-0">
                  <Phone className="w-5 h-5 md:w-6 md:h-6 text-purple-400" />
                </div>
                <div>
                  <h3 className="text-sm md:text-base font-semibold text-white mb-1">Call Us</h3>
                  <p className="text-xs md:text-sm text-gray-300">+1 (555) 123-4567</p>
                </div>
              </div>
            </div>

            {/* Location Card */}
            <div className="relative bg-gradient-to-br from-purple-500/10 to-fuchsia-500/10 rounded-xl md:rounded-2xl border border-purple-500/20 p-5 md:p-6 hover:border-purple-500/40 transition-all duration-300">
              <div className="flex items-start gap-3 md:gap-4">
                <div className="p-2 md:p-3 rounded-lg md:rounded-xl bg-purple-500/20 flex-shrink-0">
                  <MapPin className="w-5 h-5 md:w-6 md:h-6 text-purple-400" />
                </div>
                <div>
                  <h3 className="text-sm md:text-base font-semibold text-white mb-1">Visit Us</h3>
                  <p className="text-xs md:text-sm text-gray-300">Pune, India</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ContactPage;