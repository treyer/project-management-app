import React from 'react';

import { Box, Button, Typography } from '@mui/material';
import styles from './CreateColumnModal.module.scss';
import { Modal } from '../../../../components/Modal';
import {
  TCreateColumnModalProps,
  TCreateColumnModalState,
} from './CreateColumnModal.types';
import { FormField } from '../../../../components/FormField';

export class CreateColumnModal extends React.PureComponent<
  TCreateColumnModalProps,
  TCreateColumnModalState
> {
  constructor(props: TCreateColumnModalProps) {
    super(props);

    this.state = {
      columnTitle: '',
    };

    this.handleOnChange = this.handleOnChange.bind(this);
    this.addNewColumn = this.addNewColumn.bind(this);
  }

  handleOnChange(value: string) {
    this.setState({ columnTitle: value });
  }

  addNewColumn() {
    const { createColumn, onRequestClose } = this.props;
    const { columnTitle } = this.state;
    if (columnTitle) {
      createColumn(columnTitle);
    }
    onRequestClose();
  }

  render() {
    const { isModalOpen, onRequestClose } = this.props;
    const { columnTitle } = this.state;

    return (
      <Modal show={isModalOpen} onRequestClose={onRequestClose}>
        <Box className={styles.content}>
          <Typography
            component="p"
            sx={{
              fontSize: '20px',
              textTransform: 'uppercase',
              color: '#808080',
              borderBottom: '1px solid',
            }}
          >
            Add Column
          </Typography>
          <FormField
            placeholder="Enter a title for this column..."
            fieldName="Column name"
            taskTitle={columnTitle}
            onChange={this.handleOnChange}
          />

          <Button onClick={this.addNewColumn}>Add column</Button>
          <Button onClick={onRequestClose}>X</Button>
        </Box>
      </Modal>
    );
  }
}
