import React, { useRef } from "react";
import { MiniPlayerContainer } from "./style";
import { getName } from "../../../api/utils";
import { CSSTransition } from "react-transition-group";
import ProgressCircle from "../../../baseUI/progressCircle";
function MiniPlayer(props) {
  const { song = {}, fullScreen } = props;
  const { toggleFullScreen } = props;
  const miniPlayerRef = useRef();
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
  
  // mock percent
  const percent = 0.2;
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
          <div className="imgWrapper">
            <img
              className="play"
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
            <i className="iconfont icon-mini">&#xe650;</i>
          </ProgressCircle>
        </div>
        <div className="control">
          <i className="iconfont">&#xe640;</i>
        </div>
      </MiniPlayerContainer>
    </CSSTransition>
  );
}
export default React.memo(MiniPlayer);
