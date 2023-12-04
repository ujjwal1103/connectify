import React from "react";
import "./slider.css";

import { Line } from "rc-progress";
const Slider = ({ value }) => {
  return (
    <div>
      <Line
        percent={value}
        strokeWidth={2}
        strokeColor="gray"
        trailWidth={2}
        trailColor=""
      />
    </div>
  );
};

export default Slider;
