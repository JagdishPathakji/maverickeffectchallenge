import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import api from '../services/api';
import { Trash2, ShieldCheck, AlertTriangle, ShieldAlert, Loader2 } from 'lucide-react';

const HistoryPage = () => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
      setLoading(true);
      const res = await api.get('/users/history');
      setHistory(res.data);
    } catch (err) {
      setError('Failed to load history');
    } finally {
      setLoading(false);
    }
  };

  const deleteHistory = async (id) => {
    try {
      await api.delete(`/users/history/${id}`);
      setHistory(history.filter(item => item.id !== id));
    } catch (err) {
      alert("Failed to delete record");
    }
  };

  const getRiskIcon = (level) => {
    switch(level.toLowerCase()) {
      case 'safe': return <ShieldCheck className="text-green-500 w-5 h-5" />;
      case 'suspicious': return <AlertTriangle className="text-yellow-500 w-5 h-5" />;
      default: return <ShieldAlert className="text-red-500 w-5 h-5" />;
    }
  };

  const getRiskColor = (level) => {
    switch(level.toLowerCase()) {
      case 'safe': return 'text-green-700 bg-green-50 border-green-200';
      case 'suspicious': return 'text-yellow-700 bg-yellow-50 border-yellow-200';
      default: return 'text-red-700 bg-red-50 border-red-200';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">Analysis History</h1>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <Loader2 className="animate-spin h-8 w-8 text-primary-500" />
          </div>
        ) : error ? (
          <div className="p-4 bg-danger-50 text-danger-700 rounded-lg">{error}</div>
        ) : history.length === 0 ? (
          <div className="text-center py-12 card text-gray-500 dark:text-gray-400">
            No history found. Try analyzing a message or URL first!
          </div>
        ) : (
          <div className="space-y-4">
            {history.map((item) => (
              <div key={item.id} className="card p-4 sm:p-6 flex flex-col sm:flex-row gap-4 relative animate-fade-in">
                <button 
                  onClick={() => deleteHistory(item.id)}
                  className="absolute top-4 right-4 text-gray-400 hover:text-red-500 transition-colors"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
                
                <div className="flex flex-col sm:w-1/4">
                  <div className="flex items-center space-x-2 mb-2">
                    {getRiskIcon(item.risk_level)}
                    <span className="font-semibold text-gray-900 dark:text-white capitalize">{item.input_type}</span>
                  </div>
                  <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium border w-fit ${getRiskColor(item.risk_level)}`}>
                    {item.risk_level}
                  </span>
                  <p className="text-xs text-gray-500 mt-2">
                    {new Date(item.created_at).toLocaleString()}
                  </p>
                </div>

                <div className="flex-1">
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-2 italic line-clamp-2">
                    "{item.original_input}"
                  </p>
                  <h4 className="font-medium text-gray-900 dark:text-gray-200">{item.summary}</h4>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default HistoryPage;
