import React, { useState } from "react";
import Horizen from "../../baseUI/horizen-item";
import { categoryTypes, alphaTypes } from "../../api/config";
import { NavContainer } from "./style";
// 歌手列表组件
function Singers(props) {
  const [category, setCategory] = useState("");
  const [alpha, setAlpha] = useState("");
  const handleUpdateCategory = val => {
    setCategory(val);
  };
  const handleUpdateAlpha = val => {
    setAlpha(val);
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
    </div>
  );
}
export default React.memo(Singers);
