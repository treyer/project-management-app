/* eslint-disable max-len */
import React from 'react';
import { Alert, Card } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { experimentalStyled as styled } from '@mui/material/styles';
import { useTranslation } from 'react-i18next';
import { TSearchResult } from '../types';
import { useAppSelector } from '../../store';
// eslint-disable-next-line max-len
import SearchResultBoard from '../SearchResultBoard/SearchResultBoard';
import SearchResultColumn from '../SearchResultColumn/SearchResultColumn';
import SearchResultTask from '../SearchResultTask/SearchResultTask';

type TProps = {
  display: boolean;
  close: () => void;
  searchString: string;
  isSearchStringMatch: boolean;
  searchResult: TSearchResult;
};

const StyledCloseIcon = styled(CloseIcon)({
  position: 'absolute',
  top: '0',
  right: '0',
  color: '#000000',
  backgroundColor: '#cccccc',
  cursor: 'pointer',
  '&:hover': {
    opacity: '0.8',
  },
});

function SearchModal({
  display,
  close,
  searchString,
  searchResult,
  isSearchStringMatch,
}: TProps) {
  const { isLoggedIn } = useAppSelector((state) => state.auth);
  const { t } = useTranslation();

  return (
    <Card
      sx={{
        position: 'absolute',
        top: `${display ? '55px' : '-500px'}`,
        backgroundColor: '#ffffff',
        padding: '5px 14px 0 5px',
        minWidth: '300px',
        zIndex: '100',
        transition: 'top 1s ease-in-out',
      }}
    >
      <StyledCloseIcon onClick={close} sx={{ fontSize: 15 }} />
      {!isLoggedIn && (
        <Alert severity="warning">{t('search.onlyAuthWarn')}</Alert>
      )}
      {isLoggedIn && !isSearchStringMatch && (
        <Alert severity="warning">{t('search.minLengthWarn')}</Alert>
      )}
      {isLoggedIn &&
        isSearchStringMatch &&
        searchResult.boardsMatch.length === 0 &&
        searchResult.columnsMatch.length === 0 &&
        searchResult.tasksMatch.length === 0 && (
          <Alert severity="warning">{t('search.nothingFound')}</Alert>
        )}
      {isLoggedIn &&
        isSearchStringMatch &&
        (searchResult.boardsMatch.length > 0 ||
          searchResult.columnsMatch.length > 0 ||
          searchResult.tasksMatch.length > 0) && (
          <Alert severity="success">
            {t('search.word')} {`"${searchString}"`} {t('search.contained')}
          </Alert>
        )}
      {isLoggedIn &&
        isSearchStringMatch &&
        searchResult.boardsMatch.length > 0 && (
          <>
            {searchResult.boardsMatch.map((board) => (
              <SearchResultBoard key={`${board.boardId}brd`} board={board} />
            ))}
          </>
        )}
      {isLoggedIn &&
        isSearchStringMatch &&
        searchResult.columnsMatch.length > 0 && (
          <>
            {searchResult.columnsMatch.map((board, index) => (
              <SearchResultColumn
                key={`${board.boardId + index}`}
                board={board}
              />
            ))}
          </>
        )}

      {isLoggedIn && searchResult.tasksMatch.length > 0 && isSearchStringMatch && (
        <>
          {searchResult.tasksMatch.map((board, index) => (
            <SearchResultTask key={`${board.boardId + index}`} task={board} />
          ))}
        </>
      )}
    </Card>
  );
}

export default SearchModal;
