import React, { useState, useContext } from 'react';
import Navbar from '../components/Navbar';
import AnalysisResult from '../components/AnalysisResult';
import api from '../services/api';
import { LanguageContext } from '../context/LanguageContext';
import { Globe, Loader2 } from 'lucide-react';

const SAMPLE_URLS = [
  "http://www.onlinesbi-update-kyc.com/login",
  "https://hdfc-rewards-claim.xyz",
  "https://www.google.com"
];

const UrlAnalysis = () => {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');
  const { language } = useContext(LanguageContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!url.trim()) return;
    
    setLoading(true);
    setError('');
    setResult(null);
    
    try {
      const formData = new URLSearchParams();
      formData.append('url', url);
      formData.append('language', language);
      
      const res = await api.post('/analysis/url', formData, {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
      });
      setResult(res.data);
    } catch (err) {
      setError('An error occurred while analyzing the URL. Please try again.');
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
            <Globe className="h-8 w-8 text-primary-600 dark:text-primary-400" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Check Suspicious URL</h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Paste any link you received to verify if it's a genuine website or a phishing trap.
          </p>
        </div>

        <div className="card p-6 mb-8">
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="url" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Website Link (URL)
              </label>
              <input
                type="url"
                id="url"
                className="input-field"
                placeholder="https://..."
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                required
              />
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
              <div className="text-sm text-gray-500 dark:text-gray-400">
                Analysis will be explained in: <span className="font-semibold text-gray-700 dark:text-gray-300">{language}</span>
              </div>
              <button type="submit" disabled={loading || !url.trim()} className="w-full sm:w-auto btn-primary flex items-center justify-center disabled:opacity-50">
                {loading ? <><Loader2 className="animate-spin -ml-1 mr-2 h-5 w-5" /> Analyzing...</> : 'Check URL'}
              </button>
            </div>
          </form>
          {error && <div className="mt-4 p-4 bg-danger-50 text-danger-700 rounded-lg text-sm border border-danger-200">{error}</div>}
        </div>

        {!result && !loading && (
          <div className="mt-8 animate-fade-in">
            <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-4">Try a Sample</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {SAMPLE_URLS.map((sample, idx) => (
                <button key={idx} onClick={() => setUrl(sample)} className="text-left p-4 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-primary-500 hover:bg-primary-50 dark:hover:bg-primary-900/10 transition-colors text-sm text-gray-600 dark:text-gray-300 truncate">
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

export default UrlAnalysis;
