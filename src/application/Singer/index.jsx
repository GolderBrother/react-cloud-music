import React, { useState, useCallback, useEffect, useRef } from "react";
import Header from "../../baseUI/header";
import Scroll from "../../baseUI/scroll";
import SongList from "../SongList";
import { Container } from "./style";
import { CSSTransition } from "react-transition-group";
function Singer(props) {
  const [showStatus, setShowStatus] = useState(true);
  // 图片初始高度
  const initialHeight = useRef(0);
  // 往上偏移的尺寸，露出圆角
  const OFFSET = 5;
  const header = useRef();
  
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
        <Header title={artist.name} ref={header} handleClick={setShowStatusFalse}></Header>
        <ImgWrapper bgUrl={artist.bgUrl}>
            <div class="filter"></div>
        </ImgWrapper>
        <CollectButton>
          <i className="iconfont">&#xe62d;</i>
          <span className="text"> 收藏 </span>
        </CollectButton>
        <BgLayer></BgLayer>
        <SongListWrapper>
            {/* 歌手列表，需要引用歌单详情(Album)的歌曲列表组件 */}
            <Scroll>
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
