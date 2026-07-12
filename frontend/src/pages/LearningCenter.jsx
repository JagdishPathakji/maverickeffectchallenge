import React from 'react';
import Navbar from '../components/Navbar';
import { BookOpen, ShieldAlert, Smartphone, CreditCard, Banknote, HelpCircle } from 'lucide-react';

const SCAMS = [
  {
    title: "OTP Scams",
    icon: Smartphone,
    color: "text-blue-500",
    bg: "bg-blue-100 dark:bg-blue-900/30",
    description: "Fraudsters call pretending to be from your bank, telecom company, or KYC department. They ask you to share a One Time Password (OTP) sent to your phone to verify your identity.",
    warning: "Banks never ask for OTPs over calls. If you share it, fraudsters can transfer money from your account.",
    prevention: "Never share any OTP or PIN with anyone over a call, message, or email."
  },
  {
    title: "Phishing Links",
    icon: ShieldAlert,
    color: "text-red-500",
    bg: "bg-red-100 dark:bg-red-900/30",
    description: "You receive an SMS saying 'Your account is blocked, click here to update PAN card' with a link that looks exactly like your bank's website.",
    warning: "These fake websites steal your login ID and password when you enter them.",
    prevention: "Never click on links from unknown SMS. Always open your bank's official app or type the URL yourself."
  },
  {
    title: "UPI Collect Request",
    icon: CreditCard,
    color: "text-purple-500",
    bg: "bg-purple-100 dark:bg-purple-900/30",
    description: "A buyer on OLX/Marketplace says they are sending money and asks you to open your UPI app and enter your PIN to 'receive' the money.",
    warning: "You ONLY enter a UPI PIN to SEND money, NEVER to receive money.",
    prevention: "If an app asks for your UPI PIN, it means money will be deducted from your account. Cancel the request."
  },
  {
    title: "Fake Loan Offers",
    icon: Banknote,
    color: "text-green-500",
    bg: "bg-green-100 dark:bg-green-900/30",
    description: "You get a WhatsApp message offering a huge loan without documents, asking for a small 'processing fee' upfront.",
    warning: "Once you pay the fee, they block your number. Genuine banks deduct fees from the loan amount.",
    prevention: "Never pay upfront fees for a loan. Only apply through official bank branches or apps."
  }
];

const LearningCenter = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      <Navbar />
      
      {/* Header */}
      <div className="bg-primary-600 dark:bg-primary-900 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <BookOpen className="h-12 w-12 text-white mx-auto mb-4" />
          <h1 className="text-3xl font-extrabold text-white sm:text-4xl">Scam Learning Center</h1>
          <p className="mt-4 text-xl text-primary-100 max-w-2xl mx-auto">
            Knowledge is your best defense. Learn about the most common financial frauds targeting people today.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {SCAMS.map((scam, idx) => (
            <div key={idx} className="card p-6 border-t-4 hover:shadow-md transition-shadow" style={{borderTopColor: 'currentColor', color: scam.color}}>
              <div className="flex items-center space-x-3 mb-4">
                <div className={`p-3 rounded-lg ${scam.bg}`}>
                  <scam.icon className={`h-6 w-6 ${scam.color}`} />
                </div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">{scam.title}</h2>
              </div>
              
              <div className="space-y-4 text-gray-600 dark:text-gray-300">
                <p><strong>How it works:</strong> {scam.description}</p>
                <div className="p-4 bg-red-50 dark:bg-red-900/10 rounded-lg border border-red-100 dark:border-red-800">
                  <p className="text-red-700 dark:text-red-400 font-medium flex items-start">
                    <ShieldAlert className="h-5 w-5 mr-2 flex-shrink-0" />
                    {scam.warning}
                  </p>
                </div>
                <p><strong>How to stay safe:</strong> {scam.prevention}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 bg-white dark:bg-gray-800 rounded-2xl p-8 text-center border border-gray-200 dark:border-gray-700">
          <HelpCircle className="h-12 w-12 mx-auto text-primary-500 mb-4" />
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Still Unsure?</h3>
          <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-xl mx-auto">
            If you ever receive a suspicious message or call, use our analysis tools to check before taking any action. Never trust unknown links or callers blindly.
          </p>
        </div>
      </div>
    </div>
  );
};

export default LearningCenter;
