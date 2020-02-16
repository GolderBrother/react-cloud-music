import React from 'react';
import { SongWrapper, SongListWrapper } from "./style";
import { getName, getCount } from "../../api/utils";
const SongList = React.forwardRef((props, ref) => {
  const { songs = [], showCollect, collectCount, showBackground } = props;
  const totalCount = (songs && songs.length) || 0;
  const selectItem = item => {
    console.log("selectItem item", item);
  };
  const renderSongList = (list = []) =>
    list.map((item, index) => (
      <li key={`${item.al.name}_${index}`} onClick={() => selectItem(item)}>
        <span className="index">{index + 1}</span>
        <div className="info">
          <span>{item.name}</span>
          <span>
            {item.ar ? getName(item.ar) : getName(item.artists)} -{" "}
            {item.al.name ? item.al.name : item.album.name}
          </span>
        </div>
      </li>
    ));
  const renderCollect = count => (
    <div className="add_list">
      <i className="iconfont">&#xe62d;</i>
      {/* <span>收藏({getCount(currentAlbum.subscribedCount)})</span> */}
      <span>收藏({getCount(count)})</span>
    </div>
  );
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
export default React.memo(SongList);
