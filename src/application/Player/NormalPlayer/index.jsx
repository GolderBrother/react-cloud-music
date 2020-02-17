import React, { useRef } from "react";
import { CSSTransition } from "react-transition-group";
import animations from "create-keyframe-animation";
import {
  NormalPlayerContainer,
  Top,
  Middle,
  CDWrapper,
  Bottom,
  ProgressWrapper,
  Operators
} from "./style";
import { getName } from "../../../api/utils";
function NormalPlayer(props) {
  console.log("NormalPlayer props", props);
  const { song = {}, fullScreen } = props;
  const { toggleFullScreen } = props;
  const normalPlayerRef = useRef();
  const cdWrapperRef = useRef();
  const handleBack = () => toggleFullScreen(false);
  const ANIMATION_NAME = 'move';
  // 进入时的回调，启动帧动画
  const onEnter = () => {
    normalPlayerRef.current.style.display = "block";
    const { x, y, scale } = _getPosAndScale(); // 获取 miniPlayer 图片中心相对 normalPlayer 唱片中心的偏移距离(x, y)
    const animation = {
      0: {
        transform: `translate3d (${x} px,${y} px,0) scale (${scale})`
      },
      60: {
        transform: `translate3d (0, 0, 0) scale (1.1)`
      },
      100: {
        transform: `translate3d (0, 0, 0) scale (1)`
      }
    };
    animations.registerAnimation({
        name: ANIMATION_NAME,
        animation,
        presets: {
            duration:400,
            easing: 'linear'
        }
    });
    animations.runAnimation(cdWrapperRef.current, ANIMATION_NAME);
  };
  // 进入后的回调，解绑帧动画
  const afterEnter = () => {
    animations.unregisterAnimation(ANIMATION_NAME);
    normalPlayerRef.current.style.animation = '';
  }
  // 计算偏移的辅助函数
  const _getPosAndScale = () => {
    const targetWidth = 40;
    const paddingLeft = 40;
    const paddingBottom = 30;
    const paddingTop = 80;
    const width = window.innerWidth * 0.8;
    const scale = targetWidth / width;
    // 两个圆心的横坐标距离和纵坐标距离
    const x = -(window.innerWidth / 2 - paddingLeft);
    const y = window.innerHeight - paddingTop - width / 2 - paddingBottom;
    return {
      x,
      y,
      scale
    };
  };
  return (
    <CSSTransition
      classNames={"normal"}
      in={fullScreen} // 进场(显示)和出场(隐藏)的控制边变量
      timeout={400}
      mountOnEnter
      onEnter={onEnter}
      onEntered={afterEnter}
      // onExit={onExit}
      // onExited={afterExit}
    >
      <NormalPlayerContainer ref={normalPlayerRef}>
        <div class="background">
          <img
            src={`${song.al.picUrl}?param=300x300`}
            width="100%"
            height="100%"
            alt="歌曲图片"
          />
        </div>
        <div className="background layer"></div>
        <Top className="top">
          <div class="back" onClick={handleBack}>
            <i class="iconfont icon-back"></i>
          </div>
          <div class="text">
            <h1 class="title">{song.name}</h1>
            <h2 class="subtitle">{getName(song.ar)}</h2>
          </div>
        </Top>
        <Middle ref={cdWrapperRef}>
          <CDWrapper>
            <div className="cd">
              <img
                className="image play"
                src={`${song.al.picUrl}?param=400x400`}
                alt=""
              />
            </div>
          </CDWrapper>
        </Middle>
        <Bottom className="bottom">
          <ProgressWrapper>
            <span className="time time-l"></span>
            <div className="progress-bar-wrapper"></div>
            <span className="time time-r"></span>
          </ProgressWrapper>
          <Operators>
            <div className="icon i-left">
              <i className="iconfont">&#xe625;</i>
            </div>
            <div className="icon i-left">
              <i className="iconfont">&#xe6e1;</i>
            </div>
            <div className="icon i-center">
              <i className="iconfont">&#xe723;</i>
            </div>
            <div className="icon i-right">
              <i className="iconfont">&#xe718;</i>
            </div>
            <div className="icon i-right">
              <i className="iconfont">&#xe640;</i>
            </div>
          </Operators>
        </Bottom>
      </NormalPlayerContainer>
    </CSSTransition>
  );
}
export default React.memo(NormalPlayer);
