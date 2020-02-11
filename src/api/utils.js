/**
 * 计数
 * @param {number} count 
 */
export const getCount = (count = 0) => {
    count = Number(count);
    if (count < 0) return '';
    if (count < 10000) {
        return String(count);
    } else if (Math.floor(count / 10000) < 10000) {
        return Math.floor(count / 1000) / 10 + '万';
    } else {
        return Math.floor(count / 10000000) / 10 + '亿';
    }
}

// 防抖函数: 一段时间内触发多次,只执行最后一次,因为还没到规定时间内触发的,就清空定时器
export function debounce(func, delay = 300){
    let timer;
    return function(){
        if(timer) clearTimeout(timer);
        timer = setTimeout(() => {
            func.apply(this, [...arguments]);
            clearTimeout(timer);
        }, delay);
    }
}