import React, { useState, useRef, useEffect } from "react";
import * as actions from "./store/actions";
import { connect } from "react-redux";
import MiniPlayer from "./MiniPlayer";
import NormalPlayer from "./NormalPlayer";
import Toast from "../../baseUI/Toast";
import {
  getSongUrl,
  isPlainObject,
  findSongIndex,
  shuffle
} from "../../api/utils";
import { playMode } from '../../api/config';
function Player(props) {
  console.log("Player props", props);
  // 用来记录目前播放时间
  const [currentTime, setCurrentTime] = useState(0);
  // 用来记录歌曲时长
  const [duration, setDuration] = useState(0);
  // 记录当前的歌曲，以便于下次重渲染时比对是否是一首歌
  const [prevSong, setPrevSong] = useState({});
  // 当前播放模式提示文本
  const [modeText, setModeText] = useState("");
  const audioRef = useRef();
  const toastRef = useRef();
  const songReady = useRef(true);
  const percent = isNaN(currentTime / duration) ? 0 : currentTime / duration;
  const {
    playMode: mode, // 播放模式
    playList: immutablePlayList,
    playingState,
    fullScreen,
    currentSong: immutableCurrentSong,
    currentIndex,
    sequencePlayList: immutableSequencePlayList
  } = props;
  const {
    toggleFullScreenDispatch,
    togglePlayingStateDispatch,
    changeCurrentIndexDispatch,
    changeCurrentSongDispatch,
    togglePlayListDispatch,
    togglePlayModeDispatch, // 切换播放模式 分三种: 单曲循环、顺序循环和随机播放
    changeModeDispatch
  } = props;
  const currentSong = immutableCurrentSong ? immutableCurrentSong.toJS() : {};
  const playList = immutablePlayList ? immutablePlayList.toJS() : [];
  const sequencePlayList = immutableSequencePlayList
    ? immutableSequencePlayList.toJS()
    : [];
  const clickPlaying = (e, state) => {
    e.stopPropagation();
    togglePlayingStateDispatch(state);
  };
  // 循环播放
  const handleLoop = () => {
    audioRef.current.currentTime = 0;
    togglePlayingStateDispatch(true);
    audioRef.current.play();
  };
  // 切换到上一首
  const handlePrev = () => {
    // 如果播放列表只有一首歌时单曲循环
    if (playList.length === 1) {
      handleLoop();
      return;
    }
    let prevIndex = currentIndex - 1;
    if (prevIndex < 0) prevIndex = playList.length - 1;
    if (!playingState) togglePlayingStateDispatch(true);
    changeCurrentIndexDispatch(prevIndex);
  };
  // 切换到下一首
  const handleNext = () => {
    // 如果播放列表只有一首歌时单曲循环
    if (playList.length === 1) {
      handleLoop();
      return;
    }
    let nextIndex = currentIndex + 1;
    if (nextIndex > playList.length - 1) nextIndex = 0;
    if (!playingState) togglePlayingStateDispatch(true);
    changeCurrentIndexDispatch(nextIndex);
  };
  // 播放歌曲
  useEffect(() => {
    // 以下几种情况就不播放
    if (
      !playList.length ||
      currentIndex === -1 ||
      !playList[currentIndex] ||
      playList[currentIndex].id === prevSong ||
      !songReady.current // 标志位为 false, 就不能切割
    )
      return;
    // changeCurrentIndexDispatch(0); // -1 -> 0
    const current = playList[currentIndex];
    // changeCurrentSongDispatch(current);
    setPrevSong(current);
    // 把标志位置为 false, 表示现在新的资源没有缓冲完成，不能切歌
    songReady.current = false;
    changeCurrentSongDispatch(current); // 赋值 currentSong
    audioRef &&
      audioRef.current &&
      (audioRef.current.src = getSongUrl(current.id));
    setTimeout(() => {
      // 注意，play 方法返回的是一个 promise 对象
      audioRef.current.play().then(() => {
        songReady.current = true; // 缓冲完了，标记为置为true，才表示可以切歌
      });
    });
    togglePlayingStateDispatch(true); //  设置播放状态
    setCurrentTime(0); // 从头开始播放
    setDuration((current / 1000) | 0); // 设置歌曲时长 按位或 求整
  }, []);
  // 监听播放状态来控制音频
  useEffect(() => {
    playingState ? audioRef.current.play() : audioRef.current.pause();
  }, [playingState]);
  useEffect(() => {
    changeCurrentIndexDispatch(0);
  });
  // 更新当前播放时间
  const updateTime = e => {
    setCurrentTime(e.target.currentTime);
  };
  /**
   * 进度条被滑动或点击时用来改变percent的回调函数
   * @param {*} curPercent 进度条当前进度
   */
  const onProgressChange = curPercent => {
    const newTime = Number(curPercent * duration);
    setCurrentTime(newTime);
    // 更新音频空间的播放进度
    audioRef.current.currentTime = newTime;
    // 如果当前是暂停状态，进度条改变后就继续播放
    if (!playingState) togglePlayingStateDispatch(true);
  };
  // 切换播放模式
  const changeMode = () => {
    let newMode = (mode + 1) % 3; //计算下一个模式索引
    let index;
    switch (newMode) {
      case 0: //顺序循环
        togglePlayListDispatch(sequencePlayList);
        index = findSongIndex(currentSong, sequencePlayList);
        changeCurrentIndexDispatch(index);
        setModeText("顺序循环");
        break;
      case 1: //单曲循环
        changeCurrentIndexDispatch(newMode);
        setModeText("单曲循环");
        break;
      case 2: //随机循环
        const newList = shuffle(sequencePlayList);
        index = findSongIndex(currentSong, newList);
        togglePlayListDispatch(newList);
        changeCurrentIndexDispatch(index);
        setModeText("随机循环");
        break;
      default:
        changeModeDispatch(newMode);
        break;
    }
  };
  // 处理歌曲播放完毕事件
  const handleEnd = () => {
    if (mode === playMode.loop) {
      handleLoop(); // 循环播放
    } else {
      handleNext(); // 切换到下一首
    }
  };
  const handleError = (error) => {
    songReady.current = true;
    alert('播放出错');
    console.log(`播放出错：${String(error)}`);
  }
  // 关于业务逻辑的部分都是在父组件完成然后直接传给子组件，而子组件虽然也有自己的状态，但大部分是控制UI层面的，逻辑都是从props中接受， 这也是展示了UI和逻辑分离的组件设计模式
  return (
    <div>
      <MiniPlayer
        percent={percent}
        song={currentSong}
        fullScreen={fullScreen}
        toggleFullScreen={toggleFullScreenDispatch}
        togglePlayList={togglePlayListDispatch}
        clickPlaying={clickPlaying}
      />
      {isPlainObject(currentSong) ? null : (
        <NormalPlayer
          mode={mode}
          song={currentSong}
          fullScreen={fullScreen}
          playing={playingState} //播放状态
          currentTime={currentTime} //当前播放时间
          duration={duration} //总时长
          percent={percent} //进度
          toggleFullScreen={toggleFullScreenDispatch}
          togglePlayList={togglePlayListDispatch}
          clickPlaying={clickPlaying}
          onProgressChange={onProgressChange}
          handleLoop={handleLoop}
          handlePrev={handlePrev}
          handleNext={handleNext}
          changeMode={changeMode}
        />
      )}
      <audio
        ref={audioRef}
        src={getSongUrl(currentSong[0] && currentSong[0].id || '')}
        // udio标签在播放的过程中会不断地触发onTimeUpdate事件，在此需要更新currentTime变量。
        onTimeUpdate={updateTime}
        // 歌曲播放完毕的回调
        onEnded={handleEnd}
        onError={handleError}
      ></audio>
      <Toast text={modeText} ref={toastRef}></Toast>
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
  showPlayList: state.getIn(["player", "showPlayList"]), // 是否展示播放列表
  currentSong: state.getIn(["player", "currentSong"])
});
const mapDispatchToProps = dispatch => ({
  toggleFullScreenDispatch: data => dispatch(actions.changeFullScreen(data)),
  togglePlayingStateDispatch: data =>
    dispatch(actions.changePlayingState(data)),
  togglePlayModeDispatch: data => dispatch(actions.changePlayMode(data)),
  changeSequencePlayListDispatch: data =>
    dispatch(actions.changeSequencePlayList(data)),
    togglePlayListDispatch: data => dispatch(actions.changePlayList(data)),
  changeCurrentIndexDispatch: data =>
    dispatch(actions.changeCurrentIndex(data)),
  changeShowPlayListDispatch: data =>
    dispatch(actions.changeShowPlayList(data)),
  changeCurrentSongDispatch: data => dispatch(actions.changeCurrentSong(data)),
  changeModeDispatch: data => dispatch(actions.changePlayMode(data))
});
export default connect(mapStateToProps, mapDispatchToProps)(React.memo(Player));
