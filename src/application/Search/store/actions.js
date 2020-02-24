import { fromJS } from 'immutable';
import { createAction } from 'redux-actions';
import * as actionTypes from './actionTypes';
import { getHotKeyWordsRequest, getSuggestListRequest, getResultSongsListRequest } from '../../../api/request';

export const changeEnterLoading = data => createAction(actionTypes.SET_ENTER_LOADING)(data);

export const changeHotKeyWords = data => createAction(actionTypes.SET_HOT_KEYWORDS)(fromJS(data));

export const changeResultSongs = data => createAction(actionTypes.SET_RESULT_SONGS_LIST)(fromJS(data));

export const changeSuggestList = data => createAction(actionTypes.SET_SUGGEST_LIST)(fromJS(data));

/**
 * 获取热门关键词
 */
export const getHotKeyWords = () => async (dispatch = () => {}) => {
    try {
        const data = await getHotKeyWordsRequest();
        if(!data || !data.result) return;
        const hotKwyWords = data.result.hots;
        dispatch(changeHotKeyWords(hotKwyWords));
        dispatch(changeEnterLoading(false));
    } catch (error) {
        console.log('获取热门关键词失败：', error);
    }
}

/**
 * 根据关键词获取搜索结果, 搜索结果同时包含建议, 单曲 , 歌手 , 歌单 ,mv 信息
 * @param {string} query 关键词
 */
export const getSuggestList = (query) => async (dispatch = () => {}) => {
    try {
        const data = await getSuggestListRequest(query);
        if(!data) return;
        const suggestList = data.result || [];
        dispatch(changeSuggestList(suggestList));
        const result = await getResultSongsListRequest(query);
        if(!result || !result.result) return;
        const resultSongs = result.result.songs || [];
        dispatch(changeResultSongs(resultSongs));
    } catch (error) {
        console.log('根据关键词获取搜索结失败: ', error);
    }
}