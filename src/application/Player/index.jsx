import React from "react";
import * as actions from "./store/actions";
import { connect } from "react-redux";
import MiniPlayer from "./MiniPlayer";
import NormalPlayer from "./NormalPlayer";
function Player(props) {
  const currentSong = {
    al: {
      picUrl:
        "https://p1.music.126.net/JL_id1CFwNJpzgrXwemh4Q==/109951164172892390.jpg"
    },
    name: "木偶人",
    ar: [{ name: "薛之谦" }]
  };
  console.log("Player props", props);
  const { fullScreen } = props;
  const { toggleFullScreenDispatch } = props;
  return (
    <div>
      <MiniPlayer song={currentSong} fullScreen={fullScreen} toggleFullScreen={toggleFullScreenDispatch}     />
      <NormalPlayer song={currentSong} fullScreen={fullScreen} toggleFullScreen={toggleFullScreenDispatch} />
    </div>
  );
}
const mapStateToProps = state => ({
  fullScreen: state.getIn(["player", "fullScreen"]),
  playingState: state.getIn(["player", "playingState"]),
  sequencePlayList: state.getIn(["player", "sequencePlayList"]),
  playList: state.getIn(["player", "playList"]),
  playMode: state.getIn(["player", "playMode"]),
  currentIndex: state.getIn(["player", "currentIndex"]),
  showPlayList: state.getIn(["player", "showPlayList"]),
  currentSong: state.getIn(["player", "currentSong"])
});
const mapDispatchToProps = dispatch => ({
  toggleFullScreenDispatch: data => dispatch(actions.changeFullScreen(data)),
  togglePlayingStateDispatch: data =>
    dispatch(actions.changePlayingState(data)),
  togglePlayModeDispatch: data => dispatch(actions.changePlayMode(data)),
  changeSequencePlayListDispatch: data =>
    dispatch(actions.changeSequencePlayList(data)),
  changePlayListDispatch: data => dispatch(actions.changePlayList(data)),
  changeCurrentIndexDispatch: data =>
    dispatch(actions.changeCurrentIndex(data)),
  changeShowPlayListDispatch: data =>
    dispatch(actions.changeShowPlayList(data)),
  changeCurrentSongDispatch: data => dispatch(actions.changeCurrentSong(data))
});
export default connect(mapStateToProps, mapDispatchToProps)(React.memo(Player));
