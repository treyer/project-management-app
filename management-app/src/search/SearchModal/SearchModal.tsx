import React from 'react';
import { Alert, Card } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { experimentalStyled as styled } from '@mui/material/styles';
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
        <Alert severity="warning">
          Поиск доступен только авторизованным пользователям
        </Alert>
      )}
      {isLoggedIn && !isSearchStringMatch && (
        <Alert severity="warning">
          Поисковый запрос должен содержать не менее 3 символов
        </Alert>
      )}
      {isLoggedIn &&
        isSearchStringMatch &&
        searchResult.boardsMatch.length === 0 &&
        searchResult.columnsMatch.length === 0 &&
        searchResult.tasksMatch.length === 0 && (
          <Alert severity="warning">Поиск не дал результатов</Alert>
        )}
      {isLoggedIn &&
        isSearchStringMatch &&
        (searchResult.boardsMatch.length > 0 ||
          searchResult.columnsMatch.length > 0 ||
          searchResult.tasksMatch.length > 0) && (
          <Alert severity="success">
            Слово {`"${searchString}"`} содержится:{' '}
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

      {isLoggedIn && isSearchStringMatch && searchResult.tasksMatch.length > 0 && (
        <>
          {searchResult.tasksMatch.map((board, index) => (
            <SearchResultTask key={`${board.boardId + index}`} board={board} />
          ))}
        </>
      )}
    </Card>
  );
}

export default SearchModal;
