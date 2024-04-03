import { FunctionComponent } from "react";
import FrameComponent1 from "../FrameComponent1/FrameComponent1";
import FrameComponent from "../FrameComponent/FrameComponent";
import Form from "../Form/Form";
import "./Desktop.css";

const Desktop: FunctionComponent = () => {
  return (
    <div className="desktop-1">
      <FrameComponent1 />
      <FrameComponent />
      <Form />
    </div>
  );
};

export default Desktop;