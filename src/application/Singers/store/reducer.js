import {
    fromJS
} from 'immutable';
import * as actionTypes from './actionTypes';
const defaultState = fromJS({
    singerList: [], // 歌手列表
    enterLoading: true, //控制进场Loading
    pullUpLoading: true, //控制上拉加载动画
    pullDownLoading: true, //控制下拉加载动画
    pageCount: 0 // //这里是当前页数，我们即将实现分页功能
});
const reducer = (state = defaultState, {
    type,
    data
}) => {
    switch (type) {
        case actionTypes.CHANHE_SINGET_LIST:
            return state.set('singerList', data);
        case actionTypes.CHANGE_ENTER_LOADING:
            return state.set('enterLoading', data);
        case actionTypes.CHANHE_PULLUP_LOADING:
            return state.set('pullUpLoading', data);
        case actionTypes.CHANHE_PULLDOWN_LOADING:
            return state.set('pullDownLoading', data);
        case actionTypes.CHANGE_PAGE_COUNT:
            return state.set('pageCount', data);
        default:
            return state;
    }
}

export default reducer;