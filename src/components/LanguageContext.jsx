import React, { createContext, useContext, useState, useEffect } from 'react';

const LanguageContext = createContext();

export const useLanguage = () => useContext(LanguageContext);

const detectDefaultLanguage = () => {
  // Check timezone - Romania is in Europe/Bucharest
  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  if (timezone === 'Europe/Bucharest') {
    return 'ro';
  }
  
  // Check browser locale
  const locale = navigator.language || navigator.userLanguage;
  if (locale.startsWith('ro')) {
    return 'ro';
  }
  
  return 'en';
};

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(() => detectDefaultLanguage());

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'en' ? 'ro' : 'en');
  };

  const t = (en, ro) => language === 'en' ? en : ro;

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};