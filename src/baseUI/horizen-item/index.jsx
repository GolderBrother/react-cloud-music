import React, { useRef, useEffect } from "react";
import PropTypes from "prop-types";
import Scroll from "../scroll/index";
import { List, ListItem } from "./style";

// better-scroll 的 (横向) 滚动原理，首先外面容器要宽度固定，其次内容宽度要大于容器宽度。
function Horizen(props) {
  // 分类栏外部div的dom
  const CategoryRef = useRef(null);
  const { list = [], selectedVal = "", title = "" } = props;
  const { handleClick = () => {} } = props;

  // 初始化内容宽度
  useEffect(() => {
    // 获取子元素宽度的总和并复制给外部容器
    const categoryDOM = CategoryRef.current;
    const tagElements = categoryDOM.querySelectorAll("span");
    let totalWidth = 0;
    Array.from(tagElements).forEach(tagDOM => {
      totalWidth += Number(tagDOM.offsetWidth);
    });
    categoryDOM.style.width = `${totalWidth}px`;
  }, []);
  // TODO 整个列表不能滚动
  return (
    <Scroll direction={"horizental"}>
      <div ref={CategoryRef}>
        <List>
          <span>{title}</span>
          {list.map((item, index) => (
            <ListItem
              key={`${item.key}_${index}`}
              className={selectedVal === item.key ? "selected" : ""}
              onClick={() => {
                handleClick(item.key);
              }}
            >
              {item.name}
            </ListItem>
          ))}
        </List>
      </div>
    </Scroll>
  );
}

Horizen.propTypes = {
  list: PropTypes.array, // 为接受的列表数据
  selectedVal: PropTypes.string, // 为当前选中的 item 值
  title: PropTypes.string, // 为列表左边的标题
  handleClick: PropTypes.func // 为点击不同的 item 执行的方法
};

Horizen.defaultProps = {
  list: [],
  selectedVal: "",
  title: "",
  handleClick: () => {}
};

export default React.memo(Horizen);
