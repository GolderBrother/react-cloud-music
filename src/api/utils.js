import {
    RankTypes
} from './config';
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
export function debounce(func, delay = 300) {
    let timer;
    return function () {
        if (timer) clearTimeout(timer);
        timer = setTimeout(() => {
            func.apply(this, [...arguments]);
            clearTimeout(timer);
        }, delay);
    }
}

// 处理数据，找出第一个没有歌名的排行榜的索引
export function filterIndex(rankList = []) {
    for (let i = 0, len = rankList.length; i < len; i++) {
        if (rankList[i].tracks.length && !rankList[i + 1].tracks.length) {
            return i + 1;
        }
    }
}

// 根据name查找排行榜的编号
export function findRankNO(name) {
    for (const key in RankTypes) {
        if (RankTypes[key] === name) return key
    }
    return null;
}

// 处理歌手列表拼接歌手名字
export const getName = (list = []) => {
    let str = "";
    list.forEach((item, index) => {
        str += index === 0 ? item.name : "/" + item.name;
        // return item;
    });
    return str;
}

/**
 * 判断是否为空对象
 * @param {*} obj 对象
 */
export const isEmptyObject = obj => !obj || Object.keys(obj).length === 0;

/**
 * 获取样式的浏览器厂商前缀
 * @param {*} style 
 */
export function getPrefixStyle(style){
    const elementStyle = document.createElement('div').style;
    const vendor = (() => {
         // 首先通过 transition 属性判断是何种浏览器
      let transformNames = {
        webkit: "webkitTransform",
        Moz: "MozTransform",
        O: "OTransfrom",
        ms: "msTransform",
        standard: "Transform"
      };
      for (const key in transformNames) {
          if (transformNames.hasOwnProperty(key)) {
              const transformPrefix = transformNames[key];
              if(elementStyle[transformPrefix] !== undefined) return key;
              
          }
      }
      return false;
    })();
    if(vendor === false) return false;
    if(vendor === "standard") return style;
    return vendor + style.charAt(0).toUpperCase() + style.slice(1);
}

/**
 * 拼接出歌曲的url链接
 * @param {*} id 歌曲ID
 */
export const getSongUrl = id => `https://music.163.com/song/media/outer/url?id=${id}.mp3`;

// 转换歌曲的播放时间
export const formatPlayTime = (time) => {
    time = time | 0; // |0表示向下取整
    const minute = (time / 60) | 0; // 分钟
    const second = (time % 60).toString().padStart(2, '0'); // 长度不够2位的前面补0
    return `${minute}:${second}`;
}

/**
 * 获取指定范围内的随机数
 * @param {*} min 最小值
 * @param {*} max 最大值
 */
function getRandomInt(min, max){
    return Math.floor(Math.random() * (max - min + 1) + min)
}

// 随机算法
export const shuffle = (arr) => {
    const newArr = [];
    arr.forEach(item => newArr.push(item));
    for (const i in newArr) {
        const j = getRandomInt(0, i);
        const k = newArr[i];
        newArr[i] = j;
        newArr[j] = k;
    }
    return newArr;
}

// 获取歌曲的索引
export const findSongIndex = (song = {}, list = []) => {
    return list.findIndex(item => item.id === song.id);
}
