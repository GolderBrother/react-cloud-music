import {
    fromJS
} from 'immutable';
import {
    getRankListRequest
} from '../../../api/request';

// actionTypes
export const CHANGE_RANK_LIST = 'home/rank/CHANGE_RANK_LIST';
export const CHANGE_LOADING = 'home/rank/CHANGE_LOADING';
export const CHANGE_RANK_LIST_LOADING = 'home/rank/CHANGE_RANK_LIST_LOADING';

// reducer默认状态值
const defaultState = fromJS({
    rankList: [],
    loading: true
});

// reducer
const reducer = (state = defaultState, action) => {
    switch (action.type) {
        case CHANGE_RANK_LIST:
            return state.set('rankList', action.data);
        case CHANGE_LOADING:
            return state.set('loading', action.data);
        case CHANGE_RANK_LIST_LOADING:
            return state.set('loading', action.data.loading).set('rankList', action.data.rankList);
        default:
            return state;
    }
}

export const changeRankList = (data) => ({
    type: CHANGE_RANK_LIST,
    data: fromJS(data)
});

export const changeLoading = (data) => ({
    type: CHANGE_LOADING,
    data
});

export const changeRankListAndLoading = (rankList = [], loading) => ({
    type: CHANGE_RANK_LIST_LOADING,
    data: {
        rankList: fromJS(rankList),
        loading 
    }
});

// actions
export const getRankList = () => async (dispatch, getState) => {
    try {
        const res = await getRankListRequest();
        const list = res && res.list;
        // 需要优化，比如Singers页面，把加载数据和loading状态，下拉状态放在一个dispatch中，一次性在store中更新相关字段，减少不必要render开销
        dispatch(changeRankListAndLoading(list, false));
        // dispatch(changeRankList(list));
        // dispatch(changeLoading(false))
    } catch (error) {
        console.log('获取排行榜单数据失败: ', error);
    }
}

export {
    reducer
}