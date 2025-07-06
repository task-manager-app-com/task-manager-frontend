import React from 'react';
import { Typography, Container, Stack } from '@mui/material';
import TodoBox from '../components/todo_box';

const ToDoList = ({ allData, onTaskUpdate, mode }) => {
  return (
    <Container maxWidth="md" sx={{ py: 2 }}>
      <Typography
        variant="h4"
        fontWeight="bold"
        gutterBottom
        sx={{ color: '#1a237e' }}
      >
        {mode !== 'history' ? `Your ToDo List` : `Completed Tasks`}
      </Typography>

      <Stack
        spacing={2}
        sx={
          mode === 'history'
            ? {
                maxHeight: '400px', // or any height you prefer
                overflowY: 'auto',
                pr: 1, // optional: space for scrollbar
              }
            : {}
        }
      >
        {allData && allData.length > 0 ? (
          allData.map((task, index) => (
            <TodoBox
              key={task?.id || index}
              id={task?.id || index}
              name={task?.name}
              description={task?.description}
              isCompleted={task?.is_completed}
              onTaskUpdate={onTaskUpdate}
              completedDate={task?.completed_date}
              createAt={task?.createAt}
            />
          ))
        ) : (
          <Typography>No tasks available.</Typography>
        )}
      </Stack>
    </Container>
  );
};

export default ToDoList;
