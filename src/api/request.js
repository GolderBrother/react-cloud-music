import {
    axiosInstance
} from './config';
// 获取banner
export const getBannerRequest = () => axiosInstance.get('/banner');
// 获取推荐列表
export const getRecommendListRequest = () => axiosInstance.get('/personalized');