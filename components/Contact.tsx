import React, { useState } from 'react';
import { Send, Linkedin, Twitter, Mail, Check, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Reveal } from './ui/Reveal';
import { db } from '../lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

const Contact: React.FC = () => {
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success'>('idle');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormStatus('submitting');
    
    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get('name'),
      email: formData.get('email'),
      message: formData.get('message'),
      createdAt: serverTimestamp(),
      status: 'new'
    };

    try {
      await addDoc(collection(db, 'contacts'), data);
      setFormStatus('success');
    } catch (error) {
      console.error("Error sending message:", error);
      alert("Failed to send message. Please try again.");
      setFormStatus('idle');
    }
  };

  const SocialLinks = () => (
    <div className="flex gap-3">
      <a href="#" className="p-2.5 bg-[#111] border border-white/10 rounded-full hover:bg-brand-orange hover:text-white hover:border-brand-orange transition-all text-brand-text group" aria-label="LinkedIn">
        <Linkedin size={18} className="group-hover:scale-110 transition-transform" />
      </a>
      <a href="#" className="p-2.5 bg-[#111] border border-white/10 rounded-full hover:bg-brand-orange hover:text-white hover:border-brand-orange transition-all text-brand-text group" aria-label="Twitter">
        <Twitter size={18} className="group-hover:scale-110 transition-transform" />
      </a>
      <a href="mailto:hello@example.com" className="p-2.5 bg-[#111] border border-white/10 rounded-full hover:bg-brand-orange hover:text-white hover:border-brand-orange transition-all text-brand-text group" aria-label="Email">
        <Mail size={18} className="group-hover:scale-110 transition-transform" />
      </a>
    </div>
  );

  return (
    <section id="contact" className="py-24 px-6 max-w-4xl mx-auto" aria-labelledby="contact-heading">
      <Reveal width="100%">
        <div className="text-center mb-16">
          <h2 id="contact-heading" className="text-3xl md:text-4xl font-bold mb-4">Get in Touch</h2>
          <p className="text-brand-text font-light">
            Ready to automate your workflow? Send me a message.
          </p>
        </div>
      </Reveal>

      <Reveal width="100%" delay={0.2}>
        <div className="bg-[#0A0A0A] border border-white/5 rounded-2xl p-8 md:p-12 relative overflow-hidden shadow-2xl min-h-[500px] flex flex-col justify-center">
          {/* Background Glow */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-brand-orange/5 blur-[80px] rounded-full pointer-events-none" aria-hidden="true"></div>

          <AnimatePresence mode="wait">
            {formStatus === 'success' ? (
              <motion.div 
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="flex flex-col items-center justify-center text-center h-full z-10"
              >
                <div className="w-20 h-20 bg-brand-orange/10 rounded-full flex items-center justify-center mb-6 border border-brand-orange/20">
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.2, type: "spring", stiffness: 200, damping: 10 }}
                  >
                    <Check size={40} className="text-brand-orange" />
                  </motion.div>
                </div>
                
                <h3 className="text-2xl font-bold text-white mb-2">Message Sent!</h3>
                <p className="text-brand-text max-w-md mb-10 leading-relaxed">
                  Thank you for reaching out. I've received your message and will get back to you within 24 hours.
                </p>

                <div className="flex flex-col items-center gap-4">
                  <span className="text-[10px] font-bold tracking-widest text-brand-text/40 uppercase">Stay Connected</span>
                  <SocialLinks />
                </div>

                <button 
                  onClick={() => setFormStatus('idle')}
                  className="mt-12 text-xs text-brand-text/60 hover:text-brand-orange transition-colors border-b border-transparent hover:border-brand-orange pb-0.5"
                >
                  Send another message
                </button>
              </motion.div>
            ) : (
              <motion.form 
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="relative z-10 space-y-6" 
                onSubmit={handleSubmit}
              >
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-xs font-bold tracking-widest text-brand-text uppercase">Name</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      className="w-full bg-[#111] border border-white/10 rounded-sm px-4 py-3 text-white placeholder-brand-text/30 focus:outline-none focus:border-brand-orange focus:ring-1 focus:ring-brand-orange transition-all"
                      placeholder="Enter your name"
                      required
                      disabled={formStatus === 'submitting'}
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-xs font-bold tracking-widest text-brand-text uppercase">Email</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      className="w-full bg-[#111] border border-white/10 rounded-sm px-4 py-3 text-white placeholder-brand-text/30 focus:outline-none focus:border-brand-orange focus:ring-1 focus:ring-brand-orange transition-all"
                      placeholder="Enter your email"
                      required
                      disabled={formStatus === 'submitting'}
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="message" className="text-xs font-bold tracking-widest text-brand-text uppercase">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    className="w-full bg-[#111] border border-white/10 rounded-sm px-4 py-3 text-white placeholder-brand-text/30 focus:outline-none focus:border-brand-orange focus:ring-1 focus:ring-brand-orange transition-all resize-y min-h-[120px]"
                    placeholder="How can I help you?"
                    required
                    disabled={formStatus === 'submitting'}
                  ></textarea>
                </div>

                <div className="pt-4 flex flex-col md:flex-row items-center gap-8 justify-between">
                  <button
                    type="submit"
                    disabled={formStatus === 'submitting'}
                    className="flex items-center justify-center gap-2 bg-white text-black px-8 py-3.5 rounded-sm font-bold text-xs uppercase tracking-widest hover:bg-gray-200 transition-colors w-full md:w-auto shadow-lg shadow-white/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {formStatus === 'submitting' ? (
                      <Loader2 size={14} className="animate-spin" />
                    ) : (
                      <Send size={14} className="mb-0.5" aria-hidden="true" />
                    )}
                    <span>{formStatus === 'submitting' ? 'Sending...' : 'Send Message'}</span>
                  </button>

                  <div className="flex items-center gap-4 w-full md:w-auto justify-center md:justify-end">
                      <span className="text-[10px] font-bold tracking-widest text-brand-text/40 uppercase hidden md:block">Or connect via</span>
                      <SocialLinks />
                   </div>
                </div>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </Reveal>
    </section>
  );
};

export default Contact;