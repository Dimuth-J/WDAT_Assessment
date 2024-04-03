import { FunctionComponent } from "react";
import "./FrameComponent1.css";

const FrameComponent1: FunctionComponent = () => {
  return (
    <header className="rectangle-parent">
      <div className="frame-child" />
      <div className="t0-do-wrapper">
        <div className="t0-do">T0 DO</div>
      </div>
      <div className="png-user-icon-file-user-icon-b-parent">
        <img
          className="png-user-icon-file-user-icon-b"
          loading="lazy"
          alt=""
          src="/pngusericonfileusericonblack01png311-1@2x.png"
        />
        <div className="dimuth">Dimuth</div>
      </div>
    </header>
  );
};

export default FrameComponent1;