import express, { Request, Response } from 'express';

import Task from '../model/TaskModel';
import TrashTask from '../model/TrashTask'


export const createTask = async (req: Request, res: Response): Promise<void> => {
  try {
    const newTask = new Task({
        taskName: req.body.taskName,
        message: req.body.message,
        status: req.body.status,
        date: req.body.date,
    });

    const savedTask = await newTask.save();
    res.status(201).json(savedTask);
  } catch (error) {
    res.status(400).json({ message: error });
  }
};

export const getAllTasks = async (req: Request, res: Response): Promise<void> => {
    try {
      const tasks = await Task.find({}); 
      res.status(200).json(tasks);
    } catch (error) {
      res.status(500).json({ message: error });
    }
  };


  
// Update a task
export const updateTask = async (req: Request, res: Response): Promise<void> => {
    const { taskId } = req.params;
    const { taskName, message, status, date } = req.body;

    
    try {
    const updatedTask = await Task.findByIdAndUpdate(
        taskId,
        { $set: { taskName, message, status, date } },
        { new: true } // This option instructs Mongoose to return the updated document
    );

    if (!updatedTask) {
        res.status(404).json({ message: "Task not found" });
        return;
    }

    res.status(200).json(updatedTask);
    } catch (error) {
    res.status(500).json({ message: error });
    }
};

// Delete a task
export const deleteTask = async (req: Request, res: Response): Promise<void> => {
    const { taskId } = req.params; // Get the task ID from the URL parameters
  
    try {
      const deletedTask = await Task.findByIdAndDelete(taskId);
  
      if (!deletedTask) {
        res.status(404).json({ message: "Task not found" });
        return;
      }
  
      res.status(200).json({ message: "Task successfully deleted", taskId: taskId });
    } catch (error) {
      res.status(500).json({ message: error });
    }
};



// Delete a task and archive it
export const deleteAndArchiveTask = async (req: Request, res: Response): Promise<void> => {
    const { taskId } = req.params;
  
    try {
      const taskToArchive = await Task.findById(taskId);
  
      if (!taskToArchive) {
        res.status(404).json({ message: "Task not found" });
        return
      }
  
      // Copy the task to the ArchivedTasks collection
      const archivedTask = new TrashTask(taskToArchive.toObject());
      await archivedTask.save();
  
      // Now delete the task from the original Tasks collection
      await Task.findByIdAndDelete(taskId);
  
      res.status(200).json({ message: "Task successfully archived and deleted", archivedTask });
    } catch (error) {
      res.status(500).json({ message: error });
    }
  };





  export const getAllTrashTasks = async (req: Request, res: Response): Promise<void> => {
    try {
      const trashTasks = await TrashTask.find({}); 
      res.status(200).json(trashTasks);
    } catch (error) {
      res.status(500).json({ message: error });
    }
  };