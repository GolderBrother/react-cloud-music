import React, { useRef, useState, useEffect } from "react";
import { connect } from "react-redux";
import * as actions from "./store/actions";
import {
  isEmptyObject,
  shuffle,
  findSongIndex,
  getSongUrl
} from "../../api/utils";
import PlayList from "./PlayList";
import Toast from "../../baseUI/Toast";
import Lyric from "../../api/lyric-parser";
import MiniPlayer from "./MiniPlayer";
import NormalPlayer from "./NormalPlayer";
import { playMode as _playMode } from "../../api/config";
import { getLyricRequest } from "./../../api/request";

function Player(props) {
  // 用来记录目前播放时间
  const [currentTime, setCurrentTime] = useState(0);
  // 用来记录歌曲时长
  const [duration, setDuration] = useState(0);
  // 即时歌词
  const [currentPlayingLyric, setPlayingLyric] = useState("");
  // 当前播放模式提示文本
  const [modeText, setModeText] = useState("");

  let percent = isNaN(currentTime / duration) ? 0 : currentTime / duration;

  const {
    speed,
    playingState,
    currentSong: immutableCurrentSong,
    currentIndex,
    playList: immutablePlayList,
    playMode,
    sequencePlayList: immutableSequencePlayList,
    fullScreen
  } = props;

  const {
    togglePlayingDispatch,
    togglePlayListDispatch,
    changeCurrentIndexDispatch,
    changeCurrentDispatch,
    changePlayListDispatch,
    changeModeDispatch,
    toggleFullScreenDispatch,
    changeSpeedDispatch
  } = props;

  const playList = immutablePlayList.toJS();
  const sequencePlayList = immutableSequencePlayList.toJS();
  const currentSong = immutableCurrentSong.toJS();

  // 记录当前的歌曲，以便于下次重渲染时比对是否是一首歌
  const [preSong, setPreSong] = useState({});

  const audioRef = useRef();
  const toastRef = useRef();

  // 歌词播放记录
  const currentLyric = useRef();
  // 用来记录当前行数的
  const currentLineNum = useRef(0);
  const songReady = useRef(true);

  // 播放歌曲
  useEffect(() => {
    // 以下几种情况就不播放
    if (
      !playList.length ||
      currentIndex === -1 ||
      !playList[currentIndex] ||
      playList[currentIndex].id === preSong.id ||
      !songReady.current
    )
      return;
    // 把标志位置为 false, 表示现在新的资源没有缓冲完成，不能切歌
    songReady.current = false;
    let current = playList[currentIndex];
    // 赋值 currentSong
    changeCurrentDispatch(current);
    setPreSong(current);
    setPlayingLyric("");
    audioRef.current.src = getSongUrl(current.id);
    audioRef.current.autoplay = true;
    audioRef.current.playbackRate = speed;
    togglePlayingDispatch(true); //  设置播放状态
    getLyric(current.id);
    setCurrentTime(0); // 从头开始播放
    setDuration((current.dt / 1000) | 0); // 设置歌曲时长 按位或 求整
    // eslint-disable-next-line
  }, [currentIndex, playList]);
  // 监听播放状态来控制音频
  useEffect(() => {
    playingState ? audioRef.current.play() : audioRef.current.pause();
  }, [playingState]);

  useEffect(() => {
    if (!fullScreen) return;
    if (currentLyric.current && currentLyric.current.lines.length) {
      handleLyric({
        lineNum: currentLineNum.current,
        txt: currentLyric.current.lines[currentLineNum.current].txt
      });
    }
  }, [fullScreen]);

  // 歌词解析完后的回调
  const handleLyric = ({ lineNum, txt }) => {
    if (!currentLyric.current) return;
    currentLineNum.current = lineNum;
    setPlayingLyric(txt);
  };

  // 获取歌词数据
  const getLyric = id => {
    // 歌词
    let lyric = "";
    if (currentLyric.current) {
      currentLyric.current.stop();
    }
    // 避免songReady恒为false的情况
    setTimeout(() => {
      songReady.current = true;
    }, 3000);
    getLyricRequest(id)
      .then(data => {
        lyric = data.lrc && data.lrc.lyric;
        if (!lyric) {
          currentLyric.current = null;
          return;
        }
        currentLyric.current = new Lyric(lyric, handleLyric, speed);
        currentLyric.current.play();
        // 从第一行歌词开始
        currentLineNum.current = 0;
        // 切换到头开始播放
        currentLyric.current.seek(0);
      })
      .catch(() => {
        // 出错了之后不影响接下来歌曲的播放
        currentLyric.current = "";
        songReady.current = true;
        audioRef.current.play();
      });
  };

  const clickPlaying = (e, state) => {
    e.stopPropagation();
    togglePlayingDispatch(state);
    if (currentLyric.current) {
      currentLyric.current.togglePlay(currentTime * 1000);
    }
  };

  /**
   * 进度条被滑动或点击时用来改变percent的回调函数
   * @param {*} curPercent 进度条当前进度
   */
  const onProgressChange = curPercent => {
    const newTime = curPercent * duration;
    setCurrentTime(newTime);
    audioRef.current.currentTime = newTime;
    if (!playingState) {
      togglePlayingDispatch(true);
    }
    if (currentLyric.current) {
      currentLyric.current.seek(newTime * 1000);
    }
  };

  // 更新当前播放时间
  const updateTime = e => {
    setCurrentTime(e.target.currentTime);
  };

  // 循环播放
  const handleLoop = () => {
    audioRef.current.currentTime = 0;
    togglePlayingDispatch(true);
    audioRef.current.play();
    if (currentLyric.current) {
      currentLyric.current.seek(0);
    }
  };

  // 切换到上一首
  // 如果播放列表只有一首歌时单曲循环
  const handlePrev = () => {
    if (playList.length === 1) {
      handleLoop();
      return;
    }
    let index = currentIndex - 1;
    if (index === 0) index = playList.length - 1;
    if (!playingState) togglePlayingDispatch(true);
    changeCurrentIndexDispatch(index);
  };

  // 切换到下一首
  const handleNext = () => {
    // 如果播放列表只有一首歌时单曲循环
    if (playList.length === 1) {
      handleLoop();
      return;
    }
    let index = currentIndex + 1;
    if (index === playList.length) index = 0;
    if (!playingState) togglePlayingDispatch(true);
    changeCurrentIndexDispatch(index);
  };

  const handleEnd = () => {
    if (playMode === _playMode.loop) {
      handleLoop(); // 循环播放
    } else {
      handleNext(); // 切换到下一首
    }
  };

  // 切换播放模式
  const changeMode = () => {
    //计算下一个模式索引
    let newMode = (playMode + 1) % 3;
    if (newMode === 0) {
      //顺序模式
      changePlayListDispatch(sequencePlayList);
      let index = findSongIndex(currentSong, sequencePlayList);
      changeCurrentIndexDispatch(index);
      setModeText("顺序循环");
    } else if (newMode === 1) {
      //单曲循环
      changePlayListDispatch(sequencePlayList);
      setModeText("单曲循环");
    } else if (newMode === 2) {
      //随机播放
      let newList = shuffle(sequencePlayList);
      let index = findSongIndex(currentSong, newList);
      changePlayListDispatch(newList);
      changeCurrentIndexDispatch(index);
      setModeText("随机播放");
    }
    changeModeDispatch(newMode);
    toastRef.current.show();
  };
  const handleError = (error) => {
    songReady.current = true;
    handleNext();
    console.log(`播放出错：${error}`);
    alert("播放出错");
  };

  // 倍速播放功能
  const clickSpeed = newSpeed => {
    changeSpeedDispatch(newSpeed);
    // playbackRate 为歌词播放的速度，可修改
    audioRef.current.playbackRate = newSpeed;
    // 并且需要同步歌词
    currentLyric.current.changeSpeed(newSpeed);
    currentLyric.current.seek(currentTime * 1000);
  };
 // 关于业务逻辑的部分都是在父组件完成然后直接传给子组件，而子组件虽然也有自己的状态，但大部分是控制UI层面的，逻辑都是从props中接受， 这也是展示了UI和逻辑分离的组件设计模式
  return (
    <div>
      {isEmptyObject(currentSong) ? null : (
        <NormalPlayer
          song={currentSong}
          fullScreen={fullScreen}
          playing={playingState} //播放状态
          mode={playMode} // 当前模式
          percent={percent}
          modeText={modeText} // 当前模式
          duration={duration} //总时长
          currentTime={currentTime} //当前播放时间
          currentLyric={currentLyric.current}
          currentPlayingLyric={currentPlayingLyric}
          speed={speed} // 当前播放速度
          changeMode={changeMode}
          handlePrev={handlePrev}
          handleNext={handleNext}
          onProgressChange={onProgressChange}
          currentLineNum={currentLineNum.current}
          clickPlaying={clickPlaying}
          toggleFullScreen={toggleFullScreenDispatch}
          togglePlayList={togglePlayListDispatch}
          clickSpeed={clickSpeed} // 倍速播放
          // handleLoop={handleLoop}
        ></NormalPlayer>
      )}
      {isEmptyObject(currentSong) ? null : (
        <MiniPlayer
          playing={playingState}
          fullScreen={fullScreen}
          song={currentSong}
          percent={percent}
          clickPlaying={clickPlaying}
          toggleFullScreen={toggleFullScreenDispatch}
          togglePlayList={togglePlayListDispatch}
        ></MiniPlayer>
      )}

      <PlayList clearPreSong={setPreSong.bind(null, {})}></PlayList>
      <audio
        // src={getSongUrl((currentSong[0] && currentSong[0].id) || "")}
        // udio标签在播放的过程中会不断地触发onTimeUpdate事件，在此需要更新currentTime变量。
        ref={audioRef}
        onTimeUpdate={updateTime}
        // 歌曲播放完毕的回调
        onEnded={handleEnd}
        onError={handleError}
      ></audio>
      <Toast text={modeText} ref={toastRef}></Toast>
    </div>
  );
}

