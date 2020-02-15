import React, { useEffect } from "react";
import { getRankList } from "./store/index";
import { connect } from "react-redux";
import { filterIndex, findRankNO } from "../../api/utils";
import { Container, List, ListItem, SongList } from "./style";
import Scroll from "../../baseUI/scroll";
import { renderRoutes } from "react-router-config";
import { EnterLoading } from "../Singers/style";
import Loading from "../../baseUI/loading";
// 排行榜组件
function Rank(props) {
  // 属性和方法分开写
  console.log("props", props);
  const { rankList: list, loading } = props;
  const { getRankListDispatch } = props;
  const rankList = list ? list.toJS() : [];
  useEffect(() => {
    setTimeout(() => {
      if (!rankList.length) getRankListDispatch();
    });
    // eslint-disable-next-line
  }, []);
  // 排行榜单分为两个部分，一部分是官方榜，另一部分是全球榜。官方榜单数据有 tracks 数组，存放部分歌曲信息，而全球榜没
  const globalStartIndex = filterIndex(rankList);
  // 官方榜
  const officialList = rankList.slice(0, globalStartIndex);
  // 全球榜
  const globalList = rankList.slice(globalStartIndex);
  const enterDetail = name => () => {
    const rankKey = findRankNO(name);
    if (rankKey === null) {
      alert("暂无相关数据");
      return;
    }
  };
  const renderSongList = list => {
    return list && list.length ? (
      <SongList>
        {list.map((item, index) => (
          <li key={index}>
            {index + 1}. {item.first} - {item.second}
          </li>
        ))}
      </SongList>
    ) : null;
  };
  const renderRankList = (list, globalRank) => {
    return (
      <List globalRank={globalRank}>
        {list &&
          list.map((item, index) => (
            <ListItem
              key={`${item.coverImgId}_${index}`}
              tracks={item.tracks}
              onClick={enterDetail(item.name)}
            >
              <div className="img_wrapper">
                <img src={item.coverImgUrl} alt="" />
                <div className="decorate"></div>
                <span className="update_frequecy">{item.updateFrequency}</span>
              </div>
              {renderSongList(item.tracks)}
            </ListItem>
          ))}
      </List>
    );
  };
  // 榜单数据未加载出来之前都给隐藏
  const displayStyle = loading
    ? { display: "none" }
    : { display: "" };
  return (
    <Container>
      <Scroll>
        <div>
          <h1 className="offical" style={displayStyle}>
            官方榜
          </h1>
          {renderRankList(officialList)}
          <h1 className="global" style={displayStyle}>
            全球榜
          </h1>
          {renderRankList(globalList, true)}
        </div>
        {loading ? (
          <EnterLoading>
            <Loading></Loading>
          </EnterLoading>
        ) : null}
      </Scroll>
      {renderRoutes(props.route.routes)}
    </Container>
  );
}
// 映射Redux全局的state到组件的props上
const mapStateToProps = state => ({
  rankList: state.getIn(["rank", "rankList"]),
  loading: state.getIn(["rank", "loading"])
});

// 映射Redux全局的dispatch方法到组件的props上
const mapDispatchToProps = dispatch => ({
  getRankListDispatch() {
    dispatch(getRankList());
  }
});
export default connect(mapStateToProps, mapDispatchToProps)(React.memo(Rank));
