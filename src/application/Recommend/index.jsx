import React, { useEffect } from "react";
import { connect } from "react-redux";
import { forceCheck } from "react-lazyload";
import Slider from "../../components/slider";
import List from "../../components/list";
import Loading from "../../baseUI/loading";
import Scroll from "../../baseUI/scroll";
// better-scroll 的原理并不复杂，就是在容器元素高度固定，当子元素高度超过容器元素高度时，通过 transfrom 动画产生滑动效果，因此它的使用原则就是外部容器必须是固定高度，不然没法滚动。而 Content 就是这个外部容器
import { Content } from "./style";
import * as recommendActions from "./store/actions";
// 推荐组件
function Recommend(props) {
  const { bannerList, recommendList, enterLoading } = props;
  const { getBannerListDispatch, getRecommendListDispatch } = props;
  useEffect(() => {
    // 没有有数据才获取，有数据就不重新获取，减少请求损耗
    if (!bannerList.size) getBannerListDispatch();
    if (!recommendList.size) getRecommendListDispatch();
  }, []);

  const bannerListJS = bannerList ? bannerList.toJS() : [];
  const recommendListJS = recommendList ? recommendList.toJS() : [];
  // TODO test
  return (
    <Content>
      {/* 滑动的时候，如何让下面相应的图片显示 */}
      {/* 这样随着页面滑动，下面的图片会依次显示，没有任何问题 */}
      <Scroll className="list" onScroll={forceCheck}>
        <div>
          <Slider bannerList={bannerListJS} />
          <List recommendList={recommendListJS} />
        </div>
      </Scroll>
      {enterLoading ? <Loading /> : null}
    </Content>
  );
}

// 将redux的state映射到组件的props对象上
const mapStateToProps = state => ({
  // 不要在这里将数据 toJS
  // 不然每次 diff 比对 props 的时候都是不一样的引用，还是导致不必要的重渲染，属于滥用 immutable
  bannerList: state.getIn(["recommend", "bannerList"]),
  recommendList: state.getIn(["recommend", "recommendList"]),
  enterLoading: state.getIn(["recommend", "enterLoading"])
});

// 将redux的dispatch方法映射到组件的props对象上(方便用action)
const mapDispatchToProps = dispatch => ({
  getBannerListDispatch: () => dispatch(recommendActions.getBannerList()),
  getRecommendListDispatch: () => dispatch(recommendActions.getRecommendList())
});

// 将 ui 组件包装成容器组件
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(React.memo(Recommend));
