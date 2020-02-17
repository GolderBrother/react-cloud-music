import React, {useRef} from "react";
import { MiniPlayerContainer } from "./style";
import { getName } from "../../../api/utils";
import { CSSTransition } from 'react-transition-group';
function MiniPlayer(props) {
  const { song = {}, fullScreen } = props; 
  const { toggleFullScreen } = props;
  const miniPlayerRef = useRef();
  const onEnter = () => {
    if(miniPlayerRef) {
      miniPlayerRef.current.style.display = 'flex';
    }
  }
  const onExited = () => {
    if(miniPlayerRef) {
      miniPlayerRef.current.style.display = 'none';
    }
  }
  const showFullScreen = () => {
    toggleFullScreen(true);
  }
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
          <div class="imgWrapper">
            <img
              class="play"
              src={(song.al && song.al.picUrl) || ""}
              width="40"
              height="40"
              alt="img"
            />
          </div>
        </div>
        <div class="text">
          <h2 class="name">{song.name}</h2>
          <p class="desc">{getName(song.ar)}</p>
        </div>
        <div class="control">
          <i className="iconfont">&#xe650;</i>
        </div>
        <div class="control">
          <i className="iconfont">&#xe640;</i>
        </div>
      </MiniPlayerContainer>
    </CSSTransition>
  );
}
export default React.memo(MiniPlayer);
