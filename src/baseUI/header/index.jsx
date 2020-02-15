import React from "react";
import PropTypes from "prop-types";
import { HeaderContainer } from "./style";
// 解决函数组件获取不到ref的问题, 所以用 forwardRef
const Header = React.forwardRef((props, ref) => {
  const { title, handleClick, isMarquee, children } = props;
  return (
    <HeaderContainer ref={ref}>
      <i className="iconfont back" onClick={handleClick}>&#xe655;</i>
      {isMarquee ? (
        <marquee>
          <h1>{title}</h1>
        </marquee>
      ) : (
        <h1>{title}</h1>
      )}
      {children}
    </HeaderContainer>
  );
});
Header.propTypes = {
  title: PropTypes.string,
  isMarquee: PropTypes.bool,
  handleClick: PropTypes.func
};
Header.defaultProps = {
  title: "标题",
  isMarquee: false,
  handleClick: () => {}
};

export default React.memo(Header);
