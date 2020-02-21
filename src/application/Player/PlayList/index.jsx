import React, { useRef, useState, useCallback } from "react";
import { connect } from "react-redux";
import { CSSTransition } from "react-transition-group";
import { PlayListWrapper, ScrollWrapper, ListHeader, ListContent } from "./style";
import * as actions from "../store/actions";
import { getPrefixStyle } from "../../../api/utils";
import list from "../../../components/list";
import { playMode } from "../../../api/config";
import Scroll from "../../../baseUI/scroll";
function PlayList(props) {
  const [show, setShow] = useState(false);
  const playListWrapperRef = useRef();
  const listWrapperRef = useRef();
  const {
    mode,
    showPlayList,
    currentIndex,
    playList: immutablePlayList,
    sequencePlayList: immutableSequencePlayList,
    currentSong: immutableCurrentSong
  } = props;
  const playList = (immutablePlayList && immutablePlayList.toJS()) || [];
  const sequencePlayList =
    (immutableSequencePlayList && immutableSequencePlayList.toJS()) || [];
  const currentSong =
    (immutableCurrentSong && immutableCurrentSong.toJS()) || {};
  const {
    togglePlayListDispatch,
    changePlayModeDispatch,
    changeCurrentIndexDispatch,
    changePlayListDispatch,
    deleteSongDispatch
  } = props;
  const transformPrefix = getPrefixStyle("transform");
  //   作为props传入子组件的callback最好用useCallback包装一下
  const handleEnter = useCallback(() => {
    // 让列表显示
    setShow(true);
    if (listWrapperRef && listWrapperRef.current) {
      // 最开始显示在最下面
      listWrapperRef.current.style[transformPrefix] =
        "translate3d(0, 100%, 0%)";
    }
  }, [transformPrefix]);
  const handleEntering = useCallback(() => {
    // 让列表展现
    if (listWrapperRef && listWrapperRef.current) {
      listWrapperRef.current.style["transition"] = "all 0.3s";
      // 向上弹出播放列表
      listWrapperRef.current.style[transformPrefix] = "translate3d(0, 0, 0)";
    }
  }, [transformPrefix]);
  const handleExiting = useCallback(() => {
    if (listWrapperRef && listWrapperRef.current) {
      listWrapperRef.current.style["transition"] = "all 0.3s";
      // 向下收回播放列表
      listWrapperRef.current.style[transformPrefix] = "translate3d(0, 100%, 0)";
    }
  }, [transformPrefix]);
  const handleExit = useCallback(() => {
    // 隐藏列表
    setShow(false);
    if (listWrapperRef && listWrapperRef.current) {
      listWrapperRef.current.style[transformPrefix] = "translate3d(0, 100%, 0)";
    }
  }, [transformPrefix]);
  //   用来获取当前播放歌曲的播放图标
  const getCurrentIcon = item => {
    const isCurrent = currentSong.id === item.id;
    const content = isCurrent ? "&#xe6e3;" : "";
    const className = isCurrent ? "icon-play" : "";
    return (
      <i
        class={`current iconfont ${className}`}
        dangerouslySetInnerHTML={{ __html: content }}
      ></i>
    );
  };
  // 切换模式
  const changeMode = e => {
    const newMode = (mode + 1) % 3;
  };
  const getPlayMode = () => {
    let content, text;
    switch (mode) {
      case playMode.sequence: // 顺序
        content = "&#xe625;";
        text = "顺序播放";
        break;
      case playMode.loop: // 单曲循环
        content = "&#xe653;";
        text = "单曲循环";
        break;
      default:
        content = "&#xe61b;";
        text = "随机播放";
    }
    // 切歌 改变当前索引值
    const handleChangeCurrentIndex = (index) => {
        if(currentIndex === index) return;
        changeCurrentIndexDispatch(index);
    }
    return (
      <div onClick={changeMode}>
        <i class="iconfont" dangerouslySetInnerHTML={{ __html: content }}></i>
        <span class="text">{text}</span>
      </div>
    );
  };
  // 显示是否删除播放列表确认框
  const showClear = () => {};
  // 删除歌曲
  const handleSeleteSong = (e, item) => {
    e.stopPropagation();
    deleteSongDispatch(item);
  }
  return (
    <CSSTransition
      in={showPlayList}
      timeout={300}
      classNames="list-fade"
      onEnter={handleEnter}
      onEntering={handleEntering}
      onExiting={handleExiting}
      onExit={handleExit}
    >
      <PlayListWrapper
        ref={playListWrapperRef}
        style={{ display: show ? "block" : "none" }}
      >
        {/* fix: 其实这是为了在用户点击列表外部的时候，直接将列表隐藏掉，也符合常理。但是 PlayWrapper 的范围是整个屏幕，包含了列表内容，因此在 list_wrapper 中绑定点击事件，阻止它冒泡就行了。因为这个 div 包裹的就是整个歌曲的列表。 */}
        <div className="list_wrapper" ref={listWrapperRef} onClick={e => e.stopPropagation()}>
          <ListHeader>
            <h1 className="title">
              {getPlayMode()}
              <span className="iconfont clear" onClick={showClear}>
                &#xe63d;
              </span>
            </h1>
          </ListHeader>
          <ScrollWrapper>
            <Scroll>
              <ListContent>
                {playList &&
                  playList.map((item, index) => (
                    <li className="item" key={item.id} onClick={() => handleChangeCurrentIndex(index)}>
                      {getCurrentIcon(item)}
                      <span className="text">
                        多想在平庸的生活拥抱你 - 隔壁老樊
                      </span>
                      <span className="like">
                        <i className="iconfont">&#xe601;</i>
                      </span>
                      <span className="delete" onClick={e => handleSeleteSong(e, item)}>
                        <i className="iconfont">&#xe63d;</i>
                      </span>
                    </li>
                  ))}
              </ListContent>
            </Scroll>
          </ScrollWrapper>
        </div>
      </PlayListWrapper>
    </CSSTransition>
  );
}

const mapStateToProps = state => ({
  showPlayList: state.getIn(["player", "showPlayList"]),
  playList: state.getIn(["player", "playList"]),
  currentIndex: state.getIn(["player", "currentIndex"]),
  currentSong: state.getIn(["player", "currentSong"]),
  mode: state.getIn(["player", "playMode"]),
  sequencePlayList: state.getIn(["player", "sequencePlayList"])
});

const mapDispatchToProps = dispatch => ({
  // 切换显示播放列表
  togglePlayListDispatch: data => dispatch(actions.changeShowPlayList(data)),
  // 修改当前的播放模式
  changePlayModeDispatch: data => dispatch(actions.changePlayMode(data)),
  // 修改当前歌曲在列表中的 index，也就是切歌
  changeCurrentIndexDispatch: data =>
    dispatch(actions.changeCurrentIndex(data)),
  // 修改当前的歌曲列表
  changePlayListDispatch: data => dispatch(actions.changePlayList(data)),
  deleteSongDispatch: data => dispatch(actions.deleteSong(data)) // 删除歌曲
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(React.memo(PlayList));
