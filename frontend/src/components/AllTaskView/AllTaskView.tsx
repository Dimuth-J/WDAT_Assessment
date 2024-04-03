import React, { FunctionComponent, useState, useEffect } from "react";
import FrameComponent1 from "../FrameComponent1/FrameComponent1";
import FrameComponent from "../FrameComponent/FrameComponent";
import TaskUpdateModal from "../../modal/taskUpdateModal/taskUpdateModal";
import "./AllTaskView.css";
import Swal from 'sweetalert2';

interface Task {
    _id: string;
    taskName: string;
    message: string;
    status: boolean;
    date: string;
    // Add any additional task properties here
  }

const AllTaskView: FunctionComponent = () => {

    const [tasks, setTasks] = useState<Task[]>([]);

    useEffect(() => {
        fetchTasks();
    }, []);

    const fetchTasks = async () => {
        try {
            const response = await fetch('http://localhost:8000/task/getAllTask');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            setTasks(data);
            console.log("Hi",data)
        } catch (error) {
            console.error("Fetching tasks failed: ", error);
        }
    };

    const deleteTask = async (taskId: string) => {
        try {
            const response = await fetch(`http://localhost:8000/task/deleteAndArchiveTask/${taskId}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            Swal.fire({
                title: "Good job!",
                text: "Successfully Task Delete👌😎",
                icon: "success"
              });
            // If the delete was successful, filter out the deleted task from the tasks state
            setTasks(currentTasks => currentTasks.filter(task => task._id !== taskId));
        } catch (error) {
            console.error("Deleting task failed: ", error);
        }
    };




  return (
    <div className="desktop-1">
        <FrameComponent1 />
        <FrameComponent />
        <div className="row w-100">
            <div className="col-4"></div>
            <div className="col-4 pt-5">
            <h2>All Tasks</h2>
            <div className="">
            {tasks.map((task, index) => (
                <div key={index} className="mb-3">
                    <div className="card p-0">
                        <div className="card-body">
                            <h4 className="card-title">{task.taskName}</h4>
                            <h6 className="card-subtitle mb-2 text-muted">Due: {new Date(task.date).toLocaleDateString()}</h6>
                            <p className="card-text">{task.message}</p>
                            <p className={`card-text status-text ${task.status ? 'text-success' : 'text-danger'}`}>
                            Status: <strong>{task.status ? "Complete" : "Incomplete"}</strong>
                            </p>
                        </div>
                        <div className="card-footer">
                            <button className="btn btn-warning me-5" data-bs-toggle="modal" data-bs-target={`#updateModal-${task._id}`}>Update</button>
                            <button className="btn btn-danger" onClick={() => deleteTask(task._id)} >Delete</button>
                        </div>
                    </div>
                    {/* Task Update Modal */}
                    <TaskUpdateModal task={task} refreshTasks={fetchTasks} />
                </div>
                
            ))}
            </div>
            </div>
        </div>

        

    </div>
    
  );
};

export default AllTaskView;