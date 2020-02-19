import React, { forwardRef, useImperativeHandle, useState } from "react";
import { CSSTransition } from "react-transition-group";
import { ToastWrapper } from "./style";
// 父组件需要拿到函数组件的ref，因此需要用forwardRef包装一下
const Toast = forwardRef((props, ref) => {
const [show, setShow] = useState(false);
const [ timer, setTimer ] = useState();
  const { text = "", children = null } = props;
  // 父组件需要使用组件的方法， 将方法写到回调的返回值中
  useImperativeHandle(ref, () => ({
      show(){
        // 添加防抖处理
        if(timer) clearTimeout(timer);
        setShow(true);
        setTimer(setTimeout(() => {
            setShow(false);
        }, 3000));
      }
  }));
  return (
    <CSSTransition
        in={show}
        timeout={300}
        classNames="drop"
        unmountOnExit
    >
      <ToastWrapper>
        <div className="text">{text}</div>
        {children}
      </ToastWrapper>
    </CSSTransition>
  );
});
function Toast(props) {
  const {} = props;
  return;
}
export default React.memo(Toast);
