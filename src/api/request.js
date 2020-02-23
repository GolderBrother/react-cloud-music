import {
    axiosInstance
} from './config';
// 获取banner
export const getBannerRequest = () => axiosInstance.get('/banner');

// 获取推荐列表
export const getRecommendListRequest = () => axiosInstance.get('/personalized');

/**
 * 获取热门歌手数据
 * @param {*} count 偏移数量
 */
export const getHotSingerListRequest = (offset) => axiosInstance.get(`/top/artists?offset=${offset}`);

/**
 * 歌手分类列表
 * @param {*} cate 歌手类型
 * @param {*} alpha 按首字母索引查找参数
 * @param {*} offset 偏移数量
 */
export const getSingerCategoryRequest = (cate, alpha = '', offset) => axiosInstance.get(`/artist/list?cat=${cate}&initial=${alpha.toLowerCase()}&offset=${offset}`);

// 获取所有榜单内容
export const getRankListRequest = () => axiosInstance.get(`/toplist/detail`);

/**
 * 获取歌单详情 
 * @param {number} id 歌单 id
 */
export const getAlbumDetailRequest = (id) => axiosInstance.get(`/playlist/detail?id=${id}`);

/**
 * 调用此接口 , 传入歌手 id, 可获得歌手部分信息和热门歌曲: 调用此接口 , 传入歌手 id, 可获得歌手部分信息和热门歌曲
 * @param {number} id 歌手 id
 */
export const getSingerInfoRequest = (id) => axiosInstance.get(`/artists?id=${id}`);

/**
 * 获取歌词信息
 * @param {*} id 歌曲id
 */
export const getLyricRequest = id => axiosInstance.get(`/lyric?id=${id}`);

/**
 * 获取热门关键词
 */
export const getHotKeyWordsRequest = () => axiosInstance.get(`/search/hot`);

/**
 * 搜索建议
 * @param {string} keywords 关键词 
 * 调用此接口 , 传入搜索关键词可获得搜索建议 , 搜索结果同时包含单曲 , 歌手 , 歌单 ,mv 信息
 */
export const getSuggestListRequest = (keywords = '') => axiosInstance.get(`/search/suggest?keywords=${keywords}`);

/**
 * 搜索
 * @param {string} keywords 关键词 
 * 调用此接口 , 传入搜索关键词可以搜索该音乐 / 专辑 / 歌手 / 歌单 / 用户 
 */
export const getResultSongsListRequest = (keywords = '') => axiosInstance.get(`/search?keywords=${keywords}`);