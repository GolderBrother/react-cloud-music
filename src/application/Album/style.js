import styled from 'styled-components';
import GlobalStyle from '../../assets/global-style';
export const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1000;
  background: red;
  // background: ${GlobalStyle["background-color"]};
  transform-origin: right bottom;
  // 切入动画样式, 思路: 设定 transfrom 的固定点，接下来的动画都是绕这个点旋转或平移;然后以Z为坐标轴旋转
  &.fly-enter, &.fly-appear{
    transform: rotateZ(30deg) translate3d(100%, 0, 0);
  }
  &.fly-enter-active, &.fly-appear-active{
    transition: transform .3s;
    transform: rotateZ(0deg) translate3d(0, 0, 0);
  }
  &.fly-exit{
    transform: rotateZ(0deg) translate3d(0, 0, 0);
  }
  &.fly-exit-active{
    transition: transform .3s;
    transform: rotateZ(30deg) translate3d(100%, 0, 0);
  }
`;
