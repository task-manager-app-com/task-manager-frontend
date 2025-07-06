/** @jsxImportSource @emotion/react */
import React, { useEffect, useState } from 'react';
import { Box, Button, Typography, Modal, IconButton, Tooltip } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import TODOIMAGE from '../assests/todo_img.jpg';
import ToDoList from './todo_list';
import CreateTask from './create';
import api, { task_api } from '../services/api';
import HistoryIcon from '@mui/icons-material/History';
import { keyframes } from '@emotion/react';

const fadeSlideIn = keyframes`
  from {
    opacity: 0;
    transform: translateX(-50%) translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateX(-50%) translateY(0);
  }
`;

const ViewTask = () => {
  const mode = 'history';
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [openHistory, setOpenHistory] = useState(false);
  const handleOpenHistory = () => setOpenHistory(true)
  const handleCloseHistory = () => setOpenHistory(false);
  const [allTasksData, setAllTasksData] = useState([]);
  const [historyData, setHistoryData] = useState([]);

  const getAllTasksData = async () => {
    try {
      const res = await api.get(task_api?.getAllTasks);
      if (res?.status === 200) {
        setAllTasksData(res?.data)
      }
    } catch (err) {
      console.error("Error getting on Getting All Tasks details::", err);
    }
  }

  const getHistory = async () => {
    try {
      const res = await api.get(task_api?.completedTasks);
      if (res?.status === 200) {
        setHistoryData(res?.data)
      }
    } catch (err) {
      console.error("Error on getting history::", err)
    }
  }

  useEffect(() => {
    getAllTasksData();
    getHistory();
  }, []);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        height: '100vh',
        width: '100%',
      }}
    >
      {/* Left Section */}
      <Box
        sx={{
          flex: '1 1 40%',
          position: 'relative',
          minWidth: '300px',
          height: { xs: '40vh', md: '100vh' },
        }}
      >
        <Box
          component="img"
          src={TODOIMAGE}
          alt="todo"
          sx={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
        />
        <Typography
          variant="h5"
          sx={{
            position: 'absolute',
            top: '3%',
            left: '50%',
            transform: 'translateX(-50%)',
            backgroundColor: '#e7e8fa',
            color: '#1a237e',
            px: 3,
            py: 1.5,
            borderRadius: 3,
            textAlign: 'center',
            fontWeight: 700,
            boxShadow: 3,
            letterSpacing: 1,
            border:'4px solid #ffb842',
            animation: `${fadeSlideIn} 1s ease-out`,

          }}
        >
          Get in Touch with Your Day
        </Typography>
      </Box>

      {/* Right Section */}
      <Box
        sx={{
          flex: '1 1 60%',
          backgroundColor: '#8182ee',
          p: 4,
          minWidth: '300px',
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
          <Tooltip title="Your Hisotry">
            <IconButton onClick={handleOpenHistory}>
              <HistoryIcon />
            </IconButton>
          </Tooltip>
          <Button
            variant="contained"
            onClick={handleOpen}
            sx={{
              backgroundColor: '#1a237e',
              fontWeight: 'bold',
              '&:hover': {
                backgroundColor: '#1a237e',
              },
            }}
          >
            Add New Task
          </Button>
        </Box>
        <ToDoList allData={allTasksData} onTaskUpdate={getAllTasksData} />
      </Box>

      {/* new task adding */}
      <Modal open={open} onClose={handleClose}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
            width: '90%',
            maxWidth: 400,
            borderRadius: 2,
          }}
        >
          <IconButton
            onClick={handleClose}
            sx={{
              position: 'absolute',
              top: 8,
              right: 8,
            }}
          >
            <CloseIcon />
          </IconButton>
          <CreateTask onTaskUpdate={getAllTasksData} handleClose={handleClose} />
        </Box>
      </Modal>

      {/* hisotry */}
      <Modal open={openHistory} onClose={handleCloseHistory}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
            width: '90%',
            maxWidth: 400,
            borderRadius: 2,
          }}
        >
          <IconButton
            onClick={handleCloseHistory}
            sx={{
              position: 'absolute',
              top: 8,
              right: 8,
            }}
          >
            <CloseIcon />
          </IconButton>
          <ToDoList allData={historyData} onTaskUpdate={getHistory} mode={mode} />
        </Box>
      </Modal>
    </Box>
  );
};
export default ViewTask;