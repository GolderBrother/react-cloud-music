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

export const changeListOffset = data => ({
    type: actionTypes.CHANGE_LIST_OFFSET,
    data
})

export const changeCategory = (data) => ({
    type: actionTypes.CHANGE_CATEGORY,
    data
});

export const changeAlpha = (data) => ({
    type: actionTypes.CHANGE_ALPHA,
    data
});

// 首次加载热门歌手数据(下拉刷新)
export const getHotSingerList = () => {
    return async (dispatch, getState) => {
        try {
            const {
                artists
            } = await getHotSingerListRequest(0);
            dispatch(changeSingerList(artists));
            dispatch(changeEnterLoading(false));
            dispatch(changePullDownLoading(false));
            dispatch(changeListOffset(artists.length));
        } catch (error) {
            console.log('获取热门歌手数据失败:', error);
        }
    }
}
// 热门歌手数据(上拉加载更多)
export const refreshMoreHotSingerList = () => {
    return async (dispatch, getState) => {
        try {
            const offset = getState().getIn(['singers', 'listOffset']);
            const res = await getHotSingerListRequest(offset);
            const {
                artists = []
            } = res;
            const oldSingerList = getState().getIn(['singers', 'singerList']).toJS();;
            const newList = [...oldSingerList, ...artists];
            dispatch(changeSingerList(newList));
            dispatch(changePullUpLoading(false));
            dispatch(changeListOffset(newList.length));
        } catch (error) {
            console.log('获取热门歌手数据失败:', error);
        }
    }
}
// 第一次加载对应类别的歌手(下拉刷新)
export const getSingerListByCate = (_category = '', _alpha = '') => {
    return async (dispatch, getState) => {
        try {
            const category = _category || getState().getIn(['singers', 'category']);
            const alpha = _alpha || getState().getIn(['singers', 'alpha']);
            const offset = getState().getIn(['singers', 'listOffset']) || 0;
            const res = await getSingerCategoryRequest(category, alpha, offset);
            const {
                artists = []
            } = res;
            dispatch(changeSingerList(artists));
            dispatch(changeEnterLoading(false));
            dispatch(changePullDownLoading(false));
            dispatch(changeListOffset(artists.length));
        } catch (error) {
            console.log('获取对应类别的歌手数据失败:', error);
        }
    }
}

// 对应类别的歌手数据(上拉加载更多)
export const refreshMoreSingerListByCate = (_category = '', _alpha = '') => {
    return async (dispatch, getState) => {
        try {
            const category = _category || getState().getIn(['singers', 'category']);
            const alpha = _alpha || getState().getIn(['singers', 'alpha']);
            const offset = getState().getIn(['singers', 'listOffset']) || 0;
            const res = await getSingerCategoryRequest(category, alpha, offset);
            const {
                artists = []
            } = res;
            const oldSingerList = getState().getIn(['singers', 'singerList']).toJS();;
            const newList = [...oldSingerList, ...artists];
            dispatch(changeSingerList(newList));
            dispatch(changePullUpLoading(false));
            dispatch(changeListOffset(newList.length));
        } catch (error) {
            console.log('获取对应类别的歌手歌手数据失败:', error);
        }
    }
}