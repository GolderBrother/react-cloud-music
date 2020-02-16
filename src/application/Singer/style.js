import styled from 'styled-components';
import GlobalStyle from '../../assets/global-style';

export const Container = styled.div `
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1000;
  background: ${GlobalStyle["background-color"]};
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

export const ImgWrapper = styled.div`
    position: relative;
    width: 100%;
    height: 0px;
    padding-top: 75%;
    transform-origin: center top;
    z-index: 50;
    background: url(${props => props.bgUrl}) 0% 0% / cover;
    .filter {
        position: absolute;
        top: 0px;
        left: 0px;
        width: 100%;
        height: 100%;
        background: rgba(7, 17, 27, 0.3);
    }
`;

export const CollectButton = styled.div`
    position: fixed;
    left: 0px;
    right: 0px;
    box-sizing: border-box;
    width: 120px;
    height: 40px;
    z-index: 50;
    color: ${GlobalStyle["font-color-light"]};
    background: ${GlobalStyle["theme-color"]};
    text-align: center;
    font-size: 0px;
    line-height: 40px;
    margin: -55px auto auto;
    border-radius: 20px;
    .iconfont {
        display: inline-block;
        margin-right: 10px;
        font-size: 12px;
        vertical-align: 1px;
    }
    .text {
        display: inline-block;
        font-size: 14px;
        letter-spacing: 5px;
    }
`;

export const BgLayer = styled.div`
    position: absolute;
    top: 0px;
    bottom: 0px;
    width: 100%;
    z-index: 50;
    background: white;
    border-radius: 10px;
`;

export const SongListWrapper = styled.div`
    position: absolute;
    z-index: 50;
    top: 0px;
    left: 0px;
    bottom: 0px;
    right: 0px;
    > div{
        position: absolute;
        left: 0px;
        width: 100%;
        overflow: visible;
    }
`;