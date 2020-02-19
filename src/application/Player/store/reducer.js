import {
    handleActions
} from 'redux-actions';
import * as actionsType from './actionTypes';
import {
    fromJS
} from 'immutable';
import {
    playMode
} from '../../../api/config';
import { list } from './mock';
const defaultState = fromJS({
    fullScreen: false, // 播放器是否为全屏模式
    playingState: false, // 当前歌曲是否播放
    sequencePlayList: [...list], // 顺序列表 (因为之后会有随机模式，列表会乱序，因从拿这个保存顺序列表)
    playList: [...list],
    playMode: playMode.sequence, // 播放模式
    currentIndex: 0, // 当前歌曲在播放列表的索引位置
    showPlayList: false, // 是否展示播放列表
    currentSong: {} // 歌曲信息
});

export default handleActions({
    [actionsType.CHANGE_FULLSCREEN]: (state, action) => {
        return state.set('fullScreen', action.payload);
    },
    [actionsType.CHANGE_PLAYING_STATE]: (state, action) => {
        return state.set('playingState', action.payload);
    },
    [actionsType.CHANGE_SEQUENCE_PLAYLIST]: (state, action) => {
        return state.set('sequencePlayList', action.payload);
    },
    [actionsType.CHANGE_PLAYLIST]: (state, action) => {
        return state.set('playList', action.payload);
    },
    [actionsType.CHANGE_PLAY_MODE]: (state, action) => {
        return state.set('playMode', action.payload);
    },
    [actionsType.CHANGE_CURRENT_INDEX]: (state, action) => {
        return state.set('currentIndex', action.payload);
    },
    [actionsType.CHANGE_SHOW_PLAYLIST]: (state, action) => {
        return state.set('showPlayList', action.payload);
    },
    [actionsType.CHANGE_CURRENT_SONG]: (state, action) => {
        return state.set('currentSong', action.payload);
    },
}, defaultState);