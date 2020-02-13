import React from "react";
import LazyLoad from 'react-lazyload';  
import { ListWrapper, List, ListItem } from "./style";
import { getCount } from '../../api/utils';
import { withRouter } from 'react-router-dom';
function RecommendList(props) {
  const { recommendList = [] } = props;
  // 进入详情页
  const enterDetail = (id) => {
    props.history.push(`/recommend/${id}`);
  };
  return (
    <ListWrapper>
      <h1 className="title"> 推荐歌单 </h1>
      <List>
        {recommendList &&
          recommendList.map((item, index) => (
            <ListItem key={item.id + index} onClick={() => enterDetail(item.id)}>
              <div className="img_wrapper">
                {/* 给图片上的图标和文字提供一个遮罩 */}
                <div className="decorate"></div>
                {/* 加此参数可以减小请求的图片资源大小 */}
                {/* img 标签外部包裹一层 LazyLoad */}
                <LazyLoad placeholder={<img width="100%" height="100%" src={require('./imgs/music.png')} alt="music" />}>
                  <img
                    src={`${item.picUrl}?param=300x300`}
                    className="re-img"
                    width="100%"
                    height="100%"
                    alt="music"
                  />
                </LazyLoad>
                <div className="play_count">
                  <i className="iconfont play">&#xe885;</i>
                  <span className="count">{getCount(item.playCount)}</span>
                </div>
              </div>
              <div className="desc">{item.name}</div>
            </ListItem>
          ))}
      </List>
    </ListWrapper>
  );
}
// memo跟pureComponent的区别在于只比对props, 不比对state
// withRouter 为了获取history变量
export default React.memo(withRouter(RecommendList));
