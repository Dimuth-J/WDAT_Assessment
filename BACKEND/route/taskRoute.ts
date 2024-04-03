import { Router } from 'express';
import { createTask, getAllTasks, updateTask, deleteTask,deleteAndArchiveTask, getAllTrashTasks } from '../controller/taskController';

const router: Router = Router();

router.post('/newTask', createTask);
router.get('/getAllTask', getAllTasks);
router.put('/updateTask/:taskId', updateTask);
router.delete('/deleteTask/:taskId', deleteTask);
router.delete('/deleteAndArchiveTask/:taskId', deleteAndArchiveTask);

router.get('/getAllTrashTasks', getAllTrashTasks);


export default router;
