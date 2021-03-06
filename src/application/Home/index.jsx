import React from "react";
import { renderRoutes } from "react-router-config";
// 利用 NavLink 组件进行路由跳转 最终会渲染成a标签
import { NavLink } from "react-router-dom";
import { Top, Tab, TabItem } from "./style.js";
import Player from '../Player';
function Home(props) {
  const { route } = props;
  const handleClickMore = () => {
    alert('客官稍等，小二正在赶来的路上...');
  }
  return (
    <section className="home">
      <Top>
        <span className="iconfont menu" onClick={handleClickMore}>&#xe65c;</span>
        <span className="title">云音乐</span>
        <span className="iconfont search" onClick={() => props.history.push("/search")}>&#xe62b;</span>
      </Top>
      <Tab>
        <NavLink to={"/recommend"} activeClassName="selected">
          <TabItem>
            <span>推荐</span>
          </TabItem>
        </NavLink>
        <NavLink to={"/singers"} activeClassName="selected">
          <TabItem>
            <span>歌手</span>
          </TabItem>
        </NavLink>
        <NavLink to={"/rank"} activeClassName="selected">
          <TabItem>
            <span>排行榜</span>
          </TabItem>
        </NavLink>
      </Tab>
      <Player></Player>
      {renderRoutes(route.routes)}
    </section>
  );
}
export default React.memo(Home);
