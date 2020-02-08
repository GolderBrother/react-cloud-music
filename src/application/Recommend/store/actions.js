import * as actionTypes from './actionTypes';
import {
    fromJS
} from 'immutable'; // 将 JS 对象转换成 immutable 对象
import {
    getBannerRequest,
    getRecommendListRequest
} from '../../../api/request';

// 更改banner列表数据
export const changeBannerList = (data) => ({
    type: actionTypes.CHANGE_BANNER_LIST,
    data: fromJS(data)
});

// 更改推荐列表数据
export const changeRecommendList = (data) => ({
    type: actionTypes.CHANGE_RECOMMEND_LIST,
    data: fromJS(data)
});

// 获取banner列表
export const getBannerList = () => async (dispatch) => {
    try {
        const data = await getBannerRequest();
        dispatch(changeBannerList(data.banners))
    } catch (error) {
        console.log('获取banner列表失败', error);
    }
};

// 获取推荐列表
export const getRecommendList = () => async (dispatch) => {
    try {
        const data = await getRecommendListRequest();
        dispatch(changeRecommendList(data.result));
    } catch (error) {
        console.log('获取推荐列表失败', error);
    }
};