import React, { useState } from 'react';
import { experimentalStyled as styled } from '@mui/material/styles';
import { useTranslation } from 'react-i18next';
import style from './SearchBar.module.css';

const Item = styled('input')({
  color: '#ffffff',
});

const styleBlur = {
  backgroundColor: 'rgba(255, 255, 255, 0.2)',
  color: '#ffffff',
};

const styleFocus = {
  backgroundColor: '#ffffff',
  color: '#000000',
};

function SearchBar() {
  const [inputFocus, setInputFocus] = useState(false);
  const { t } = useTranslation();

  return (
    <label htmlFor="search-input" className={style.label}>
      <Item
        id="search-input"
        type="search"
        placeholder={t('searchBar.placeHolder')}
        className={style.input}
        onFocus={() => setInputFocus(true)}
        onBlur={() => setInputFocus(false)}
        style={inputFocus ? styleFocus : styleBlur}
      />
      <img
        src={
          inputFocus
            ? './assets/svg/icon-search-black.svg'
            : './assets/svg/icon-search-white.svg'
        }
        alt="Search icon"
        className={style.icon}
      />
    </label>
  );
}

export default SearchBar;
