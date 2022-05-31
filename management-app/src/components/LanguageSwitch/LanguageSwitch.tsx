import React from 'react';
import ButtonGroup from '@mui/material/ButtonGroup';
import { useTranslation } from 'react-i18next';
import LanguageButton from '../LanguageButton/LanguageButton';

const lngs = {
  en: { nativeName: 'EN' },
  ru: { nativeName: 'РУ' },
};

function LanguageSwitch() {
  const { i18n } = useTranslation();

  return (
    <ButtonGroup variant="contained">
      {Object.keys(lngs).map((lng) => (
        <LanguageButton
          key={lng}
          text={lng === 'en' ? 'EN' : 'РУ'}
          isActive={i18n.resolvedLanguage === lng}
          onClick={() => i18n.changeLanguage(lng)}
        />
      ))}
    </ButtonGroup>
  );
}

export default LanguageSwitch;
