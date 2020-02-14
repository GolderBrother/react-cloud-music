import React, { useState, useCallback, useRef } from "react";
import { Container, TopDesc, Menu, SongWrapper, SongList } from "./style";
import { CSSTransition } from "react-transition-group";
import Header from "../../baseUI/header";
import Scroll from "../../baseUI/scroll";
import GlobalStyle from '../../assets/global-style';
// import { getName } from '../../api/utils';
export const HEADER_HEIGHT = 45;
function Album(props) {
  const [title, setTitle] = useState("歌单");
  const [showStatus, setShowStatus] = useState(true);
  const [isMarquee, setIsMarquee] = useState(false); // 是否开启跑马灯
  //mock 数据
  const currentAlbum = {
    creator: {
      avatarUrl:
        "http://p1.music.126.net/O9zV6jeawR43pfiK2JaVSw==/109951164232128905.jpg",
      nickname: "浪里推舟"
    },
    coverImgUrl:
      "http://p2.music.126.net/ecpXnH13-0QWpWQmqlR0gw==/109951164354856816.jpg",
    subscribedCount: 2010711,
    name: "听完就睡，耳机是天黑以后柔软的梦境",
    tracks: [
      {
        name: "我真的受伤了",
        ar: [{ name: "张学友" }, { name: "周华健" }],
        al: {
          name: "学友 热"
        }
      },
      {
        name: "我真的受伤了",
        ar: [{ name: "张学友" }, { name: "周华健" }],
        al: {
          name: "学友 热"
        }
      },
      {
        name: "我真的受伤了",
        ar: [{ name: "张学友" }, { name: "周华健" }],
        al: {
          name: "学友 热"
        }
      },
      {
        name: "我真的受伤了",
        ar: [{ name: "张学友" }, { name: "周华健" }],
        al: {
          name: "学友 热"
        }
      },
      {
        name: "我真的受伤了",
        ar: [{ name: "张学友" }, { name: "周华健" }],
        al: {
          name: "学友 热"
        }
      },
      {
        name: "我真的受伤了",
        ar: [{ name: "张学友" }, { name: "周华健" }],
        al: {
          name: "学友 热"
        }
      },
      {
        name: "我真的受伤了",
        ar: [{ name: "张学友" }, { name: "周华健" }],
        al: {
          name: "学友 热"
        }
      },
      {
        name: "我真的受伤了",
        ar: [{ name: "张学友" }, { name: "周华健" }],
        al: {
          name: "学友 热"
        }
      },
      {
        name: "我真的受伤了",
        ar: [{ name: "张学友" }, { name: "周华健" }],
        al: {
          name: "学友 热"
        }
      },
      {
        name: "我真的受伤了",
        ar: [{ name: "张学友" }, { name: "周华健" }],
        al: {
          name: "学友 热"
        }
      }
    ]
  };
  const headerElement = useRef();
  const handleScroll = pos => {
    const minScrollY = -HEADER_HEIGHT;
    const percent = Math.abs(pos.y/minScrollY);
    const headerDom = headerElement.current;
    // 滑过顶部的高度开始变化
    if(pos.y < minScrollY) {
      headerDom.style.backgroundColor = GlobalStyle['theme-color'];
      headerDom.style.opacity = Math.min(1, (percent - 1) / 2);
      setTitle(currentAlbum.name);
      setIsMarquee(true);
    }else {
      headerDom.style.backgroundColor = "";
      headerDom.style.opacity = 1;
      setTitle("歌单");
      setIsMarquee(false);
    }
  }

  const handleBack = useCallback(() => {
    // 为什么不是直接在 handleBack 里面直接跳转路由呢？
    // 当你点击后，执行路由跳转逻辑，这个时候路由变化，当前的组件会被立即卸载，相关的动画当然也就不复存在了。最后的解决方案就是，先让页面切出动画执行一次，然后在动画执行完的瞬间跳转路由，这就达到我们的预期了。
    setShowStatus(false);
  }, []);
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
        <Header ref={headerElement} title={title} handleClick={handleBack} isMarquee={isMarquee} />
        <Scroll bounceTop={false} onScroll={handleScroll}>
          <div>
            <TopDesc background={currentAlbum.coverImgUrl}>
              <div className="background">
                <div className="filter"></div>
              </div>
              <div className="img_wrapper"></div>
              <div className="desc_wrapper">
                <div className="title"></div>
                <div className="person">
                  <div className="avatar">
                    <img src="" alt="" />
                  </div>
                  <div className="name"></div>
                </div>
              </div>
            </TopDesc>
            <Menu>
              <div>
                <i class="iconfont">&#xe6ad;</i>评论
              </div>
              <div>
                <i class="iconfont">&#xe86f;</i>点赞
              </div>
              <div>
                <i class="iconfont">&#xe62d;</i>收藏
              </div>
              <div>
                <i class="iconfont">&#xe606;</i>更多
              </div>
            </Menu>
            <SongWrapper>
              <div className="first_line">
                <div className="play_all">
                  <iconfont></iconfont>
                  <span>
                    <span className="sum"></span>
                  </span>
                </div>
                <div class="add_list">
                  <i class="iconfont">&#xe62d;</i>
                  <span>收藏(0.4万)</span>
                </div>
              </div>
              <SongList>
                <li>
                  <span class="index">1</span>
                  <div class="info">
                    <span>零几年听的情歌</span>
                    <span>AY楊佬叁 - 零几年听的情歌</span>
                  </div>
                </li>
              </SongList>
            </SongWrapper>
          </div>
        </Scroll>
      </Container>
    </CSSTransition>
  );
}
export default React.memo(Album);
