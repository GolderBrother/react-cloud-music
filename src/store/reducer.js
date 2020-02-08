import { combineReducers  } from 'redux-immutable';
import { reducer as recommendReducer } from '../application/Recommend/store/index';
export default combineReducers ({
    // 之后开发具体功能模块的时候添加对应模块的reducer(相当于每个子页面都是单独的子reducer)
    recommend: recommendReducer
});