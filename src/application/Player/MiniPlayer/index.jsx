import React, { useRef, useCallback } from "react";
import { MiniPlayerContainer } from "./style";
import { getName } from "../../../api/utils";
import { CSSTransition } from "react-transition-group";
import ProgressCircle from "../../../baseUI/progressCircle";
function MiniPlayer(props) {
  // playing: 播放状态 percent: 播放进度
  const { song = {}, fullScreen, playing, percent } = props;
  const { toggleFullScreen, clickPlaying, togglePlayList } = props;
  const miniPlayerRef = useRef();
  const miniWrapperRef = useRef();
  const miniImageRef = useRef();
  const onEnter = () => {
    if (miniPlayerRef) {
      miniPlayerRef.current.style.display = "flex";
    }
  };
  const onExited = () => {
    if (miniPlayerRef) {
      miniPlayerRef.current.style.display = "none";
    }
  };
  const showFullScreen = () => {
    toggleFullScreen(true);
  };

  // 显示播放列表
  const handleTogglePlayList = useCallback(
    e => {
      e.stopPropagation();
      togglePlayList(true);
    },
    [togglePlayList]
  );

  // mock percent
  // const percent = 0.2;
  return (
    <CSSTransition
      in={!fullScreen}
      timeout={400}
      classNames="mini"
      onEnter={onEnter}
      onExited={onExited}
    >
      <MiniPlayerContainer ref={miniPlayerRef} onClick={showFullScreen}>
        <div className="icon">
          <div className="imgWrapper" ref={miniWrapperRef}>
            <img
              ref={miniImageRef}
              className={`play ${playing ? "" : "pause"}`}
              src={(song.al && song.al.picUrl) || ""}
              width="40"
              height="40"
              alt="img"
            />
          </div>
        </div>
        <div className="text">
          <h2 className="name">{song.name}</h2>
          <p className="desc">{getName(song.ar)}</p>
        </div>
        <div className="control">
          <ProgressCircle radius={32} percent={percent}>
            { playing ? 
              <i className="icon-mini iconfont icon-pause" onClick={e => clickPlaying(e, false)}>&#xe650;</i>
              :
              <i className="icon-mini iconfont icon-play" onClick={e => clickPlaying(e, true)}>&#xe61e;</i> 
            }
          </ProgressCircle>
        </div>
        <div className="control" onClick={handleTogglePlayList}>
          <i className="iconfont">&#xe640;</i>
        </div>
      </MiniPlayerContainer>
    </CSSTransition>
  );
}
export default React.memo(MiniPlayer);
