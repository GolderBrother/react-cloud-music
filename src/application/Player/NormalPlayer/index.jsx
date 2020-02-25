import React, { useRef, useEffect } from "react";
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
import { getName, getPrefixStyle, formatPlayTime } from "../../../api/utils";
import ProgressBar from "../../../baseUI/progressBar";
import { playMode, speedList } from "../../api/config";
import Scroll from "../../../baseUI/scroll";
import {
  LyricContainer,
  LyricWrapper,
  SpeedList,
  SpeedListItem
} from "./style";
function NormalPlayer(props) {
  const {
    song = {},
    fullScreen,
    playing,
    percent,
    duration = 0,
    currentTime = 0,
    mode = "",
    currentLyric,
    currentPlayingLyric,
    currentLineNum,
    speed
  } = props;
  const {
    toggleFullScreen,
    clickPlaying,
    onProgressChange,
    handlePrev,
    handleNext,
    changeMode,
    togglePlayList,
    clickSpeed
  } = props;
  const normalPlayerRef = useRef();
  const cdWrapperRef = useRef();
  // 切换为迷你播放器
  const handleBack = () => toggleFullScreen(false);
  const currentState = useRef("");
  const lyricScrollRef = useRef();
  const lyricLineRef = useRef([]);
  const ANIMATION_NAME = "move";
  // 进入时的回调，启动帧动画
  const onEnter = () => {
    normalPlayerRef.current.style.display = "block";
    const { x, y, scale } = _getPosAndScale(); // 获取 miniPlayer 图片中心相对 normalPlayer 唱片中心的偏移距离(x, y)
    const animation = {
      0: {
        transform: `translate3d(${x}px,${y}px,0) scale(${scale})`
      },
      60: {
        transform: `translate3d(0, 0, 0) scale(1.1)`
      },
      100: {
        transform: `translate3d(0, 0, 0) scale(1)`
      }
    };
    animations.registerAnimation({
      name: ANIMATION_NAME,
      animation,
      presets: {
        duration: 400,
        easing: "linear"
      }
    });
    animations.runAnimation(cdWrapperRef.current, ANIMATION_NAME);
  };
  // 进入后的回调，解绑帧动画
  const afterEnter = () => {
    animations.unregisterAnimation(ANIMATION_NAME);
    normalPlayerRef.current.style.animation = "";
  };
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
  const transformPrefix = getPrefixStyle("transform");
  // 离开时的回调
  const onLeave = () => {
    if (!cdWrapperRef.current) return;
    const cdWrapperDom = cdWrapperRef.current;
    cdWrapperDom.style.transition = "all 0.4s";
    const { x, y, scale } = _getPosAndScale();
    cdWrapperDom.style[
      transformPrefix
    ] = `translate3d(${x}px, ${y}px, 0px) scale(${scale})`;
  };

  // 离开后的回调，清空所有过渡、动画和隐藏元素
  const afterLeave = () => {
    if (!cdWrapperRef.current) return;
    // 清空过渡和动画
    const cdWrapperDom = cdWrapperRef.current;
    cdWrapperDom.style.transition = "";
    cdWrapperDom.style[transformPrefix] = "";
    // 一定要注意现在要把 normalPlayer 这个 DOM 给隐藏掉，因为 CSSTransition 的工作只是把动画执行一遍
    // 不置为 none 现在全屏播放器页面还是存在
    normalPlayerRef.current.style.display = "none";
    // 推出播放界面后，要还原歌词状态
    currentState.current = "";
  };
  // 获取播放模式
  const getPlayMode = () => {
    let content = "";
    switch (mode) {
      case playMode.sequence: // 顺序
        content = "&#xe625;";
        break;
      case playMode.loop: // 循环
        content = "&#xe653;";
        break;
      default:
        // 随机
        content = "&#xe61b;";
        break;
    }
    return content;
  };
  // 显示播放列表
  const showPlayList = e => {
    e.stopPropagation();
    togglePlayList(true);
  };
  // 切换当前是否显示歌词状态
  const toggleCurrentState = () => {
    const isLyric = currentState.current === "lyric";
    currentState.current = isLyric ? "" : "lyric";
  };
  const isLyric = currentState.current === "lyric";
  // 监听 currentLineNum 变量，当它改变时，来进行一些歌词滚动操作。
  // 这样子父组件 currentLine 改变后， normalPlayer 的歌词就需要滚动到相应位置。
  useEffect(() => {
    if (!lyricScrollRef.current) return;
    // 获取better-scroll 组件实例
    const bScroll = lyricScrollRef.current.getBScroll();
    // 保持当前歌词在第 5 条的位置(中间位置)
    if (currentLineNum > 5) {
      // 获取到中间行数的元素
      const lineElement = lyricLineRef.current[currentLineNum - 5].current;
      bScroll.scrollToElement(lineElement, 1000);
    } else {
      // 当前歌词行数小于 5 行，就直接滚动到最顶端
      bScroll.scrollTo(0, 0, 1000);
    }
  }, [currentLineNum]);
  return (
    <CSSTransition
      classNames={"normal"}
      in={fullScreen} // 进场(显示)和出场(隐藏)的控制边变量
      timeout={400}
      mountOnEnter
      onEnter={onEnter}
      onEntered={afterEnter}
      onExit={onLeave}
      onExited={afterLeave}
    >
      <NormalPlayerContainer ref={normalPlayerRef}>
        <div className="background">
          <img
            src={`${song.al.picUrl}?param=300x300`}
            width="100%"
            height="100%"
            alt="歌曲图片"
          />
        </div>
        <div className="background layer"></div>
        <Top className="top">
          <div className="back" onClick={handleBack}>
            <i className="iconfont icon-back">&#xe662;</i>
          </div>
          <div className="text">
            <h1 className="title">{song.name}</h1>
            <h2 className="subtitle">{getName(song.ar)}</h2>
          </div>
        </Top>
        <Middle ref={cdWrapperRef} onClick={toggleCurrentState}>
          <CSSTransition timeout={400} in={!isLyric} classNames={"fade"}>
            {/* currentState.current -> lyric：显示所有歌词，否则只是显示一行歌词  */}
            <CDWrapper styles={{ visibility: !isLyric ? "visible" : "hidden" }}>
              <div className={`needle ${playing ? "" : "pause"}`}></div>
              <div className="cd">
                <img
                  className={`image play ${playing ? "" : "pause"}`}
                  src={`${song.al.picUrl}?param=400x400`}
                  alt=""
                />
              </div>
              <p className="playing_lyric">{currentPlayingLyric}</p>
            </CDWrapper>
          </CSSTransition>
          {/* 显示所有歌词 */}
          <CSSTransition timeout={400} in={isLyric} classNames={"fade"}>
            <LyricContainer>
              <Scroll ref={lyricScrollRef}>
                <LyricWrapper
                  className="lyric_wrapper"
                  style={{ visibility: isLyric ? "visible" : "hidden" }}
                >
                  {currentLyric ? (
                    currentLyric.lines.map((item, index) => {
                      // 为了拿到每一行歌词的 DOM 对象，后面滚动歌词需要！
                      lyricLineRef.current[index] = React.createRef();
                      return (
                        <p
                          key={item + index}
                          className={`text ${
                            currentLineNum === index ? "current" : ""
                          }`}
                          ref={lyricLineRef.current[index]}
                        >
                          {item.text}
                        </p>
                      );
                    })
                  ) : (
                    <p className="pure">纯音乐，请欣赏。</p>
                  )}
                </LyricWrapper>
              </Scroll>
            </LyricContainer>
          </CSSTransition>
        </Middle>
        <Bottom className="bottom">
          <SpeedList className="speed-Speedlist">
            <span>倍速听歌</span>
            {speedList.map((item, index) => {
              <SpeedListItem
                key={item.key}
                className={speed === index ? "selected" : ""}
                onClick={() => clickSpeed(item.key)}
              >
                {item.name}
              </SpeedListItem>;
            })}
          </SpeedList>
          <ProgressWrapper>
            <span className="time time-l">{formatPlayTime(currentTime)}</span>
            <div className="progress-bar-wrapper">
              <ProgressBar
                percent={percent}
                // 这是进度条被滑动或点击时用来改变percent的回调函数，在父组件中传入
                onProgressChange={onProgressChange}
              ></ProgressBar>
            </div>
            <span className="time time-r">{formatPlayTime(duration)}</span>
          </ProgressWrapper>
          <Operators>
            <div className="icon i-left" onClick={changeMode}>
              <i
                className="iconfont"
                dangerouslySetInnerHTML={{ __html: getPlayMode() }}
              >
                &#xe625;
              </i>
            </div>
            <div className="icon i-left" onClick={handlePrev}>
              <i className="iconfont">&#xe6e1;</i>
            </div>
            <div className="icon i-center">
              <i
                className="iconfont"
                onClick={e => clickPlaying(e, !playing)}
                // 如果直接在标签中渲染，就只会渲染出字符串，不能编译成icon
                dangerouslySetInnerHTML={{
                  __html: playing ? "&#xe723;" : "&#xe731;"
                }}
              ></i>
            </div>
            <div className="icon i-right" onClick={handleNext}>
              <i className="iconfont">&#xe718;</i>
            </div>
            <div className="icon i-right" onClick={showPlayList}>
              <i className="iconfont">&#xe640;</i>
            </div>
          </Operators>
        </Bottom>
      </NormalPlayerContainer>
    </CSSTransition>
  );
}
export default React.memo(NormalPlayer);
