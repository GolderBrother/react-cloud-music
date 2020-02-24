import {
    combineReducers
} from 'redux-immutable';
import {
    reducer as recommendReducer
} from '../application/Recommend/store/index';
import {
    reducer as singersReducer
} from '../application/Singers/store/index';
import {
    reducer as rankReducer
} from '../application/Rank/store/index';
import {
    reducer as albumReducer
} from '../application/Album/store/index';
import {
    reducer as singerReducer
} from '../application/Singer/store/index';
// 播放器
import {
    reducer as playerReducer
} from '../application/Player/store/index';
import {
    reducer as searchReducer
} from '../application/Search/store/index';
export default combineReducers({
    // 之后开发具体功能模块的时候添加对应模块的reducer(相当于每个子页面都是单独的子reducer)
    recommend: recommendReducer,
    singers: singersReducer,
    rank: rankReducer,
    album: albumReducer,
    singer: singerReducer,
    player: playerReducer,
    search: searchReducer
});