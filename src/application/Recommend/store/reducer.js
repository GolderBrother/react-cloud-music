import * as actionTypes from './actionTypes';
import { fromJS } from 'immutable'; // 将 JS 对象转换成 immutable 对象
const defaultState = fromJS({
    bannerList: [],
    recommendList: [],
    enterLoading: true
});

const reducer = (state = defaultState, action) => {
    switch(action.type){
        // 由于存放的是 immutable 数据结构，所以必须用 set 方法来设置新状态，同时取状态用 get 方法
        case actionTypes.CHANGE_BANNER_LIST:
            return state.set('bannerList', action.data);
        case actionTypes.CHANGE_RECOMMEND_LIST:
            return state.set('recommendList', action.data);
        case actionTypes.CHANGE_ENTER_LOADING:
            return state.set('enterLoading', action.data);
        default:
            return state;
    }
}

export default reducer;