// 映射Redux全局的state到组件的props上
const mapStateToProps = state => ({
  fullScreen: state.getIn(["player", "fullScreen"]),
  playingState: state.getIn(["player", "playingState"]),
  currentSong: state.getIn(["player", "currentSong"]),
  showPlayList: state.getIn(["player", "showPlayList"]),
  playMode: state.getIn(["player", "playMode"]),
  speed: state.getIn(["player", "speed"]),
  currentIndex: state.getIn(["player", "currentIndex"]),
  playList: state.getIn(["player", "playList"]),
  sequencePlayList: state.getIn(["player", "sequencePlayList"])
});

// 映射dispatch到props上
const mapDispatchToProps = dispatch => {
  return {
    togglePlayingDispatch(data) {
      dispatch(actions.changePlayingState(data));
    },
    toggleFullScreenDispatch(data) {
      dispatch(actions.changeFullScreen(data));
    },
    togglePlayListDispatch(data) {
      dispatch(actions.changeShowPlayList(data));
    },
    changeCurrentIndexDispatch(index) {
      dispatch(actions.changeCurrentIndex(index));
    },
    changeCurrentDispatch(data) {
      dispatch(actions.changeCurrentSong(data));
    },
    changeModeDispatch(data) {
      dispatch(actions.changePlayMode(data));
    },
    changePlayListDispatch(data) {
      dispatch(actions.changePlayList(data));
    },
    changeSpeedDispatch(data) {
      dispatch(actions.changeSpeed(data));
    }
  };
};

// 将ui组件包装成容器组件
export default connect(mapStateToProps, mapDispatchToProps)(React.memo(Player));
