import React, { useState } from 'react';
import {
  Box,
  Button,
  TextField,
  Typography,
  Stack, Snackbar, Alert
} from '@mui/material';
import api, { task_api } from '../services/api';

const CreateTask = ({ taskData = {}, onTaskUpdate, handleClose }) => {
  const [formValues, setFormValues] = useState({
    name: taskData.name || '',
    description: taskData.description || '',
    is_completed: false,
    completed_date: null
  });
  const [showSuccess, setShowSuccess] = useState(false);

  const handleChange = (e) => {
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post(task_api?.addNewTask, formValues);
      if (res?.status === 201) {
        setShowSuccess(true)
        onTaskUpdate?.();
        setTimeout(() => {
          handleClose();
        }, 2500);
      } else {
        console.log("Cannot create new task")
      }
    } catch (err) {
      console.error("Error getting on adding new task")
    }
  }
  return (
    <>
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          width: '100%',
          maxWidth: 600,
          mx: 'auto',
          display: 'flex',
          flexDirection: 'column',
          gap: 3,
        }}
      >
        <Stack spacing={1}>
          <Typography variant="h6" fontWeight="bold">
            Task Name
          </Typography>
          <TextField
            id="taskName"
            name="name"
            value={formValues.name}
            onChange={handleChange}
            placeholder="Enter task name"
            fullWidth
            variant="outlined"
            required
          />
        </Stack>

        <Stack spacing={1}>
          <Typography variant="h6" fontWeight="bold">
            Description
          </Typography>
          <TextField
            id="description"
            name='description'
            placeholder="Enter task description"
            value={formValues.description}
            onChange={handleChange}
            multiline
            rows={4}
            fullWidth
            variant="outlined"
          />
        </Stack>

        <Button
          type="submit"
          variant="contained"
          sx={{
            backgroundColor: '#1a237e',
            fontWeight: 'bold',
            '&:hover': {
              backgroundColor: '#1a237e',
            },
          }}
        >
          Add Task
        </Button>
      </Box>

      <Snackbar
        open={showSuccess}
        autoHideDuration={2000}
        onClose={() => setShowSuccess(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert
          onClose={() => setShowSuccess(false)}
          severity="success"
          sx={{ width: '100%' }}
        >
          Task added successfully!
        </Alert>
      </Snackbar>
    </>
  );
};
export default CreateTask;