import React from 'react';
import { Linkedin, X, Mail } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="border-t border-white/5 py-12 px-6 bg-[#020202]">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex items-center gap-2">
          <span className="font-bold text-sm tracking-wide">Lahiru Kavishka</span>
        </div>

        <div className="flex gap-6">
          <a href="https://www.linkedin.com/in/lahiru-jayasooriya/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="text-brand-text hover:text-white transition-colors transform hover:-translate-y-1 duration-200">
            <Linkedin size={20} />
          </a>
          <a href="https://x.com/Lamba_YT" target="_blank" rel="noopener noreferrer" aria-label="X" className="text-brand-text hover:text-white transition-colors transform hover:-translate-y-1 duration-200">
            <X size={20} />
          </a>
          <a href="https://www.tiktok.com/@ai.automation.dev" target="_blank" rel="noopener noreferrer" aria-label="TikTok" className="text-brand-text hover:text-white transition-colors transform hover:-translate-y-1 duration-200">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
            </svg>
          </a>
          <a href="mailto:jlkavishka@gmail.com" aria-label="Email" className="text-brand-text hover:text-white transition-colors transform hover:-translate-y-1 duration-200">
            <Mail size={20} />
          </a>
        </div>

        <div className="text-xs text-brand-text/50 flex flex-col md:flex-row gap-4 items-center">
          <span>© 2024 Lahiru Kavishka.</span>
          <div className="flex gap-4">
            <a href="/privacy-policy" className="hover:text-brand-orange transition-colors">Privacy Policy</a>
            <a href="/terms-conditions" className="hover:text-brand-orange transition-colors">Terms & Conditions</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;