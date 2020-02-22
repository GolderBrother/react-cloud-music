import React, { useState, forwardRef, useImperativeHandle } from "react";
import { CSSTransition } from "react-transition-group";
import { ConfirmWrapper } from "./style";
const Confirm = forwardRef((props, ref) => {
  const [show, setShow] = useState(false);
  const { text, confirmBtnText, cancelBtnText } = props;
  const { handleConfirm } = props;
  // 给外层父组件暴露当前组件的方法，供调用
  useImperativeHandle(() => ({
    show() {
      setShow(true);
    }
  }));
  const hiddenConfirm = () => {
    setShow(false);
  };
  const handleSure = () => {
    hiddenConfirm();
    handleConfirm();
  };
  return (
    <CSSTransition
      in={show}
      timeout={300}
      appear={true}
      classNames="confirm-fade"
    >
      <ConfirmWrapper>
        <div className="confirm_container">
          <div className="confirm_content">
            <p className="text">{text}</p>
            <div className="operate">
              <div
                className="operate_btn operate_btn_left"
                onClick={hiddenConfirm}
              >
                {cancelBtnText}
              </div>
              <div className="operate_btn" onClick={handleSure}>
                {confirmBtnText}
              </div>
            </div>
          </div>
        </div>
      </ConfirmWrapper>
    </CSSTransition>
  );
});
export default React.memo(Confirm);
