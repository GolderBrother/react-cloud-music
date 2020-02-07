import React from "react";
import Slider from "../../components/slider";
import List from "../../components/list";
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
    <div>
      <Slider bannerList={bannerList} />
      <List recommendList={recommendList} />
    </div>
  );
}
export default React.memo(Recommend);
