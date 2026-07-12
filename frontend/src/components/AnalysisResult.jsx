import React from 'react';
import { ShieldCheck, AlertTriangle, ShieldAlert, CheckCircle2, XCircle, Info } from 'lucide-react';

const AnalysisResult = ({ result }) => {
  if (!result) return null;

  const isSafe = result.risk_level.toLowerCase() === 'safe';
  const isHighRisk = result.risk_level.toLowerCase() === 'high risk';

  const colorClass = isSafe 
    ? 'text-green-600 bg-green-50 border-green-200 dark:text-green-400 dark:bg-green-900/20 dark:border-green-800' 
    : isHighRisk 
      ? 'text-red-600 bg-red-50 border-red-200 dark:text-red-400 dark:bg-red-900/20 dark:border-red-800'
      : 'text-yellow-600 bg-yellow-50 border-yellow-200 dark:text-yellow-400 dark:bg-yellow-900/20 dark:border-yellow-800';

  const Icon = isSafe ? ShieldCheck : isHighRisk ? ShieldAlert : AlertTriangle;

  return (
    <div className="mt-8 space-y-6 animate-slide-up">
      {/* Top Banner */}
      <div className={`p-6 rounded-xl border ${colorClass} flex flex-col sm:flex-row items-center sm:items-start space-y-4 sm:space-y-0 sm:space-x-4`}>
        <Icon className="w-16 h-16 flex-shrink-0" />
        <div className="flex-1 text-center sm:text-left">
          <h2 className="text-2xl font-bold">{result.risk_level}</h2>
          <p className="text-lg mt-1 font-medium">{result.summary}</p>
          <div className="mt-4 flex flex-wrap justify-center sm:justify-start gap-2">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-white dark:bg-gray-800 bg-opacity-50 border border-current">
              Category: {result.scam_category}
            </span>
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-white dark:bg-gray-800 bg-opacity-50 border border-current">
              Confidence: {result.confidence_score}%
            </span>
          </div>
        </div>
      </div>

      {/* Detailed Explanation */}
      <div className="card p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center mb-3">
          <Info className="w-5 h-5 mr-2 text-primary-500" />
          Detailed Explanation
        </h3>
        <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
          {result.detailed_explanation}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Warning Signs */}
        {!isSafe && result.warning_signs && result.warning_signs.length > 0 && (
          <div className="card p-6 border-t-4 border-t-red-500">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center mb-4">
              <XCircle className="w-5 h-5 mr-2 text-red-500" />
              Warning Signs Detected
            </h3>
            <ul className="space-y-2">
              {result.warning_signs.map((sign, idx) => (
                <li key={idx} className="flex items-start">
                  <span className="flex-shrink-0 h-1.5 w-1.5 rounded-full bg-red-500 mt-2 mr-2"></span>
                  <span className="text-gray-600 dark:text-gray-400">{sign}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Recommended Actions */}
        <div className={`card p-6 border-t-4 ${isSafe ? 'border-t-green-500' : 'border-t-yellow-500 md:col-span-1'}`}>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center mb-4">
            <CheckCircle2 className={`w-5 h-5 mr-2 ${isSafe ? 'text-green-500' : 'text-yellow-500'}`} />
            Recommended Actions
          </h3>
          <ul className="space-y-2">
            {result.recommended_actions.map((action, idx) => (
              <li key={idx} className="flex items-start">
                <span className={`flex-shrink-0 h-1.5 w-1.5 rounded-full mt-2 mr-2 ${isSafe ? 'bg-green-500' : 'bg-yellow-500'}`}></span>
                <span className="text-gray-600 dark:text-gray-400">{action}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Prevention Tips */}
      {result.prevention_tips && result.prevention_tips.length > 0 && (
        <div className="card p-6 bg-primary-50 dark:bg-primary-900/10 border-primary-100 dark:border-primary-800">
          <h3 className="text-lg font-semibold text-primary-900 dark:text-primary-300 mb-4">How to stay safe in the future</h3>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {result.prevention_tips.map((tip, idx) => (
              <li key={idx} className="flex items-start bg-white dark:bg-gray-800 p-3 rounded-lg shadow-sm border border-primary-100 dark:border-gray-700">
                <ShieldCheck className="flex-shrink-0 h-5 w-5 text-primary-500 mr-2" />
                <span className="text-sm text-gray-700 dark:text-gray-300">{tip}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default AnalysisResult;
