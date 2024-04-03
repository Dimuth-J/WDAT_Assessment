import "./Form.css";
import React, { useState } from 'react';
import Swal from 'sweetalert2';

interface Task {
    taskName: string;
    message: string;
    status: boolean;
    date: string;
}


const Form: React.FC = () => {
    const [task, setTask] = useState<Task>({ 
        taskName: '', 
        message: '', 
        status: false, 
        date: new Date().toISOString() // Initialize with the current date and time
      });

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
        Swal.fire({
            title: "Good job!",
            text: "Successfully Save Your Task 👌😎",
            icon: "success"
          });
        // Reset task state or handle success (redirect, display message, etc.)
        setTask({ taskName: '', message: '', status: false, date: new Date().toISOString() });
    })
    .catch(error => {
      console.error('There was an error creating the task:', error);
    });
  };


  return (
    <div className="container">
        <div className="row">
            <div className="col-4"></div>
            <div className="col-4 bg-color-1 p-5">
                <form onSubmit={handleSubmit}>
                    <div className="mb-3 text-start">
                        <h6 className="form-label">Title</h6>
                        <input type="text" name="taskName" id="title" className="form-control"
                        value={task.taskName} onChange={handleChange} required />
                    </div>
                    <div className="mb-3 text-start">
                        <h6 className="form-label">Discription</h6>
                        <textarea className="form-control" name="message" id="description"
                        value={task.message} onChange={handleChange} required />
                    </div>

                    <button type="submit" className="btn btn-primary">Add Task</button>
                </form>
            </div>

            <div className="col-4"></div>
    </div>
    </div>
  );
};

export default Form;