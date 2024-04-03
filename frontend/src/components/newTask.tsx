import React, { useState } from 'react';

interface Task {
    taskName: string;
    message: string;
    status: boolean;
}

const NewTask: React.FC = () => {
    const [task, setTask] = useState<Task>({ taskName: '', message: '', status: false }); 

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        // Use the correct property names as defined in your Task interface
        setTask(prevTask => ({ ...prevTask, [name]: value }));
    };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    fetch('http://localhost:8000/task/newTask', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(task),
    })
    .then(response => response.json())
    .then(data => {
        console.log('Task created:', data);
        alert("Hi");
        // Reset task state or handle success (redirect, display message, etc.)
        setTask({ taskName: '', message: '', status: false });
    })
    .catch(error => {
      console.error('There was an error creating the task:', error);
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="title">Title</label>
        <input
          type="text"
          name="taskName"
          id="title"
          value={task.taskName}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label htmlFor="description">Description</label>
        <textarea
          name="message"
          id="description"
          value={task.message}
          onChange={handleChange}
          required
        />
      </div>
      <button type="submit">Add Task</button>
    </form>
  );
};

export default NewTask;
