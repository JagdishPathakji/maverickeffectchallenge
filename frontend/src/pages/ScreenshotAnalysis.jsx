import React, { useState, useContext } from 'react';
import Navbar from '../components/Navbar';
import AnalysisResult from '../components/AnalysisResult';
import api from '../services/api';
import { LanguageContext } from '../context/LanguageContext';
import { FileSearch, Loader2, UploadCloud, Image as ImageIcon } from 'lucide-react';

const ScreenshotAnalysis = () => {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');
  const { language } = useContext(LanguageContext);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result);
      reader.readAsDataURL(selectedFile);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return;
    
    setLoading(true);
    setError('');
    setResult(null);
    
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('language', language);
      
      const res = await api.post('/analysis/screenshot', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      setResult(res.data);
    } catch (err) {
      setError(err.response?.data?.detail || 'An error occurred while analyzing the screenshot.');
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
            <FileSearch className="h-8 w-8 text-primary-600 dark:text-primary-400" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Screenshot Scanner</h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Upload a screenshot of a suspicious message, app, or email. We will extract the text and analyze it.
          </p>
        </div>

        <div className="card p-6 mb-8">
          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Upload Image
              </label>
              
              {!preview ? (
                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 dark:border-gray-700 border-dashed rounded-lg hover:border-primary-500 dark:hover:border-primary-500 transition-colors bg-gray-50 dark:bg-gray-800">
                  <div className="space-y-1 text-center">
                    <UploadCloud className="mx-auto h-12 w-12 text-gray-400" />
                    <div className="flex text-sm text-gray-600 dark:text-gray-400 justify-center">
                      <label htmlFor="file-upload" className="relative cursor-pointer bg-white dark:bg-gray-700 rounded-md font-medium text-primary-600 hover:text-primary-500 focus-within:outline-none px-2 py-1">
                        <span>Upload a file</span>
                        <input id="file-upload" name="file-upload" type="file" className="sr-only" accept="image/*" onChange={handleFileChange} />
                      </label>
                      <p className="pl-1 pt-1">or drag and drop</p>
                    </div>
                    <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                  </div>
                </div>
              ) : (
                <div className="relative rounded-lg overflow-hidden border border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-800 p-2 text-center">
                  <img src={preview} alt="Preview" className="mx-auto max-h-64 object-contain" />
                  <button type="button" onClick={() => {setFile(null); setPreview(null);}} className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600">
                    ✕
                  </button>
                </div>
              )}
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
              <div className="text-sm text-gray-500 dark:text-gray-400">
                Analysis will be explained in: <span className="font-semibold text-gray-700 dark:text-gray-300">{language}</span>
              </div>
              <button type="submit" disabled={loading || !file} className="w-full sm:w-auto btn-primary flex items-center justify-center disabled:opacity-50">
                {loading ? <><Loader2 className="animate-spin -ml-1 mr-2 h-5 w-5" /> Analyzing Image...</> : 'Scan Image'}
              </button>
            </div>
          </form>
          {error && <div className="mt-4 p-4 bg-danger-50 text-danger-700 rounded-lg text-sm border border-danger-200">{error}</div>}
        </div>

        <AnalysisResult result={result} />
      </div>
    </div>
  );
};

export default ScreenshotAnalysis;
