import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { ShieldAlert, FileSearch, Globe, MessageSquare, PhoneCall, HandCoins, ArrowRight } from 'lucide-react';

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <Navbar />
      
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto">
          <div className="relative z-10 pb-8 bg-white dark:bg-gray-800 sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32 pt-10 sm:pt-16 lg:pt-20 px-4 sm:px-6 lg:px-8">
            <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 animate-fade-in">
              <div className="sm:text-center lg:text-left">
                <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white sm:text-5xl md:text-6xl">
                  <span className="block xl:inline">Don't fall for scams.</span>{' '}
                  <span className="block text-primary-600">Stay Safe with AI.</span>
                </h1>
                <p className="mt-3 text-base text-gray-500 dark:text-gray-400 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                  SurakshaAI helps you detect fake banking messages, phishing URLs, malicious loan offers, and fake UPI requests instantly. 
                  Designed specially for first-time digital banking users in India.
                </p>
                <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                  <div className="rounded-md shadow">
                    <Link to="/register" className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 md:py-4 md:text-lg transition-colors">
                      Get Started Free
                    </Link>
                  </div>
                  <div className="mt-3 sm:mt-0 sm:ml-3">
                    <Link to="/learning" className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-primary-700 bg-primary-100 hover:bg-primary-200 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600 md:py-4 md:text-lg transition-colors">
                      Learn about Scams
                    </Link>
                  </div>
                </div>
              </div>
            </main>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-base font-semibold text-primary-600 tracking-wide uppercase">Features</h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
              Complete Financial Safety
            </p>
            <p className="mt-4 max-w-2xl text-xl text-gray-500 dark:text-gray-400 mx-auto">
              Our AI analyzes different types of inputs to keep you safe from frauds.
            </p>
          </div>

          <div className="mt-16">
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {[
                { title: 'Message Analysis', icon: MessageSquare, desc: 'Analyze SMS, WhatsApp, or Telegram messages for phishing or OTP scams.' },
                { title: 'Screenshot Scanner', icon: FileSearch, desc: 'Upload screenshots of suspicious apps or texts. Our OCR extracts and analyzes it.' },
                { title: 'URL Checker', icon: Globe, desc: 'Paste any link to see if it directs to a fake banking portal or malicious site.' },
                { title: 'Fake UPI Detection', icon: ShieldAlert, desc: 'Avoid "Collect Request" and fake QR code scams with clear explanations.' },
                { title: 'Loan Fraud Checker', icon: HandCoins, desc: 'Identify fake instant loan offers and processing fee traps.' },
                { title: 'Multilingual Chat', icon: PhoneCall, desc: 'Ask our AI questions in your local language like Hindi, Marathi, Tamil, etc.' },
              ].map((feature, idx) => (
                <div key={idx} className="pt-6">
                  <div className="flow-root bg-white dark:bg-gray-800 rounded-lg px-6 pb-8 shadow-sm hover:shadow-md transition-shadow h-full border border-gray-100 dark:border-gray-700">
                    <div className="-mt-6">
                      <div>
                        <span className="inline-flex items-center justify-center p-3 bg-primary-500 rounded-md shadow-lg">
                          <feature.icon className="h-6 w-6 text-white" aria-hidden="true" />
                        </span>
                      </div>
                      <h3 className="mt-8 text-lg font-medium text-gray-900 dark:text-white tracking-tight">{feature.title}</h3>
                      <p className="mt-5 text-base text-gray-500 dark:text-gray-400">
                        {feature.desc}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      {/* Footer */}
      <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-gray-500 dark:text-gray-400">
          <p>Built with ❤️ to protect Rural India from digital frauds.</p>
          <p className="mt-2">&copy; {new Date().getFullYear()} SurakshaAI. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
