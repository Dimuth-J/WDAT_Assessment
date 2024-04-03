// TaskUpdateModal.tsx
import React, { FunctionComponent, useState } from 'react';

interface Task {
  _id: string;
  taskName: string;
  message: string;
  status: boolean;
  date: string;
}

interface TaskUpdateModalProps {
  task: Task;
  refreshTasks: () => void; // Callback to refresh the tasks list in the parent component
}

const TaskUpdateModal: FunctionComponent<TaskUpdateModalProps> = ({ task, refreshTasks }) => {
  const [updatedTask, setUpdatedTask] = useState(task);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setUpdatedTask({ ...updatedTask, [name]: value });
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUpdatedTask({ ...updatedTask, status: e.target.checked });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      // Assuming you have an endpoint to update the task
      const response = await fetch(`http://localhost:8000/task/updateTask/${task._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedTask),
      });

      if (!response.ok) {
        throw new Error('Failed to update task');
      }

      // Successfully updated the task
      refreshTasks(); // Call the provided callback to refresh the tasks list
    } catch (error) {
      console.error("Error updating task: ", error);
    }
  };

  return (
    <div className="modal fade" id={`updateModal-${task._id}`} tabIndex={-1} aria-labelledby="updateModalLabel" aria-hidden="true">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="updateModalLabel">Update Task</h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div className="modal-body">
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="taskName" className="form-label">Task Name</label>
                <input type="text" className="form-control" name="taskName" defaultValue={updatedTask.taskName} onChange={handleInputChange} required />
              </div>
              <div className="mb-3">
                <label htmlFor="message" className="form-label">Message</label>
                <textarea className="form-control" name="message" defaultValue={updatedTask.message} onChange={handleInputChange} required></textarea>
              </div>
              <div className="form-check mb-3">
                <input className="form-check-input" type="checkbox" name="status" checked={updatedTask.status} onChange={handleCheckboxChange} />
                <label className="form-check-label" htmlFor="status">
                  Complete
                </label>
              </div>
              <button type="submit" className="btn btn-primary" data-bs-dismiss="modal">Save changes</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskUpdateModal;
