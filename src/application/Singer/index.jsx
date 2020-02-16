import React, { useState, useCallback, useEffect, useRef } from "react";
import Header from "../../baseUI/header";
import Scroll from "../../baseUI/scroll";
import SongList from "../SongList";
import { Container, ImgWrapper, CollectButton, BgLayer, SongListWrapper } from "./style";
import { CSSTransition } from "react-transition-group";
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

  const setShowStatusFalse = useCallback(() => {
    setShowStatus(false);
  }, []);
  // mock data
  const artist = {
    picUrl:
      "https://p2.music.126.net/W__FCWFiyq0JdPtuLJoZVQ==/109951163765026271.jpg",
    name: "薛之谦",
    hotSongs: [
      {
        name: "我好像在哪见过你1",
        ar: [{ name: "薛之谦" }],
        al: {
          name: "薛之谦专辑"
        }
      },
      {
        name: "我好像在哪见过你2",
        ar: [{ name: "薛之谦" }],
        al: {
          name: "薛之谦专辑"
        }
      },
      {
        name: "我好像在哪见过你3",
        ar: [{ name: "薛之谦" }],
        al: {
          name: "薛之谦专辑"
        }
      },
      {
        name: "我好像在哪见过你4",
        ar: [{ name: "薛之谦" }],
        al: {
          name: "薛之谦专辑"
        }
      },
      {
        name: "我好像在哪见过你5",
        ar: [{ name: "薛之谦" }],
        al: {
          name: "薛之谦专辑"
        }
      },
      {
        name: "我好像在哪见过你6",
        ar: [{ name: "薛之谦" }],
        al: {
          name: "薛之谦专辑"
        }
      }
    ]
  };
  useEffect(() => {
    const imgOffsetHeight = imgWrapperRef && imgWrapperRef.current && imgWrapperRef.current.offsetHeight;
    initialHeight.current = imgOffsetHeight;
    // 歌曲列表和遮罩的高度一致。把遮罩先放在下面，以裹住歌曲列表
    bgLayerRef.current.style.top = songListWrapperRef.current.style.top = `${imgOffsetHeight - OFFSET}px`;
    //eslint-disable-next-line
    scrollRef.current.refresh();
  }, []);
  return (
    <CSSTransition
      in={showStatus}
      timeout={300}
      appear={true}
      classNames="fly"
      unmountOnExit
      onExited={() => props.history.goBack()}
    >
      <Container>
        <Header title={artist.name} ref={headerRef} handleClick={setShowStatusFalse}></Header>
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
            <Scroll ref={scrollRef}>
              <SongList
                songs={artist.hotSongs}
                showCollect={false}
              ></SongList>
            </Scroll>
        </SongListWrapper>
      </Container>
    </CSSTransition>
  );
}
export default React.memo(Singer);
