import React, { useEffect, useState, useRef } from "react";
import { ProgressBarWrapper } from "./style";
import { getPrefixStyle } from "../../api/utils";
function ProgressBar(props) {
  const { percent } = props;
  // 进度条改变后的回调，父组件传入的，子组件需要执行并且传入当前进度值
  const { onProgressChange: percentChange } = props;
  const progressBarRef = useRef();
  const progressRef = useRef();
  const progressBtnRef = useRef();
  const progressBtnWidth = 8;
  const [touch, setTouch] = useState({});
  const transformPrefix = getPrefixStyle('transform');
  // 处理进度条的偏移
  const handleOffset = (offset) => {
    offset = Number(offset);
    progressRef.current.style.width = `${offset}px`;
    progressBtnRef.current.style[transformPrefix] = `translate3d(${offset}px, 0px, 0px)`;
  }
  // 监听percent改变后更新进度值
  useEffect(() => {
    if(percent >= 0 && percent <= 1 && !touch.isTouching) {
      const barWidth = progressBarRef.current.clientWidth - progressBtnWidth;
      const offsetWidth = percent * barWidth;
      handleOffset(offsetWidth);
    }
    // eslint-disable-next-line
  }, [percent]);
  // 进度值改变后，获取新的进度值，执行父组件传入的回调
  const _changePercent = () => {
    const barWidth = progressBarRef.current.clientWidth - progressBtnWidth;
    const currentPercent = progressRef.current.clientWidth / barWidth;
    percentChange && percentChange(currentPercent);
  };
  // 滑动开始的回调
  const progressTouchStart = (e) => {
    const startTouch = {};
    startTouch.isTouching = true; // 标识正在滑动
    startTouch.startX = e.touches[0].pageX; // 滑动开始时的横向坐标
    startTouch.left = progressRef.current.clientWidth; // 表示当前 progress 的长度
    setTouch(startTouch);
  }
  // 滑动过程中
  const progressTouchMove = (e) => {
    console.log('progressTouchMove', e);
    console.log('touch.isTouching', touch.isTouching);
    if(!touch.isTouching) return;
    const deltaX = e.touches[0].pageX - touch.startX; // 表示滑动距离
    const barWidth = progressBarRef.current.clientWidth - progressBtnWidth;
    const offsetWidth = Math.min(Math.max(0, touch.left + deltaX), barWidth); //表示控制按钮在当前进度条之内，不能滑动出去
    console.log(`offsetWidth`, offsetWidth);
    handleOffset(offsetWidth);
  }
  const progressTouchEnd = (e) => {
    // 为了不影响到滑动中的状态，因此做个 "深拷贝"
    const endTouch = JSON.parse(JSON.stringify(touch));
    endTouch.isTouching = false;
    setTouch(endTouch);
    _changePercent();
  }
  const progressClick = (e) => {
    const rect = progressRef.current.getBoundingClientRect();
    const offsetWidth = e.pageX - rect.left; // 计算偏移距离
    handleOffset(offsetWidth);
    _changePercent();
  }
  return (
    <ProgressBarWrapper>
      <div className="bar-inner" ref={progressBarRef} onClick={progressClick}>
        <div className="progress" ref={progressRef}></div>
        <div className="progress-btn-wrapper" ref={progressBtnRef}
          onTouchStart={progressTouchStart}
          onTouchMove={progressTouchMove}
          onTouchEnd={progressTouchEnd}
        >
          <div className="progress-btn"></div>
        </div>
      </div>
      {props.children}
    </ProgressBarWrapper>
  );
}
export default React.memo(ProgressBar);
