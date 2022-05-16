import React from 'react';
import { Box, Typography } from '@mui/material';

import { TaskCardProps } from './TaskCard.types';

// TODO: use TColumn instead of BoardColumnProps?
export function TaskCard({ taskInfo }: TaskCardProps) {
  const { title } = taskInfo;
  return (
    <Box
      sx={{
        borderRadius: 2,
        bgcolor: '#fff',
        margin: 2,
        boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px',
      }}
    >
      <Typography variant="subtitle1">{title}</Typography>
    </Box>
  );
}
