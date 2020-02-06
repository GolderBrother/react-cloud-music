import React from "react";
import { renderRoutes } from "react-router-config";
// 利用 NavLink 组件进行路由跳转 最终会渲染成a标签
import { NavLink } from "react-router-dom";
import { Top, Tab, TabItem } from "./style.js";
function Home(props) {
  const { route } = props;
  return (
    <section className="home">
      <Top>
        <span className="iconfont menu">&#xe65c;</span>
        <span className="title">WebApp</span>
        <span className="iconfont search">&#xe62b;</span>
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
      {renderRoutes(route.routes)}
    </section>
  );
}
export default React.memo(Home);
