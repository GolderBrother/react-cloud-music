import React from "react";
import { CircleWrapper } from "./style";
function ProgressCircle(props) {
  const { radius, percent } = props;
  // 整个背景的周长
  const strokeDasharray = 2 * Math.PI * 50;
  // 这是没有高亮的部分，那就是直接减去高亮的部分(进度)
  const strokeDashoffset = (1 - percent) * strokeDasharray;
  return (
    <CircleWrapper>
      <svg
        width={radius}
        height={radius}
        viewBox="0 0 100 100"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle
          className="progress-background"
          r="50"
          cx="50"
          cy="50"
          fill="transparent"
        ></circle>
        <circle
          className="progress-bar"
          r="50"
          cx="50"
          cy="50"
          fill="transparent"
          strokeDasharray={strokeDasharray}
          strokeDashoffset={strokeDashoffset}
        ></circle>
      </svg>
      {props.children}
    </CircleWrapper>
  );
}

export default React.memo(ProgressCircle);
