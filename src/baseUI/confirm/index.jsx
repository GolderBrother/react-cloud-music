import React, { useState, forwardRef, useImperativeHandle } from "react";
import { CSSTransition } from "react-transition-group";
import { ConfirmWrapper } from "./style";
const Confirm = forwardRef((props, ref) => {
    const [ show, setShow ] = useState(false);
    const { text, confirmBtnText, cancelBtnText } = props;
    useImperativeHandle(() => ({
        show(){
            setShow(true)
        }
    }));
    return (
        <CSSTransition
            in={show}
            timeout={300}
            classNames="confirm-fade"
        >
          <ConfirmWrapper>ConfirmWrapper</ConfirmWrapper>
        </CSSTransition>
      );
});
export default React.memo(Confirm);
