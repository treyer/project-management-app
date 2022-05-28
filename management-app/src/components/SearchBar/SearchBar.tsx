import React, { useEffect, useState } from 'react';
import { experimentalStyled as styled, useTheme } from '@mui/material/styles';
import { useTranslation } from 'react-i18next';

const Input = styled('input')({
  border: '1px solid rgba(255, 255, 255, 0.25)',
  borderRadius: 3,
  boxShadow: 'none',
  height: 32,
  width: 250,
  lineHeight: 19,
  fontSize: 14,
  outline: 'none',
  padding: '12px 0 9px 40px',
});
const IconImage = styled('img')({
  position: 'absolute',
  top: 3,
  left: 10,
  width: 20,
  height: 20,
});

function SearchBar() {
  const [inputFocus, setInputFocus] = useState(false);
  const { t } = useTranslation();
  const theme = useTheme();

  const imageSrcArr: string[] = [
    '/assets/svg/icon-search-white.svg',
    '/assets/svg/icon-search-black.svg',
  ];

  useEffect(() => {
    imageSrcArr.forEach((imgSrc) => {
      const img = new Image();
      img.src = imgSrc;
    });
  });

  return (
    <label htmlFor="search-input" style={{ position: 'relative' }}>
      <Input
        id="search-input"
        type="search"
        placeholder={t('searchBar.placeHolder')}
        // className={style.input}
        onFocus={() => setInputFocus(true)}
        onBlur={() => setInputFocus(false)}
        sx={{
          backgroundColor:
            theme.palette.mode === 'light' ? 'primary.light' : '#61dafb',
          '&::placeholder': {
            color: theme.palette.mode === 'dark' ? '#000000' : '#ffffff',
          },
          '&:focus': {
            backgroundColor: '#ffffff',
            '&::placeholder': {
              color: '#000000',
            },
          },
        }}
      />
      <IconImage
        src={
          // eslint-disable-next-line no-nested-ternary
          theme.palette.mode === 'dark'
            ? '/assets/svg/icon-search-black.svg'
            : inputFocus
            ? '/assets/svg/icon-search-black.svg'
            : '/assets/svg/icon-search-white.svg'
        }
        alt="Search icon"
      />
    </label>
  );
}

export default SearchBar;
