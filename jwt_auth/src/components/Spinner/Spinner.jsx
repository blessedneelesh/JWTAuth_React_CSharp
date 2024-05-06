import "./Spinner.css";
import { Spin } from "antd";
const Spinner = () => {
  return (
    <>
      <div>
        <Spin className="loader"></Spin>
      </div>
    </>
  );
};

export default Spinner;
