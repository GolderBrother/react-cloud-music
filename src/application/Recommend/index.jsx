import React from "react";
import Slider from "../../components/slider";
import List from "../../components/list";
import Scroll from "../../baseUI/scroll";
// better-scroll 的原理并不复杂，就是在容器元素高度固定，当子元素高度超过容器元素高度时，通过 transfrom 动画产生滑动效果，因此它的使用原则就是外部容器必须是固定高度，不然没法滚动。而 Content 就是这个外部容器
import { Content } from "./style";
// 推荐组件
function Recommend(props) {
  //mock 数据
  const bannerList = [1, 2, 3, 4].map(item => ({
    imageUrl:
      "http://p1.music.126.net/ZYLJ2oZn74yUz5x8NBGkVA==/109951164331219056.jpg"
  }));
  let list = [],
    i = 1;
  while (i++ < 11) {
    list.push(i);
  }
  const recommendList = list.map(item => ({
    id: item,
    picUrl:
      "https://p1.music.126.net/fhmefjUfMD-8qtj3JKeHbA==/18999560928537533.jpg",
    playCount: 17171122,
    name: "朴树、许巍、李健、郑钧、老狼、赵雷"
  }));
  return (
    <Content>
      <Scroll className="list">
        <div>
          <Slider bannerList={bannerList} />
          <List recommendList={recommendList} />
        </div>
      </Scroll>
    </Content>
  );
}
export default React.memo(Recommend);
