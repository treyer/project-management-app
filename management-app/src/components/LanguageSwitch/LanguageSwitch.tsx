import React from 'react';
import ButtonGroup from '@mui/material/ButtonGroup';
import LanguageButton from '../LanguageButton/LanguageButton';

function LanguageSwitch() {
  return (
    <ButtonGroup variant="contained">
      <LanguageButton text="EN" isActive />
      <LanguageButton text="RU" isActive={false} />
    </ButtonGroup>
  );
}

export default LanguageSwitch;
