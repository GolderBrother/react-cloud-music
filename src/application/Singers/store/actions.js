import * as actionTypes from './actionTypes';
import {
    getHotSingerListRequest,
    getSingerCategoryRequest
} from '../../../api/request';

import {
    fromJS
} from 'immutable';

// 更新歌手列表
export const changeSingerList = data => ({
    type: actionTypes.CHANHE_SINGET_LIST,
    data: fromJS(data)
});

// 更新当前页数
export const changePageCount = data => ({
    type: actionTypes.CHANGE_PAGE_COUNT,
    data
});

// 上拉加载
export const changePullUpLoading = data => {
    return ({
        type: actionTypes.CHANHE_PULLUP_LOADING,
        data
    });
}

// 下拉刷新
export const changePullDownLoading = data => ({
    type: actionTypes.CHANHE_PULLDOWN_LOADING,
    data
});

// 进入动画
export const changeEnterLoading = data => ({
    type: actionTypes.CHANGE_ENTER_LOADING,
    data
});

// 首次加载热门歌手数据(下拉刷新)
export const getHotSingerList = () => {
    return async (dispatch, getState) => {
        try {
            const res = await getHotSingerListRequest(0);
            const {
                artists
            } = res;
            dispatch(changeSingerList(artists));
            dispatch(changeEnterLoading(false));
            dispatch(changePullDownLoading(false));
        } catch (error) {
            console.log('获取热门歌手数据失败:', error);
        }
    }
}
// 热门歌手数据(上拉加载更多)
export const refreshMoreHotSingerList = () => {
    return async (dispatch, getState) => {
        try {
            const pageCount = getState().getIn(['singers', 'pageCount']);
            const res = await getHotSingerListRequest(pageCount);
            const {
                artists = []
            } = res;
            const oldSingerList = getState().getIn(['singers', 'singerList']).toJS();;
            const newList = [...oldSingerList, ...artists];
            dispatch(changeSingerList(newList));
            dispatch(changePullUpLoading(false))
        } catch (error) {
            console.log('获取热门歌手数据失败:', error);
        }
    }
}

// 第一次加载对应类别的歌手(下拉刷新)
export const getSingerListByCate = (category = '', alpha = '') => {
    return async (dispatch, getState) => {
        try {
            const res = await getSingerCategoryRequest(category, alpha, 0);
            const {
                artists = []
            } = res;
            dispatch(changeSingerList(artists));
            dispatch(changeEnterLoading(false));
            dispatch(changePullDownLoading(false));
        } catch (error) {
            console.log('获取对应类别的歌手数据失败:', error);
        }
    }
}

// 对应类别的歌手数据(上拉加载更多)
export const refreshMoreSingerListByCate = (category = '', alpha = '') => {
    return async (dispatch, getState) => {
        try {
            const pageCount = getState().getIn(['singers', 'pageCount']);
            const res = await getSingerCategoryRequest(category, alpha, pageCount);
            const {
                artists = []
            } = res;
            const oldSingerList = getState().getIn(['singers', 'singerList']).toJS();;
            const newList = [...oldSingerList, ...artists];
            dispatch(changeSingerList(newList));
            dispatch(changePullUpLoading(false));
        } catch (error) {
            console.log('获取对应类别的歌手歌手数据失败:', error);
        }
    }
}