import React from 'react';
import { Box, Typography, Paper, Button, Stack } from '@mui/material';
import api, { task_api } from '../services/api';
import { format } from 'date-fns';

const TodoBox = ({ name, description, id, isCompleted, onTaskUpdate, completedDate, createAt }) => {
  const handleTaskCompletion = async (id) => {
    try {
      const res = await api.patch(`${task_api?.completingTask}/${id}/complete`);
      if (res?.status === 200) {
        console.log(id, 'Task marked as complete:: isCompleted::', isCompleted);
        onTaskUpdate?.();
      } else {
        console.error("::Cannot complete the task::");
      }
    } catch (err) {
      console.error("Error getting on compleing a task::", err);
    }
  };

  const formatDateTime = (date) => {
    if (date) {
      const format_date = format(new Date(date), 'dd MMM yyyy')
      return format_date;
    }
  }

  return (
    <Paper
      elevation={3}
      sx={{
        p: { xs: 1, sm: 1 },
        borderRadius: 2,
        mb: 1,
        backgroundColor: 'background.paper',
      }}
    >
      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        justifyContent="space-between"
        alignItems={{ xs: 'flex-start', sm: 'center' }}
        spacing={2}
      >
        <Box sx={{ textAlign: 'left', width: !isCompleted ? '75%' : '100%' }}>
          {completedDate === null && (
            <Typography sx={{ fontSize: '12px', color: '#1a237e', fontWeight: 'bold', textAlign: 'left' }}>created : {formatDateTime(createAt)}</Typography>
          )}
          <Typography variant="h6" fontWeight="bold" gutterBottom>
            {name}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            {description}
          </Typography>
          {completedDate !== null && (
            <Typography sx={{ fontSize: '12px', color: '#1a237e', fontWeight: 'bold', textAlign: 'right' }}>completed : {formatDateTime(completedDate)}</Typography>
          )}
        </Box>

        {!isCompleted && (
          <Button
            variant="contained"
            onClick={() => handleTaskCompletion(id)}
            sx={{ whiteSpace: 'nowrap', backgroundColor: '#ffb842', fontWeight: 'bold' }}
          >
            Complete
          </Button>
        )}
      </Stack>
    </Paper>
  );
};
export default TodoBox;