import React, { createContext, useContext, useState, useEffect } from 'react';
import { languages, translations } from '../utils/translations';

const LanguageContext = createContext(null);

export const LanguageProvider = ({ children }) => {
  const [currentLang, setCurrentLang] = useState(() => {
    return localStorage.getItem('tm.lang') || 'en';
  });

  useEffect(() => {
    localStorage.setItem('tm.lang', currentLang);
  }, [currentLang]);

  const changeLanguage = (langCode) => {
    if (translations[langCode]) {
      setCurrentLang(langCode);
    }
  };

  // Translation helper function
  const t = (key, fallback = '') => {
    const langDict = translations[currentLang] || translations.en;
    if (langDict && langDict[key] !== undefined) {
      return langDict[key];
    }
    // Fallback to English if key missing in selected language
    if (translations.en && translations.en[key] !== undefined) {
      return translations.en[key];
    }
    return fallback || key;
  };

  const currentLanguageObject = languages.find((l) => l.code === currentLang) || languages[0];

  return (
    <LanguageContext.Provider
      value={{
        currentLang,
        currentLanguageObject,
        changeLanguage,
        languages,
        t,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

export default LanguageContext;
