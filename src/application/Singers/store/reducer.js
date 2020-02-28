import {
    fromJS
} from 'immutable';
import * as actionTypes from './actionTypes';
const defaultState = fromJS({
    category: "", // 分类
    alpha: "", // 首字母
    singerList: [], // 歌手列表
    enterLoading: true, //控制进场Loading
    pullUpLoading: false, //控制上拉加载动画
    pullDownLoading: false, //控制下拉加载动画
    pageCount: 0, // 这里是当前页数，我们即将实现分页功能,
    listOffset: 0 // 请求列表的偏移不是page，是个数
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
        case actionTypes.CHANGE_LIST_OFFSET:
            return state.set('listOffset', data);
        case actionTypes.CHANGE_CATEGORY:
            return state.merge({
                'category': data,
                listOffset: 0,
                enterLoading: true
            });;
        case actionTypes.CHANGE_ALPHA:
            return state.merge({
                'alpha': data,
                listOffset: 0,
                enterLoading: true
            });
        default:
            return state;
    }
}

export default reducer;