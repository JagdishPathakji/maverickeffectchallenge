import React, { useState, useContext } from 'react';
import Navbar from '../components/Navbar';
import AnalysisResult from '../components/AnalysisResult';
import api from '../services/api';
import { LanguageContext } from '../context/LanguageContext';
import { ShieldAlert, Loader2 } from 'lucide-react';

const SAMPLE_UPI = [
  "You have received a Collect Request of Rs 50,000 from Unknown User. Enter PIN to proceed.",
  "Scan this QR code and enter your UPI PIN to receive your cashback of Rs 1999.",
  "Payment of Rs 500 successful to Amazon."
];

const UpiAnalysis = () => {
  const [upiText, setUpiText] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');
  const { language } = useContext(LanguageContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!upiText.trim()) return;
    
    setLoading(true);
    setError('');
    setResult(null);
    
    try {
      const formData = new URLSearchParams();
      formData.append('upi_text', upiText);
      formData.append('language', language);
      
      const res = await api.post('/analysis/upi', formData, {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
      });
      setResult(res.data);
    } catch (err) {
      setError('An error occurred while analyzing the UPI request. Please try again.');
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
            <ShieldAlert className="h-8 w-8 text-primary-600 dark:text-primary-400" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Verify UPI Request</h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Paste the text of a UPI collect request or payment message to see if someone is trying to trick you into sending money.
          </p>
        </div>

        <div className="card p-6 mb-8">
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="upi" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                UPI Request Details
              </label>
              <textarea
                id="upi"
                rows="4"
                className="input-field resize-y"
                placeholder="Paste the UPI message here..."
                value={upiText}
                onChange={(e) => setUpiText(e.target.value)}
                required
              ></textarea>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
              <div className="text-sm text-gray-500 dark:text-gray-400">
                Analysis will be explained in: <span className="font-semibold text-gray-700 dark:text-gray-300">{language}</span>
              </div>
              <button type="submit" disabled={loading || !upiText.trim()} className="w-full sm:w-auto btn-primary flex items-center justify-center disabled:opacity-50">
                {loading ? <><Loader2 className="animate-spin -ml-1 mr-2 h-5 w-5" /> Analyzing...</> : 'Verify Request'}
              </button>
            </div>
          </form>
          {error && <div className="mt-4 p-4 bg-danger-50 text-danger-700 rounded-lg text-sm border border-danger-200">{error}</div>}
        </div>

        {!result && !loading && (
          <div className="mt-8 animate-fade-in">
            <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-4">Try a Sample</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {SAMPLE_UPI.map((sample, idx) => (
                <button key={idx} onClick={() => setUpiText(sample)} className="text-left p-4 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-primary-500 hover:bg-primary-50 dark:hover:bg-primary-900/10 transition-colors text-sm text-gray-600 dark:text-gray-300 truncate">
                  {sample}
                </button>
              ))}
            </div>
          </div>
        )}
        <AnalysisResult result={result} />
      </div>
    </div>
  );
};

export default UpiAnalysis;
