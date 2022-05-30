import React, { useEffect, useState } from 'react';
import { experimentalStyled as styled, useTheme } from '@mui/material/styles';
import { useTranslation } from 'react-i18next';
import SearchModal from '../../search/SearchModal/SearchModal';
import { useAppDispatch, useAppSelector } from '../../store';
import { getBoards } from '../../pages/MainPage/slice/mainSlice';
import { searchByString } from '../../search/utils';
import { TSearchResult } from '../../search/types';

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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchString, setSearchString] = useState('');
  const [searchResult, setSearchResult] = useState<TSearchResult>({
    boardsMatch: [],
    columnsMatch: [],
    tasksMatch: [],
  });
  const [isSearchStringMatch, setIsSearchStringMatch] = useState(false);
  const { t } = useTranslation();
  const theme = useTheme();
  const dispatch = useAppDispatch();
  const { isLoggedIn } = useAppSelector((state) => state.auth);
  const boards = useAppSelector((state) => state.main.boards);

  const imageSrcArr: string[] = [
    '/assets/svg/icon-search-white.svg',
    '/assets/svg/icon-search-black.svg',
  ];

  useEffect(() => {
    if (isLoggedIn) {
      dispatch(getBoards());
    }
  }, [dispatch, isLoggedIn]);

  useEffect(() => {
    imageSrcArr.forEach((imgSrc) => {
      const img = new Image();
      img.src = imgSrc;
    });
  });

  const handleOnFocus = () => {
    setInputFocus(true);
    setIsModalOpen(true);
  };

  const handleOnBlur = () => {
    setInputFocus(false);
    // setIsModalOpen(false);
  };

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchString(event.target.value);
    if (event.target.value.length > 2) {
      setIsSearchStringMatch(true);
    } else {
      setIsSearchStringMatch(false);
    }

    if (event.target) {
      if (event.target.value.length > 2 && boards.length > 0) {
        const res = searchByString(event.target.value, boards);
        setSearchResult(res);
      }
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div style={{ position: 'relative' }}>
      <label htmlFor="search-input" style={{ position: 'relative' }}>
        <Input
          id="search-input"
          type="search"
          placeholder={t('searchBar.placeHolder')}
          onFocus={handleOnFocus}
          onBlur={handleOnBlur}
          onChange={(event) => handleOnChange(event)}
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
            zIndex: 999,
          }}
          autoComplete="off"
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
      <SearchModal
        display={isModalOpen}
        close={closeModal}
        searchString={searchString}
        isSearchStringMatch={isSearchStringMatch}
        searchResult={searchResult}
      />
    </div>
  );
}

export default SearchBar;
