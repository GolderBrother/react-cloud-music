import React, { useState, useEffect } from "react";
import { SongWrapper, SongListWrapper } from "./style";
import { getName, getCount } from "../../api/utils";
import { ONE_PAGE_COUNT } from '../../api/config';
import { connect } from "react-redux";
import {
  changePlayList,
  changeCurrentIndex,
  changeSequencePlayList
} from "../../application/Player/store/actions";
const SongList = React.forwardRef((props, ref) => {
  const [startIndex, setStartIndex] = useState(0);
  const {
    songs = [],
    showCollect,
    collectCount,
    loading = false,
    usePageSplit,
    showBackground
  } = props;
  const {
    musicAnimation,
    changeCurrentIndexDispatch,
    changePlayListDispatch,
    changeSequencePlayListDispatch
  } = props;
  const totalCount = (songs && songs.length) || 0;
  useEffect(() => {
    if (!loading) return;
    if (startIndex + 1 + ONE_PAGE_COUNT >= totalCount) return;
    setStartIndex(startIndex + ONE_PAGE_COUNT);
  }, [loading, startIndex, totalCount]);
  const selectItem = (e, index) => {
    console.log('selectItem', e, index);
    changePlayListDispatch(songs);
    changeSequencePlayListDispatch(songs);
    changeCurrentIndexDispatch(index);
    console.log('e.nativeEvent.clientX, e.nativeEvent.clientY', e.nativeEvent.clientX, e.nativeEvent.clientY);
    musicAnimation(e.nativeEvent.clientX, e.nativeEvent.clientY);
  };
  const renderSongList = (list = []) => {
    let res = [];
    // 判断页数是否超过总数
    let end = usePageSplit ? startIndex + ONE_PAGE_COUNT : list.length;
    for (let i = 0; i < end; i++) {
      if (i >= list.length) break;
      let item = list[i];
      res.push(
        <li key={item.id} onClick={e => selectItem(e, i)}>
          <span className="index">{i + 1}</span>
          <div className="info">
            <span>{item.name}</span>
            <span>
              {item.ar ? getName(item.ar) : getName(item.artists)} -{" "}
              {item.al ? item.al.name : item.album.name}
            </span>
          </div>
        </li>
      );
    }
    return res;
  };
  const renderCollect = count => (
    <div className="add_list">
      <i className="iconfont">&#xe62d;</i>
      {/* <span>收藏({getCount(currentAlbum.subscribedCount)})</span> */}
      <span>收藏({getCount(count)})</span>
    </div>
  );
  useEffect(() => {
    changeCurrentIndexDispatch(0);
  }, []);

  return (
    <SongWrapper ref={ref} showBackground={showBackground}>
      <div className="first_line">
        <div className="play_all">
          <i className="iconfont">&#xe6e3;</i>
          <span>
            播放全部
            <span className="sum">(共{totalCount}首)</span>
          </span>
        </div>
        {showCollect ? renderCollect(collectCount) : null}
      </div>
      <SongListWrapper>{songs ? renderSongList(songs) : null}</SongListWrapper>
    </SongWrapper>
  );
});
const mapStateToProps = null;
const mapDispatchToProps = dispatch => ({
  changePlayListDispatch: data => dispatch(changePlayList(data)),
  changeCurrentIndexDispatch: data => dispatch(changeCurrentIndex(data)),
  changeSequencePlayListDispatch: data => dispatch(changeSequencePlayList(data))
});
// 将 ui 组件包装成容器组件
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(React.memo(SongList));
