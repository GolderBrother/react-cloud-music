import React, { useState, useEffect, useContext } from "react";
import LazyLoad, { forceCheck } from "react-lazyload";
import Horizen from "../../baseUI/horizen-item";
import Scroll from "../../baseUI/scroll";
import Loading from "../../baseUI/loading";
import { categoryTypes, alphaTypes } from "../../api/config";
import { NavContainer, ListContainer, List, ListItem } from "./style";
import {
  getHotSingerList,
  getSingerListByCate,
  changePageCount,
  changeEnterLoading,
  changePullUpLoading,
  refreshMoreHotSingerList,
  refreshMoreSingerListByCate,
  changePullDownLoading
} from "./store/actions";
import { connect } from "react-redux";
import { renderRoutes } from 'react-router-config';
import { CategoryDataContext, changeCategory, changeAlpha } from "./data";
// 歌手列表组件
function Singers(props) {
  const { data, dispatch } = useContext(CategoryDataContext);
  const { category, alpha } = (data && data.toJS()) || {};
  // 分类
  // const [category, setCategory] = useState("");
  // 首字母category
  // const [alpha, setAlpha] = useState("");
  const {
    enterLoading = false,
    singerList = [],
    pageCount = 0,
    pullUpLoading,
    pullDownLoading
  } = props;
  const {
    getHotSingerListDispatch,
    updateDispatch,
    pullUpRefreshDispatch,
    pullDownRefreshDispatch
  } = props;
  const handleUpdateCategory = val => {
    // setCategory(val);
    dispatch(changeCategory(val));
    updateDispatch(val, alpha);
  };
  const handleUpdateAlpha = val => {
    // setAlpha(val);
    dispatch(changeAlpha(val));
    updateDispatch(category, val);
  };

  useEffect(() => {
    // 增加判断逻辑，等歌手列表不为空时，就不发请求，同时记忆之前的分类
    if(!singerList.size) {
      getHotSingerListDispatch();
    }
  }, []);

  const handlePullUp = () => {
    const hot = category === "";
    pullUpRefreshDispatch(category, alpha, hot, pageCount);
  };
  const handlePullDown = () => {
    pullDownRefreshDispatch(category, alpha);
  };
  // 进入详情页
  const enterDetail = (id) => {
    props.history.push(`/singers/${id}`)
  }
  // 渲染歌手列表数据
  const renderSingerList = () => {
    const singerListJS = singerList.toJS();
    return (
      <List>
        {singerListJS &&
          singerListJS.map((item, index) => (
            <ListItem key={`${item.accountId}_${index}`} onClick={() => enterDetail(item.id)}>
              <div className="img_wrapper">
                <LazyLoad
                  placeholder={
                    <img
                      src={require("./imgs/singer.png")}
                      width="100%"
                      height="100%"
                      alt="img"
                    />
                  }
                >
                  <img
                    src={`${item.picUrl}?param=300x300`}
                    width="100%"
                    height="100%"
                    alt="music"
                  />
                </LazyLoad>
              </div>
              <span className="name">{item.name}</span>
            </ListItem>
          ))}
      </List>
    );
  };
  return (
    <div>
      <NavContainer>
        <Horizen
          list={categoryTypes}
          title={"分类 (默认热门):"}
          handleClick={handleUpdateCategory}
          selectedVal={category}
        />
        <Horizen
          list={alphaTypes}
          title={"首字母:"}
          selectedVal={alpha}
          handleClick={handleUpdateAlpha}
        ></Horizen>
      </NavContainer>
      <ListContainer>
        <Scroll
          onScroll={forceCheck}
          pullUpLoading={pullUpLoading}
          pullDownLoading={pullDownLoading}
          pullUp={handlePullUp}
          pullDown={handlePullDown}
        >
          {renderSingerList()}
        </Scroll>
        <Loading show={enterLoading} />
      </ListContainer>
      {/* 渲染子路由 */}
      {renderRoutes(props.route.routes)}
    </div>
  );
}
const mapStateToProps = state => ({
  // 不要在这里将数据 toJS, 因为每次 toJS 都产生不一样的引用
  // 不然每次 diff 比对 props 的时候都是不一样的引用，还是导致不必要的重渲染，属于滥用 immutable
  singerList: state.getIn(["singers", "singerList"]),
  enterLoading: state.getIn(["singers", "enterLoading"]),
  pullUpLoading: state.getIn(["singers", "pullUpLoading"]),
  pullDownLoading: state.getIn(["singers", "pullDownLoading"]),
  pageCount: state.getIn(["singers", "pageCount"])
});
const mapDispatchToProps = dispatch => ({
  getHotSingerListDispatch() {
    dispatch(getHotSingerList());
  },
  updateDispatch(category, alpha) {
    dispatch(changePageCount(0)); //由于改变了分类，所以pageCount清零
    dispatch(changeEnterLoading(true)); // 显示loading等待
    dispatch(getSingerListByCate(category, alpha)); //第一次加载对应类别的歌手
  },
  // 上拉加载更多数据(category, alpha, hot, count)
  pullUpRefreshDispatch(category, alpha, hot, count) {
    dispatch(changePullUpLoading(true));
    dispatch(changePageCount(count++));
    if (hot) {
      dispatch(refreshMoreHotSingerList());
    } else {
      dispatch(refreshMoreSingerListByCate(category, alpha));
    }
  },
  // 顶部下拉刷新
  pullDownRefreshDispatch(category = "", alpha = "") {
    dispatch(changePullDownLoading(true));
    dispatch(changePageCount(0)); //下拉刷新属于重新获取数据
    if (category === "" && alpha === "") {
      dispatch(getHotSingerList());
    } else {
      dispatch(getSingerListByCate(category, alpha));
    }
  }
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(React.memo(Singers));
