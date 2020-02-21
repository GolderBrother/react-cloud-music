import React, { forwardRef, useRef, useEffect, useImperativeHandle } from 'react';
import { MusicNoteWrapper } from './style';
import { getPrefixStyle } from '../../api/utils';

const MusicNote = forwardRef((props, ref) => {
    const iconRef = useRef();
    // 容器中有 3 个音符，也就是同时只能有 3 个音符下落
    const ICON_NUMBER = 3;

    const transformPrefix = getPrefixStyle('transform');

    // 原生 DOM 操作，包装了一个外层DOM, 返回一个 DOM 节点对象
    const createNode = (txt) => {
        const template = `<div className="icon_wrapper">${txt}</div>`;
        const tempNode = document.createElement('div');
        tempNode.innerHTML = template;
        return tempNode.firstChild;
    }

    const startAnimation = ({x, y}) => {
        for(let i = 0; i < ICON_NUMBER; i++) {
            const domArray = [].slice.call(iconRef.current.children);
            let item = domArray[i];
            // 选择一个空闲的元素来开始动画
            if(item.running === false) {
                item.style.left = x + 'px';
                item.style.top = y + 'px';
                item.style.display = 'inline-block';

                /* 解释下这边为什么要用定时器？

                因为目前元素的 display 虽然变为了 inline-block, 但是元素显示出来需要・浏览器的回流 过程，无法立即显示。 也就是说元素目前还是 隐藏 的，那么 元素的位置未知，导致 transform 失效
                用 setTimout 的本质将动画逻辑放到下一次的 宏任务。事实上，当本次的宏任务完成后， 会触发 浏览器 GUI 渲染线程 的重绘工作，然后才执行下一次宏任务，那么下一次宏任务中元素就显示了，transform 便能生效。 */
                setTimeout(() => {
                    item.running = true;
                    item.style[transformPrefix] = `translate3d(0, 750px, 0)`;
                    const icon = item.querySelector("div");
                    icon.style[transformPrefix] = 'translate3d(-40px, 0, 0)';
                }, 20);
                break;
            }
        }
    }

    // 暴露给外界的方法，挂载在ref对象上
    useImperativeHandle(ref, () => ({
        startAnimation
    }));

    useEffect(() => {
        for (let i = 0; i < ICON_NUMBER; i++) {
            const node = createNode(`<div class="iconfont">&#xe642;</div>`);
            iconRef.current.appendChild(node);
        }
        const domArray = [...iconRef.current.children];
        domArray.forEach(item => {
            item.running = false;
            item.addEventListener('transitionend', function(){
                this.style['display'] = 'none';
                this.style[transformPrefix] = `translate3d(0, 0, 0)`;
                this.running = false;
                const icon = this.querySelector('div');
                icon.style[transformPrefix] = `translate3d(0, 0, 0)`;
            }, false);
        });
        //eslint-disable-next-line
    }, []);
    return <MusicNoteWrapper ref={iconRef}></MusicNoteWrapper>
}, []);

export default React.memo(MusicNote);
