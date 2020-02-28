import React, {
  useState,
  useEffect,
  useRef,
  useMemo,
  useImperativeHandle,
  memo,
  forwardRef
} from "react";
import BetterScroll from "better-scroll";
import { ScrollContainer, PullUpLoading, PullDownLoading } from "./style";
import PropTypes from "prop-types";
import Loading from "../loading/index";
import LoadingV2 from "../loadingV2/index";
import { debounce } from "../../api/utils";
const Scroll = forwardRef((props, ref) => {
  //better-scroll 实例对象
  const [bScroll, setBScroll] = useState(null);
  //current 指向初始化 bs 实例需要的 DOM 元素
  const scrollContaninerRef = useRef();
  // 属性和方法区分开来
  const {
    direction,
    click,
    refresh,
    pullUpLoading,
    pullDownLoading,
    bounceTop,
    bounceDown
  } = props;
  const { onScroll, pullUp, pullDown } = props;
  // 千万注意，这里不能省略依赖，
  // 不然拿到的始终是第一次 pullUp 函数的引用，相应的闭包作用域变量都是第一次的，产生闭包陷阱。下同。
  // 加了依赖后,每次更新才是新的引用,否则一直没变化
  // 这样当我们频繁上拉下拉的时候就不会频繁触发回调了
  const pullUpDebounce = useMemo(() => {
    return debounce(pullUp, 300);
  }, [pullUp]);
  const pullDownDebounce = useMemo(() => {
    return debounce(pullDown, 300);
  }, [pullDown]);
  
  useEffect(() => {
    // 初始化BetterScroll
    const bScroll = new BetterScroll(scrollContaninerRef.current, {
      scrollX: direction === "horizental",
      scrollY: direction === "vertical",
      probeType: 3,
      click,
      bounce: {
        top: bounceTop,
        down: bounceDown
      }
    });
    setBScroll(bScroll);
    return () => {
      setBScroll(null);
    };
    //eslint-disable-next-line
  }, []);

  // 给实例绑定 scroll 事件
  useEffect(() => {
    if (!bScroll || !onScroll) return;
    bScroll.on("scroll", scroll => {
      onScroll(scroll);
    });
    return () => {
      bScroll.off("scroll", onScroll);
    };
  }, [bScroll, onScroll]);

  // 进行上拉到底的判断，调用上拉刷新的函数
  useEffect(() => {
    if (!bScroll || !pullUp) return;
    // 监听滑动到底部事件(上拉加载)
    const handlePullUp = () => {
      // 判断是否滑动到了底部
      if (bScroll.y <= bScroll.maxScrollY + 100) {
        pullUpDebounce();
      }
    }
    bScroll.on("scrollEnd", handlePullUp);
    return () => {
      // 组件销毁后移除监听
      bScroll.off("scrollEnd");
    };
  }, [bScroll, pullUp, pullUpDebounce]);

  // 进行下拉的判断，调用下拉刷新的函数
  useEffect(() => {
    if (!bScroll || !pullDown) return;
    // 监听下拉事件(下拉刷新)
    const handlePullDown = () => {
      // 判断是否下拉了一段距离
      if (bScroll.y > 50) {
        pullDownDebounce();
      }
    };
    bScroll.on("touchEnd", handlePullDown);
    return () => {
      // 组件销毁后移除监听
      bScroll.off("touchEnd");
    };
  }, [bScroll, pullDown, pullDownDebounce]);

  // 每次重新渲染都要刷新实例，防止无法滑动
  useEffect(() => {
    if (refresh && bScroll) {
      bScroll.refresh && bScroll.refresh();
    }
  });

  // 为了给上级组件暴露DOM和方法,因为函数式组件天生不具备被上层组件直接调用 ref 的条件
  // 一般和 forwardRef 一起使用，ref 已经在 forWardRef 中默认传入
  useImperativeHandle(ref, () => ({
    // 给外界暴露 refresh 方法
    refresh() {
      if (bScroll) {
        bScroll.refresh();
        bScroll.scrollTo(0, 0);
      }
    },
    // 给外界暴露 getBScroll 方法，提供 betterScroll 实例
    getBScroll() {
      if (bScroll) {
        return bScroll;
      }
    }
  }));
  const PullUpDisplayStyle = pullUpLoading
    ? { display: "" }
    : { display: "none" };
  const PullDownDisplayStyle = pullDownLoading
    ? { display: "" }
    : { display: "none" };
  return (
    <ScrollContainer ref={scrollContaninerRef}>
      {props.children}
      {/* 滑到底部加载动画(上拉加载) */}
      <PullUpLoading style={PullUpDisplayStyle}>
        <Loading></Loading>
      </PullUpLoading>
      {/* 顶部向下滑动画(下拉刷新) */}
      <PullDownLoading style={PullDownDisplayStyle}>
        <LoadingV2></LoadingV2>
      </PullDownLoading>
    </ScrollContainer>
  );
});
Scroll.propTypes = {
  direction: PropTypes.oneOf(["vertical", "horizental"]),
  click: PropTypes.bool, // 是否支持点击
  refresh: PropTypes.bool, // 是否支持刷新
  onScroll: PropTypes.func, // 滑动触发的回调函数
  pullUp: PropTypes.func, // 上拉加载逻辑
  pullDown: PropTypes.func, // 下拉加载逻辑
  pullUpLoading: PropTypes.bool, // 是否显示上拉 loading 动画
  pullDownLoading: PropTypes.bool, // 是否显示下拉 loading 动画
  bounceTop: PropTypes.bool, // 是否支持向上吸顶
  bounceDown: PropTypes.bool // 是否支持向下吸顶
};
Scroll.defaultProps = {
  direction: "vertical",
  click: true,
  refresh: true, // 是否支持点击
  onScroll: function() {}, // 滑动触发的回调函数
  pullUp: function() {}, // 上拉加载逻辑
  pullDown: function() {}, // 下拉加载逻辑
  pullUpLoading: false, // 是否显示上拉 loading 动画
  pullDownLoading: false, // 是否显示下拉 loading 动画
  bounceTop: true, // 是否支持向上吸顶
  bounceDown: true // 是否支持向下吸顶
};
export default memo(Scroll);
