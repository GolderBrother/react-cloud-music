import React, { useState, useCallback, useEffect, useRef } from "react";
import Header from "../../baseUI/header";
import Scroll from "../../baseUI/scroll";
import SongList from "../SongList";
import {
  Container,
  ImgWrapper,
  CollectButton,
  BgLayer,
  SongListWrapper
} from "./style";
import { CSSTransition } from "react-transition-group";
import { HEADER_HEIGHT } from "../../api/config";
import { connect } from 'react-redux';
import { getSingerInfo, changeEnterLoading } from './store/actions';
import Loading from '../../baseUI/loading/index';
import MusicNote from '../../baseUI/music-note';
function Singer(props) {
  const [showStatus, setShowStatus] = useState(true);
  // 用来记录图片初始高度
  const initialHeight = useRef(0);
  // 往上偏移的尺寸，露出圆角
  const OFFSET = 5;

  // 用来获取真实DOM
  const headerRef = useRef();
  const imgWrapperRef = useRef();
  const collectButtonRef = useRef();
  const bgLayerRef = useRef();
  const songListWrapperRef = useRef();
  const scrollRef = useRef();
  const { getSingerInfoDispatch } = props;

  const { artist: immutableArtist, songsOfArtist: immutableSongsOfArtist, enterLoading, songsCount } = props;
  console.log('enterLoading', enterLoading);
  const artist = (immutableArtist && immutableArtist.toJS()) || {};
  const songs = (immutableSongsOfArtist && immutableSongsOfArtist.toJS()) || [];
  const setShowStatusFalse = useCallback(() => {
    setShowStatus(false);
  }, []);
  // handleScroll 作为一个传给子组件的方法，因此我们需要用 useCallback 进行包裹，防止不必要的重渲染
  const handleScroll = useCallback(pos => {
    const newY = pos.y;
    const height = initialHeight.current;
    const headerDOM = headerRef.current;
    const imageDOM = imgWrapperRef.current;
    const collectButtonDOM = collectButtonRef.current;
    const bgLayerDOM = bgLayerRef.current;
    const minScrollY = -(height - OFFSET) + HEADER_HEIGHT;

    // 这个是滑动距离占图片高度的百分比
    const percent = Math.abs(newY / height);

    // (1)处理往下拉动的情况，要达到的效果：图片放大、按钮和遮罩跟着偏移
    if (newY > 0) {
      imageDOM.style["transform"] = `scale(${1 + percent})`;
      collectButtonDOM.style["transform"] = `translate3d(0px, ${newY}px, 0px)`;
      bgLayerDOM.style.top = `${height - OFFSET + newY}px`;
    } else if (newY >= minScrollY) {
      // 往上滑动，但是遮罩还没超过 Header 部分
      bgLayerDOM.style.top = `${height - OFFSET - Math.abs(newY)}px`;
      bgLayerDOM.style.zIndex = 1;
      // 这时候保证遮罩的层叠优先级比图片高，不至于被图片挡住
      imageDOM.style.zIndex = -1;
      imageDOM.style.height = 0;
      imageDOM.style.paddingTop = "75%";
      // 按钮要跟着偏移并逐渐变透明
      collectButtonDOM.style.opacity = `${1 - percent * 2}`;
      collectButtonDOM.style["transform"] = `translate3d(0px, ${newY}px, 0px)`;
    } else if (newY < minScrollY) {
      // 往上滑动，但是超过 Header 部分
      bgLayerDOM.style.top = `${HEADER_HEIGHT - OFFSET}px`;
      bgLayerDOM.style.zIndex = 1;
      // 防止溢出的歌单内容遮住 Header
      headerDOM.style.zIndex = 100;
      // 此时图片高度和header要一致，否则无法往下顶住歌单列表
      imageDOM.style.height = `${HEADER_HEIGHT}px`;
      imageDOM.style.paddingTop = 0;
      imageDOM.style.zIndex = 99;
    }
  }, []);
  useEffect(() => {
    const id = props.match.params.id;
    getSingerInfoDispatch(id);
    const imgOffsetHeight =
      imgWrapperRef &&
      imgWrapperRef.current &&
      imgWrapperRef.current.offsetHeight;
    initialHeight.current = imgOffsetHeight;
    // 歌曲列表和遮罩的高度一致。把遮罩先放在下面，以裹住歌曲列表
    bgLayerRef.current.style.top = songListWrapperRef.current.style.top = `${imgOffsetHeight -
      OFFSET}px`;
    //eslint-disable-next-line
    scrollRef.current.refresh();
  }, []);
  const musicNoteRef = useRef();

  const musicAnimation = (x, y) => {
    musicNoteRef.current.startAnimation({x, y});
  }

  /* 解释一下我为什么要用定时器？

  因为目前元素的 display 虽然变为了 inline-block, 但是元素显示出来需要・浏览器的回流 过程，无法立即显示。 也就是说元素目前还是 隐藏 的，那么 元素的位置未知，导致 transform 失效
  用 setTimout 的本质将动画逻辑放到下一次的 宏任务。事实上，当本次的宏任务完成后， 会触发 浏览器 GUI 渲染线程 的重绘工作，然后才执行下一次宏任务，那么下一次宏任务中元素就显示了，transform 便能生效 */

  return (
    <CSSTransition
      in={showStatus}
      timeout={300}
      appear={true}
      classNames="fly"
      unmountOnExit
      onExited={() => props.history.goBack()}
    >
      <Container showMiniPlayer={songsCount > 0}>
        <Header
          title={artist.name}
          ref={headerRef}
          handleClick={setShowStatusFalse}
        ></Header>
        <ImgWrapper bgUrl={artist.picUrl} ref={imgWrapperRef}>
          <div className="filter"></div>
        </ImgWrapper>
        <CollectButton ref={collectButtonRef}>
          <i className="iconfont">&#xe62d;</i>
          <span className="text"> 收藏 </span>
        </CollectButton>
        <BgLayer ref={bgLayerRef}></BgLayer>
        <SongListWrapper ref={songListWrapperRef}>
          {/* 歌手列表，需要引用歌单详情(Album)的歌曲列表组件 */}
          <Scroll ref={scrollRef} onScroll={handleScroll}>
            <SongList songs={songs} showCollect={false} musicAnimation={musicAnimation}></SongList>
            <MusicNote ref={musicNoteRef}></MusicNote>
          </Scroll>
        </SongListWrapper>
        {Boolean(enterLoading) ? <Loading></Loading> : null}
      </Container>
    </CSSTransition>
  );
}

const mapStateToProps = state => ({
  artist: state.getIn(['singer', 'artist']),
  songsOfArtist: state.getIn(['singer', 'songsOfArtist']),
  enterLoading: state.getIn(['singer', 'enterLoading']),
  songsCount: state.getIn(['player', 'playList']).size // 尽量减少 toJS 操作，直接取 size 属性就代表了 list 的长度
});
const mapDispatchToProps = dispatch => ({
  getSingerInfoDispatch: (id) => {
    dispatch(changeEnterLoading(true));
    dispatch(getSingerInfo(id));
  }
});
export default connect(mapStateToProps, mapDispatchToProps)(React.memo(Singer));
