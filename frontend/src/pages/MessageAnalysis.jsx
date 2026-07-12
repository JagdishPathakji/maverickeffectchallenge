import React, { useState, useContext } from 'react';
import Navbar from '../components/Navbar';
import AnalysisResult from '../components/AnalysisResult';
import api from '../services/api';
import { LanguageContext } from '../context/LanguageContext';
import { MessageSquare, Loader2 } from 'lucide-react';

const SAMPLE_MESSAGES = [
  "Dear Customer, your bank account will be blocked today. Please update your PAN card immediately clicking here: http://fake-bank-update.com/pan",
  "Congratulations! You have won a lottery of Rs 25,00,000. Send Rs 5000 processing fee to claim your prize.",
  "Your electricity bill is pending. Power will be cut at 9:30 PM. Call this number immediately: 9876543210"
];

const MessageAnalysis = () => {
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');
  const { language } = useContext(LanguageContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message.trim()) return;
    
    setLoading(true);
    setError('');
    setResult(null);
    
    try {
      const formData = new URLSearchParams();
      formData.append('message', message);
      formData.append('language', language);
      
      const res = await api.post('/analysis/message', formData, {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
      });
      setResult(res.data);
    } catch (err) {
      setError('An error occurred while analyzing the message. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      <Navbar />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center p-3 bg-primary-100 dark:bg-primary-900/30 rounded-full mb-4">
            <MessageSquare className="h-8 w-8 text-primary-600 dark:text-primary-400" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Scan a Message</h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Paste any suspicious SMS, WhatsApp, or Telegram message below to check if it's safe.
          </p>
        </div>

        <div className="card p-6 mb-8">
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Message Content
              </label>
              <textarea
                id="message"
                rows="5"
                className="input-field resize-y"
                placeholder="Paste the suspicious message here..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
              ></textarea>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
              <div className="text-sm text-gray-500 dark:text-gray-400">
                Analysis will be explained in: <span className="font-semibold text-gray-700 dark:text-gray-300">{language}</span>
              </div>
              <button 
                type="submit" 
                disabled={loading || !message.trim()}
                className="w-full sm:w-auto btn-primary flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <Loader2 className="animate-spin -ml-1 mr-2 h-5 w-5" />
                    Analyzing...
                  </>
                ) : 'Analyze Message'}
              </button>
            </div>
          </form>

          {error && (
            <div className="mt-4 p-4 bg-danger-50 text-danger-700 rounded-lg text-sm border border-danger-200">
              {error}
            </div>
          )}
        </div>

        {/* Demo Section */}
        {!result && !loading && (
          <div className="mt-8 animate-fade-in">
            <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-4">
              Try a Sample Input
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {SAMPLE_MESSAGES.map((sample, idx) => (
                <button
                  key={idx}
                  onClick={() => setMessage(sample)}
                  className="text-left p-4 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-primary-500 hover:bg-primary-50 dark:hover:bg-primary-900/10 transition-colors text-sm text-gray-600 dark:text-gray-300"
                >
                  <span className="line-clamp-3">{sample}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Results Component */}
        <AnalysisResult result={result} />
        
      </div>
    </div>
  );
};

export default MessageAnalysis;
