import styled from 'styled-components';
import GlobalStyle from '../../assets/global-style';

export const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: ${props => props.showMiniPlayer ? "60px" : 0};
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

export const TopDesc = styled.div`
  position: relative;
  display: flex;
  width: 100%;
  height: 275px;
  justify-content: space-around;
  -webkit-box-align: center;
  align-items: center;
  box-sizing: border-box;
  background-size: 100%;
  padding: 5px 20px 50px;
  margin-bottom: 20px;
  .background  {
    z-index: -1;
    position: absolute;
    width: 100%;
    height: 100%;
    filter: blur(20px);
    background: url(${props => props.background}) 0px 0px / 100% 100% no-repeat;
    // background-position: 0px 0px;
    .filter {
      position: absolute;
      z-index: 10;
      top: 0px;
      left: 0px;
      width: 100%;
      height: 100%;
      background: rgba(7, 17, 27, 0.2);
    }
  }
  .img_wrapper {
    width: 120px;
    height: 120px;
    position: relative;
    .decorate {
      position: absolute;
      top: 0px;
      width: 100%;
      height: 35px;
      border-radius: 3px;
      background: linear-gradient (hsla (0,0%,43%,.4),hsla (0,0%,100%,0));
    }
    img {
      width: 120px;
      height: 120px;
      border-radius: 3px;
    }
    .play_count {
      position: absolute;
      right: 2px;
      top: 2px;
      font-size: 12px;
      line-height: 15px;
      color: rgb(241, 241, 241);
      .play {
        vertical-align: top;
      }
      // .iconfont {
      //   font-size: 16px;
      //   font-style: normal;
      //   -webkit-font-smoothing: antialiased;
      //   font-family: iconfont !important;
      // }
    }
  }
  .desc_wrapper {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    height: 120px;
    flex: 1 1 0%;
    padding: 0px 10px;
    .title {
      max-height: 70px;
      text-overflow: ellipsis;
      color: ${GlobalStyle["font-color-light"]};
      font-weight: 700;
      line-height: 1.5;
      font-size: ${GlobalStyle["font-size-l"]};
      overflow: hidden;
    }
    .person {
      display: flex;
      .avatar {
        width: 20px;
        height: 20px;
        margin-right: 5px;
        img {
          width: 100%;
          height: 100%;
          border-radius: 50%;
        }
      }
      .name {
        line-height: 20px;
        font-size: ${GlobalStyle["font-size-m"]};
        color: ${GlobalStyle["font-color-desc-v2"]};
      }
    }
  }
`;

export const Menu = styled.div`
  position: relative;
  display: flex;
  -webkit-box-pack: justify;
  justify-content: space-between;
  box-sizing: border-box;
  padding: 0px 30px 20px;
  margin: -100px 0px 0px;
  >div {
    display: flex;
    flex-direction: column;
    line-height: 20px;
    text-align: center;
    z-index: 1000;
    font-weight: 500;
    font-size: ${GlobalStyle["font-size-s"]};
    color: ${GlobalStyle["font-color-light"]};
    .iconfont {
      font-size: 20px;
    }
  }
`;

export const SongWrapper = styled.div`
  opacity: 0.98;
  border-radius: 10px;
  background:  ${props => props.showBackground ? `background: ${GlobalStyle["highlight-background-color"]}`: ""};
  .first_line {
    box-sizing: border-box;
    margin-left: 10px;
    position: relative;
    justify-content: space-between;
    padding: 10px 0px;border-bottom: 1px solid ${GlobalStyle["border-color"]};
    .play_all {
      display: inline-block;
      line-height: 24px;
      color: ${GlobalStyle["font-color-desc"]};
      .iconfont {
        font-size: 24px;
        margin-right: 10px;
        vertical-align: top;
      }
      > span {
        vertical-align: top;
        font-size: ${GlobalStyle["font-size-m"]};
      }
      .sum {
        font-size: ${GlobalStyle["font-size-s"]};
        color: ${GlobalStyle["font-color-desc-v2"]};
      }
    }
    .add_list, .isCollected {
      display: flex;
      -webkit-box-align: center;
      align-items: center;
      position: absolute;
      right: 0px;
      top: 0px;
      bottom: 0px;
      width: 130px;
      line-height: 34px;
      background: ${GlobalStyle["theme-color"]};
      color: ${GlobalStyle["font-color-light"]};
      font-size: 0px;
      vertical-align: top;
      border-radius: 3px;
      .iconfont {
        vertical-align: top;
        font-size: 10px;
        margin: 0px 5px 0px 10px;
      }
      span {
        font-size: ${GlobalStyle["font-size-m"]};
        line-height: 34px;
      }
    }
    .isCollected {
      display: flex;
      background: ${GlobalStyle["background-color"]};
      color: ${GlobalStyle["font-color-desc"]};
    }
  }
`;
