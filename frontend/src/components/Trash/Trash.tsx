import { FunctionComponent, useState, useEffect } from "react";
import FrameComponent1 from "../FrameComponent1/FrameComponent1";
import FrameComponent from "../FrameComponent/FrameComponent";
import "./Trash.css";

interface TrashTask {
    _id: string;
    taskName: string;
    message: string;
    status: boolean;
    date: string;
  }

const Trash: FunctionComponent = () => {

    const [trashTasks, setTrashTasks] = useState<TrashTask[]>([]);
    
    useEffect(() => {
        fetchTrashTasks();
    }, []);

    const fetchTrashTasks = async () => {
        try {
            const response = await fetch('http://localhost:8000/task/getAllTrashTasks');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            setTrashTasks(data);
        } catch (error) {
            console.error("Fetching tasks failed: ", error);
        }
    };




  return (
    <div className="desktop-1">
        <FrameComponent1 />
        <FrameComponent />
        <div className="row w-100">
            <div className="col-4"></div>
            <div className="col-4 pt-5">
            <h2>All Trash Tasks</h2>
            <div className="">
            {trashTasks.map((trashTasks, index) => (
                <div key={index} className="mb-3">
                    <div className="card p-0">
                        <div className="card-body">
                            <h4 className="card-title">{trashTasks.taskName}</h4>
                            <h6 className="card-subtitle mb-2 text-muted">Due: {new Date(trashTasks.date).toLocaleDateString()}</h6>
                            <p className="card-text">{trashTasks.message}</p>
                            <p className={`card-text status-text ${trashTasks.status ? 'text-success' : 'text-danger'}`}>
                            Status: <strong>{trashTasks.status ? "Complete" : "Incomplete"}</strong>
                            </p>
                        </div>
                    </div>
                </div>
                
            ))}
            </div>
            </div>
        </div>

        

    </div>
    
  );
};

export default Trash;