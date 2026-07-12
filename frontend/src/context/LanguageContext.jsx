import React, { createContext, useState, useEffect } from 'react';

export const LanguageContext = createContext();

export const LANGUAGES = [
  { name: 'English', code: 'en' },
  { name: 'Hindi', code: 'hi' },
  { name: 'Bengali', code: 'bn' },
  { name: 'Marathi', code: 'mr' },
  { name: 'Telugu', code: 'te' },
  { name: 'Tamil', code: 'ta' },
  { name: 'Gujarati', code: 'gu' },
  { name: 'Odia', code: 'or' }
];

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(() => {
    return localStorage.getItem('language') || 'English';
  });

  const changeLanguage = (langName) => {
    const langObj = LANGUAGES.find(l => l.name === langName);
    if (!langObj) return;
    
    setLanguage(langName);
    localStorage.setItem('language', langName);
    
    if (langObj.code === 'en') {
      document.cookie = `googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
      document.cookie = `googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=${window.location.hostname};`;
    } else {
      document.cookie = `googtrans=/en/${langObj.code}; path=/;`;
      document.cookie = `googtrans=/en/${langObj.code}; path=/; domain=${window.location.hostname};`;
    }
    
    // Attempt to trigger Google Translate without reloading the page
    const gtCombo = document.querySelector('.goog-te-combo');
    if (gtCombo) {
      gtCombo.value = langObj.code === 'en' ? 'en' : langObj.code;
      gtCombo.dispatchEvent(new Event('change'));
      
      // If returning to English, sometimes we need to restore original explicitly or reload
      if (langObj.code === 'en') {
        const iframe = document.querySelector('iframe.goog-te-banner-frame');
        if (iframe && iframe.contentWindow) {
          try {
             const restoreBtn = iframe.contentWindow.document.querySelector('.goog-te-button button');
             if (restoreBtn) restoreBtn.click();
          } catch (e) {}
        }
      }
    } else {
      window.location.reload();
    }
  };

  return (
    <LanguageContext.Provider value={{ language, changeLanguage, LANGUAGES }}>
      {children}
    </LanguageContext.Provider>
  );
};
