import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';

const TermsConditions = () => {
  return (
    <div className="min-h-screen bg-brand-dark text-white font-sans selection:bg-brand-orange selection:text-white flex flex-col">
      <Navbar />
      <main className="flex-grow pt-32 pb-20 px-6 max-w-4xl mx-auto w-full">
        <h1 className="text-4xl font-bold mb-8 text-brand-orange">Terms & Conditions</h1>
        <div className="prose prose-invert max-w-none text-brand-text space-y-4">
          <p className="text-sm text-gray-500">Last updated: December 27, 2025</p>
          
          <div className="space-y-8 mt-8">
            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">1. Program Description</h2>
              <p>This service allows users to receive a one-time SMS notification regarding their scheduled meetings or AI voice demonstrations.</p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">2. Message Frequency</h2>
              <p><strong className="text-white">Transactional Only:</strong> You will receive approximately one (1) message per booking request. We do not maintain a subscription list for ongoing marketing.</p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">3. Cost and Fees</h2>
              <p className="font-medium text-white">Message and data rates may apply depending on your carrier plan.</p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">4. Opt-Out and Support</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-medium text-white mb-2">To Cancel:</h3>
                  <p>Reply <span className="font-bold text-brand-orange">STOP</span> to any message to block future communications.</p>
                </div>
                <div>
                  <h3 className="text-lg font-medium text-white mb-2">For Help:</h3>
                  <p>Reply <span className="font-bold text-brand-orange">HELP</span> for assistance or contact us at <a href="mailto:jlkavishka@gmail.com" className="text-brand-orange hover:underline">jlkavishka.com</a>.</p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">5. No Warranty</h2>
              <p>These AI demonstration tools are provided "as is." While we strive to ensure accuracy, we make no guarantees regarding the availability or performance of the service.</p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default TermsConditions;
