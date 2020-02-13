import React, { useState, useCallback } from "react";
import { Container } from "./style";
import { CSSTransition } from "react-transition-group";
import Header from "../../baseUI/header";
function Album(props) {
  const [showStatus, setShowStatus] = useState(true);
  const handleClick = useCallback(() => {
    // 为什么不是直接在 handleBack 里面直接跳转路由呢？
    // 当你点击后，执行路由跳转逻辑，这个时候路由变化，当前的组件会被立即卸载，相关的动画当然也就不复存在了。最后的解决方案就是，先让页面切出动画执行一次，然后在动画执行完的瞬间跳转路由，这就达到我们的预期了。
    setShowStatus(false);
  }, []);
  return (
    <CSSTransition
      in={showStatus}
      timeout={300}
      classNames="fly"
      appear={true}
      unmountOnExit
      // 页面离开钩子，在这边跳转路由才可以，否则在其他地方跳转，过渡动画不生效！！！
      onExited={props.history.goBack}
    >
      <Container>
        <Header title={"返回"} handleClick={handleClick} />
      </Container>
    </CSSTransition>
  );
}
export default React.memo(Album);
