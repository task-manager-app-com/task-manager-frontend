import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8080/api',
    headers: {
        'Content-Type': 'application/json',
    },
});

export default api;

export const task_api = {
    addNewTask:'/addTask',
    getAllTasks:'/getTasks',
    completingTask:'/completeTask',
    completedTasks:'/completedTasks',
    updateTasks:'/updateTasks',
};