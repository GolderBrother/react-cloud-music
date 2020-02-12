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