import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-brand-dark text-white font-sans selection:bg-brand-orange selection:text-white flex flex-col">
      <Navbar />
      <main className="flex-grow pt-32 pb-20 px-6 max-w-4xl mx-auto w-full">
        <h1 className="text-4xl font-bold mb-8 text-brand-orange">Privacy Policy</h1>
        <div className="prose prose-invert max-w-none text-brand-text space-y-4">
          <p className="text-sm text-gray-500">Last updated: December 27, 2025</p>
          
          <div className="space-y-8 mt-8">
            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">1. Introduction</h2>
              <p>Lahiru Kavishka ("we," "our," or "us") respects your privacy. This policy explains how we handle your personal information when you use our Voice AI demonstration services or book appointments through our website.</p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">2. Information We Collect</h2>
              <p className="mb-4">We collect the following information only when you voluntarily provide it:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong className="text-white">Personal Details:</strong> Name, Email Address, and Phone Number.</li>
                <li><strong className="text-white">Usage Data:</strong> Interaction logs with our AI voice agents for quality assurance and demonstration purposes.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">3. How We Use Your Information</h2>
              <p className="mb-4">We use your mobile phone number for one specific purpose:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>To send a single automated text message containing your appointment details or a link to the requested AI demo.</li>
              </ul>
              <p className="mt-4 italic text-gray-400">Note: We do not send promotional marketing or "spam" messages.</p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">4. Data Sharing & Security (Strict)</h2>
              <p className="mb-4">We do not sell, rent, or trade your personal information.</p>
              <div className="bg-brand-orange/10 border border-brand-orange/20 p-4 rounded-lg space-y-4">
                <p className="font-medium text-white">No Mobile Information Sharing: Your phone number and SMS consent will never be shared with third parties or affiliates for marketing or promotional purposes.</p>
                <p className="font-medium text-white">Service Providers: We share data only with trusted providers (e.g., Twilio) strictly necessary to deliver the message you requested.</p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">5. Your Choices</h2>
              <p>You may opt out of communications at any time by replying <span className="font-bold text-brand-orange">STOP</span> to any message we send.</p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PrivacyPolicy;
