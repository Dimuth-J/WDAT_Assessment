import { FunctionComponent } from "react";
import "./FrameComponent.css";

const FrameComponent: FunctionComponent = () => {
  return (
    <section className="navigation-wrapper">
      <div className="navigation w-100">

        <a href="../Home" className="rectangle-group ">
            <div className="frame-item" />
            <div className="add-task1 text-light">ADD Task</div>
        </a>

        <a href="../AllTaskView" className="rectangle-container">
            <div className="frame-inner" />
            <div className="view-all-task text-light">View All Task</div>
        </a>

        <a href="../Trash" className="group-div" >
            <div className="rectangle-div" />
            <div className="trash text-light">Trash</div>
        </a>

      </div>
    </section>
  );
};

export default FrameComponent;