import React from 'react';

import { Box, Button, Typography } from '@mui/material';
import styles from './CreateTaskModal.module.scss';
import { Modal } from '../../../../components/Modal';
import {
  TCreateTaskModalProps,
  TCreateTaskModalState,
} from './CreateTaskModal.types';
import { FormField } from '../../../../components/FormField';

export class CreateTaskModal extends React.PureComponent<
  TCreateTaskModalProps,
  TCreateTaskModalState
> {
  constructor(props: TCreateTaskModalProps) {
    super(props);

    this.state = {
      taskTitle: '',
      taskDescription: '',
    };

    this.handleOnChange = this.handleOnChange.bind(this);
    this.addNewTask = this.addNewTask.bind(this);
  }

  handleOnChange(value: string, fieldName: string) {
    if (fieldName === 'Task description') {
      this.setState({ taskDescription: value });
    }
    if (fieldName === 'Task name') {
      this.setState({ taskTitle: value });
    }
  }

  addNewTask() {
    const { createTask, onRequestClose } = this.props;
    const { taskTitle, taskDescription } = this.state;
    if (taskTitle) {
      createTask(taskTitle);
    }
    onRequestClose();
  }

  render() {
    const { isModalOpen, onRequestClose } = this.props;
    const { taskTitle, taskDescription } = this.state;

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
            Add task
          </Typography>
          <FormField
            placeholder="Enter a title for this task..."
            fieldName="Task name"
            taskTitle={taskTitle}
            onChange={this.handleOnChange}
          />
          <FormField
            placeholder="Description"
            fieldName="Task description"
            taskTitle={taskDescription}
            onChange={this.handleOnChange}
            isMultiline
            // TODO: make multiline input
          />
          {/* <Typography component="p" gutterBottom sx={{ mt: 2 }}>
            Task name
          </Typography>
          <TextField
            fullWidth
            name="tack title"
            placeholder="Enter a title for this task..."
            value={taskTitle}
            onChange={this.handleOnChange}
          /> */}
          <Button onClick={this.addNewTask}>Add task</Button>
          <Button onClick={onRequestClose}>X</Button>
        </Box>
      </Modal>
    );
  }
}
