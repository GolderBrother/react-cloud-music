import React, { useState, useEffect } from "react";
import Horizen from "../../baseUI/horizen-item";
import Scroll from "../../baseUI/scroll";
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
// 歌手列表组件
function Singers(props) {
  // 分类
  const [category, setCategory] = useState("");
  // 首字母category
  const [alpha, setAlpha] = useState("");
  const { getHotSingerListDispatch, updateDispatch } = props;
  const handleUpdateCategory = val => {
    setCategory(val);
    updateDispatch(val, alpha);
  };
  const handleUpdateAlpha = val => {
    setAlpha(val);
    updateDispatch(category, val);
  };
  const singerList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(item => ({
    picUrl:
      "https://p2.music.126.net/uTwOm8AEFFX_BYHvfvFcmQ==/109951164232057952.jpg",
    name: "隔壁老樊",
    accountId: 277313426
  }));
  useEffect(() => {
    getHotSingerListDispatch();
  }, []);
  // 渲染歌手列表数据
  const renderSingerList = () => {
    return (
      <List>
        {singerList.map((item, index) => (
          <ListItem key={`${item.accountId}_${index}`}>
            <div className="img_wrapper">
              <img
                src={`${item.picUrl}?param=300x300`}
                width="100%"
                height="100%"
                alt="music"
              />
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
        <Scroll>{renderSingerList()}</Scroll>
      </ListContainer>
    </div>
  );
}
const mapStateToProps = state => ({
  // 不要在这里将数据 toJS, 因为每次 toJS 都产生不一样的引用
  // 不然每次 diff 比对 props 的时候都是不一样的引用，还是导致不必要的重渲染，属于滥用 immutable
  singerList: state.getIn("singers", "singerList"),
  enterLoading: state.getIn("singers", "enterLoading"),
  pullUpLoading: state.getIn("singers", "pullUpLoading"),
  pullDownLoading: state.getIn("singers", "pullDownLoading"),
  pageCount: state.getIn("singers", "pageCount")
});
const mapDispatchToProps = dispatch => ({
  getHotSingerListDispatch: () => {
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
