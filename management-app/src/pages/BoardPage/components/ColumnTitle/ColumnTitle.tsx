import { ChangeEvent, useState, KeyboardEvent } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Box,
  ClickAwayListener,
  Divider,
  IconButton,
  TextField,
  Tooltip,
  Typography,
} from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';

import { TColumnTitleProps } from './ColumnTitle.types';

export function ColumnTitle({ title, handleClickAway }: TColumnTitleProps) {
  const [titleInput, setTitleInput] = useState(title);
  const [isTitleEditMode, setIsTitleEditMode] = useState(false);

  const { t } = useTranslation();

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTitleInput(e.target.value);
  };

  const toggleTitleEditMode = () => {
    if (!isTitleEditMode) {
      setIsTitleEditMode(true);
    } else {
      setIsTitleEditMode(false);
    }
  };

  const onClickAway = () => {
    if (isTitleEditMode && titleInput !== '') {
      handleClickAway(titleInput);
      setIsTitleEditMode(false);
    }
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.nativeEvent.key === 'Enter' && titleInput !== '') {
      handleClickAway(titleInput);
      setIsTitleEditMode(false);
    }
  };

  return (
    <Box>
      <ClickAwayListener onClickAway={onClickAway}>
        <Typography variant="h6">
          {!isTitleEditMode ? (
            <Box
              onClick={toggleTitleEditMode}
              sx={{ cursor: 'pointer', paddingTop: '10px' }}
            >
              {title}
            </Box>
          ) : (
            <>
              <TextField
                fullWidth
                name="column title"
                error={titleInput === ''}
                id="outlined-error"
                label={t('boardPage.columnTitleLabel')}
                value={titleInput}
                color="primary"
                onChange={handleOnChange}
                sx={{
                  position: 'relative',
                  background: isTitleEditMode ? '#c2deee' : '',
                }}
                onKeyPress={handleKeyDown}
                autoFocus
              />
              <Tooltip title={t('boardPage.submit')}>
                <IconButton
                  onClick={onClickAway}
                  type="submit"
                  sx={{
                    p: '0',
                    position: 'absolute',
                    top: '13px',
                    right: '80px',
                  }}
                  aria-label="search"
                >
                  <CheckIcon sx={{ color: '#35b989' }} />
                </IconButton>
              </Tooltip>
              <Divider
                sx={{
                  height: 50,
                  m: 0.5,
                  position: 'absolute',
                  top: '0px',
                  right: '60px',
                }}
                orientation="vertical"
              />
              <Tooltip title={t('boardPage.cancel')}>
                <IconButton
                  color="primary"
                  sx={{
                    position: 'absolute',
                    top: '4px',
                    right: '20px',
                    color: '#cc5b5b',
                  }}
                  aria-label="directions"
                  onClick={toggleTitleEditMode}
                >
                  <HighlightOffIcon />
                </IconButton>
              </Tooltip>
            </>
          )}
        </Typography>
      </ClickAwayListener>
    </Box>
  );
}
