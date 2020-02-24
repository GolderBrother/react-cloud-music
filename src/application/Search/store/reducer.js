import { fromJS } from 'immutable';
import * as actionTypes from './actionTypes';
import { handleActions } from 'redux-actions';
const defaultState = fromJS({
    hotList: [], // 热门关键词列表
    suggestList: [], // 列表，包括歌单和歌手
    songsList: [], // 歌曲列表
    enterLoading: true // 是否显示进场动画
});
export default handleActions({
    [actionTypes.SET_HOT_KEYWORDS]: (state, action) => {
        return state.set('hotList', action.payload);
    },
    [actionTypes.SET_SUGGEST_LIST]: (state, action) => {
        return state.set('suggestList', action.payload);
    },
    [actionTypes.SET_RESULT_SONGS_LIST]: (state, action) => {
        return state.set('songsList', action.payload);
    },
    [actionTypes.SET_ENTER_LOADING]: (state, action) => {
        return state.set('enterLoading', action.payload);
    }
}, defaultState);