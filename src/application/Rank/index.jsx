import React, { useEffect } from "react";
import { getRankList } from "./store/index";
import { connect } from "react-redux";
import { filterIndex } from "../../api/utils";
import { Container, List, ListItem } from "./style";
import Scroll from "../../baseUI/scroll";
import { renderRoutes } from "react-router-config";
// 排行榜组件
function Rank(props) {
  // 属性和方法分开写
  const { rankList: list, loading } = props;
  const { getRankListDispatch } = props;
  const rankList = list ? list.toJS() : [];
  useEffect(() => {
    if (!rankList || !rankList.length) getRankListDispatch();
  }, []);
  // TODO 有问题 目前数据为空
  console.log('rankList', rankList);
  // 排行榜单分为两个部分，一部分是官方榜，另一部分是全球榜。官方榜单数据有 tracks 数组，存放部分歌曲信息，而全球榜没
  const globalStartIndex = filterIndex(rankList);
  // 官方榜
  const officialList = rankList.slice(0, globalStartIndex);
  // 全球榜
  const globalList = rankList.slice(globalStartIndex);
  console.log('officialList', officialList);
  console.log('globalList', globalList);
  const enterDetail = name => () => {
    console.log("enterDetail name", name);
  };
  const renderSongList = list => {
    return list && list.length
      ? list.map((item, index) => (
          <li key={index}>
            {index + 1}. {item.first} - {item.second}
          </li>
        ))
      : null;
  };
  const renderRankList = (list, _global) => {
    return (
      <List>
        {list &&
          list.map(item => (
            <ListItem
              key={item.coverImgId}
              tracks={item.tracks}
              onClick={enterDetail(item.name)}
            >
              <div className="img_wrapper">
                <img src={item.coverImgUrl} alt="" />
                <div class="decorate"></div>
                <span class="update_frequecy">{item.updateFrequency}</span>
              </div>
              {renderSongList(item.tracks)}
            </ListItem>
          ))}
      </List>
    );
  };
  // 榜单数据未加载出来之前都给隐藏
  const displayStyle = loading ? { display: "none" } : { display: "visibility" };
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
      </Scroll>
      {renderRoutes(props.route.routes)}
    </Container>
  );
}
const mapStateToProps = state => ({
  rankList: state.getIn(["rank", "ranklist"]),
  loading: state.getIn(["rank", "loading"])
});

const mapDispatchToProps = dispatch => ({
  getRankListDispatch: () => {
    dispatch(getRankList());
  }
});
export default connect(mapStateToProps, mapDispatchToProps)(React.memo(Rank));
