import React, { useState, useCallback, useRef, useEffect } from "react";
import { Container, TopDesc, Menu, SongWrapper, SongList } from "./style";
import { CSSTransition } from "react-transition-group";
import Header from "../../baseUI/header";
import Scroll from "../../baseUI/scroll";
import GlobalStyle from "../../assets/global-style";
import { HEADER_HEIGHT } from "../../api/config";
import { getName, getCount } from "../../api/utils";
import { getAlbumDetail } from "./store/actions";
import { connect } from "react-redux";
import Loading from "../../baseUI/loading";
import { isPlainObject } from "../../api/utils";
function Album(props) {
  const [title, setTitle] = useState("歌单");
  const [showStatus, setShowStatus] = useState(true);
  const [isMarquee, setIsMarquee] = useState(false); // 是否开启跑马灯
  const { enterLoading, currentAlbum: currentAlbumImmutable } = props;
  const id = props.match.params.id;
  const { getAlbumDetailDispatch } = props;
  const headerRef = useRef();
  const currentAlbum =
    (currentAlbumImmutable && currentAlbumImmutable.toJS()) || {};
  // 将传给子组件的函数用 useCallback 包裹，这也是 useCallback 的常用场景
  // 以此为例，如果不用 useCallback 包裹，父组件每次执行时会生成不一样的 handleBack 和 handleScroll 函数引用，那么子组件每一次 memo 的结果都会不一样，导致不必要的重新渲染，也就浪费了 memo 的价值。
  // 因此 useCallback 能够帮我们在依赖不变的情况保持一样的函数引用，最大程度地节约浏览器渲染性能。
  const handleScroll = useCallback(
    pos => {
      const minScrollY = -HEADER_HEIGHT;
      const percent = Math.abs(pos.y / minScrollY);
      const headerDom = headerRef.current;
      //滑过顶部的高度才需要开始变化，并开启走马灯
      if (pos.y < minScrollY) {
        headerDom.style.backgroundColor = GlobalStyle["theme-color"];
        headerDom.style.opacity = Math.min(1, (percent - 1) / 2);
        setTitle(currentAlbum.name);
        setIsMarquee(true);
      } else {
        headerDom.style.backgroundColor = "";
        headerDom.style.opacity = 1;
        setTitle("歌单");
        setIsMarquee(false);
      }
    },
    [currentAlbum]
  );
  const handleBack = useCallback(() => {
    // 为什么不是直接在 handleBack 里面直接跳转路由呢？
    // 当你点击后，执行路由跳转逻辑，这个时候路由变化，当前的组件会被立即卸载，相关的动画当然也就不复存在了。最后的解决方案就是，先让页面切出动画执行一次，然后在动画执行完的瞬间跳转路由，这就达到我们的预期了。
    setShowStatus(false);
  }, []);
  useEffect(() => {
    getAlbumDetailDispatch(id);
  }, [id, getAlbumDetailDispatch]);
  // 渲染歌单介绍板块
  const renderTopDesc = (currentAlbum = {}) => (
    <TopDesc background={currentAlbum.coverImgUrl}>
      <div className="background">
        <div className="filter"></div>
      </div>
      <div className="img_wrapper">
        <div className="decorate"></div>
        <img src={currentAlbum.coverImgUrl} alt="img" />
        <div className="play_count">
          <i className="iconfont play">&#xe885;</i>
          <span className="count">
            {getCount(currentAlbum.subscribedCount)}
          </span>
        </div>
      </div>
      <div className="desc_wrapper">
        <div className="title">{currentAlbum.name}</div>
        <div className="person">
          <div className="avatar">
            <img
              src={
                (currentAlbum.creator && currentAlbum.creator.avatarUrl) || ""
              }
              alt="avatar"
            />
          </div>
          <div className="name">
            {(currentAlbum.creator && currentAlbum.creator.nickname) || ""}
          </div>
        </div>
      </div>
    </TopDesc>
  );
  // 渲染菜单板块
  const renderMenu = () => (
    <Menu>
      <div>
        <i className="iconfont">&#xe6ad;</i>评论
      </div>
      <div>
        <i className="iconfont">&#xe86f;</i>点赞
      </div>
      <div>
        <i className="iconfont">&#xe62d;</i>收藏
      </div>
      <div>
        <i className="iconfont">&#xe606;</i>更多
      </div>
    </Menu>
  );
  // 渲染播放列表板块
  const renderSongWrapper = (currentAlbum = {}) => (
    <SongWrapper>
      <div className="first_line">
        <div className="play_all">
          <i className="iconfont">&#xe6e3;</i>
          <span>
            播放全部
            <span className="sum">
              (共
              {(currentAlbum.tracks && currentAlbum.tracks.length) || 0}
              首)
            </span>
          </span>
        </div>
        <div className="add_list">
          <i className="iconfont">&#xe62d;</i>
          <span>收藏({getCount(currentAlbum.subscribedCount)})</span>
        </div>
      </div>
      <SongList>
        {currentAlbum.tracks &&
          currentAlbum.tracks.map((item, index) => (
            <li key={`${item.al.name}_${index}`}>
              <span className="index">{index + 1}</span>
              <div className="info">
                <span>{item.name}</span>
                <span>
                  {getName(item.ar)} - {item.al.name}
                </span>
              </div>
            </li>
          ))}
      </SongList>
    </SongWrapper>
  );
  return (
    <CSSTransition
      in={showStatus}
      timeout={300}
      classNames="fly"
      appear={true}
      unmountOnExit
      // 页面离开钩子，在这边跳转路由才可以，否则在其他地方跳转，过渡动画不生效！！！
      onExited={props.history.goBack}
    >
      <Container>
        {enterLoading ? <Loading /> : null}
        <Header
          ref={headerRef}
          title={title}
          handleClick={handleBack}
          isMarquee={isMarquee}
        />
        {!isPlainObject(currentAlbum) ? (
          <Scroll bounceTop={false} onScroll={handleScroll}>
            <div>
              {renderTopDesc(currentAlbum)}
              {renderMenu()}
              {renderSongWrapper(currentAlbum)}
            </div>
          </Scroll>
        ) : null}
      </Container>
    </CSSTransition>
  );
}
const mapStateToProps = state => ({
  enterLoading: state.getIn(["album", "enterLoading"]),
  currentAlbum: state.getIn(["album", "currentAlbum"])
});
const mapDispatchToProps = dispatch => ({
  getAlbumDetailDispatch: id => dispatch(getAlbumDetail(id))
});
export default connect(mapStateToProps, mapDispatchToProps)(React.memo(Album));
