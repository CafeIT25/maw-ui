import React from 'react';
import { useTranslation } from 'react-i18next';
import { Globe } from 'lucide-react';

const LanguageSwitcher: React.FC = () => {
  const { i18n, t } = useTranslation();

  const toggleLanguage = () => {
    const newLang = i18n.language === 'en' ? 'ja' : 'en';
    i18n.changeLanguage(newLang);
  };

  return (
    <button
      onClick={toggleLanguage}
      className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/10 hover:bg-white/20 transition-all duration-200 text-white/90 hover:text-white border border-white/20 hover:border-white/30"
      title={t('language.switch')}
    >
      <Globe size={16} />
      <span className="text-sm font-medium">
        {i18n.language === 'en' ? '日本語' : 'English'}
      </span>
    </button>
  );
};

export default LanguageSwitcher; 