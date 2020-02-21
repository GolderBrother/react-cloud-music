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
import {
    findSongIndex
} from '../../../api/utils';
import {
    list
} from './mock';
const defaultState = fromJS({
    fullScreen: false, // 播放器是否为全屏模式
    playingState: false, // 当前歌曲是否播放
    sequencePlayList: [], // 顺序列表 (因为之后会有随机模式，列表会乱序，因从拿这个保存顺序列表)
    playList: [],
    playMode: playMode.sequence, // 播放模式
    currentIndex: 0, // 当前歌曲在播放列表的索引位置
    showPlayList: false, // 是否展示播放列表
    currentSong: {} // 歌曲信息
});
// 删除歌曲逻辑略复杂，单独抽离出来
const handleDeleteSong = (state, song) => {
    // 下面 也可用 loadsh 库的 deepClone 方法。这里深拷贝是基于纯函数的考虑，不对参数 state 做修改
    // 播放列表
    const playList = JSON.parse(JSON.stringify(state.getIn(['player', 'playList'])));
    // 顺序列表
    const sequencePlayList = JSON.parse(JSON.stringify(state.getIn(['player', 'sequencePlayList'])));
    let currentIndex = state.get('currentIndex');
    // 找对应歌曲在播放列表中的索引
    const playListIndex = findSongIndex(song, currentIndex);
    // 在播放列表中将其删除
    playList.splice(playListIndex, 1);
    // 如果删除的歌曲排在当前播放歌曲前面，那么 currentIndex--，让当前的歌正常播放
    if (playListIndex < currentIndex) currentIndex--;
    // 找对应歌曲在顺序播放列表中的索引
    const sequencePlayListIndex = findSongIndex(song, currentIndex);
    // 顺序在播放列表中将其删除
    sequencePlayList.splice(sequencePlayListIndex, 1);
    return state.merge({
        'playList': fromJS(playList),
        'sequencePlayList': fromJS(sequencePlayList),
        'currentIndex': fromJS(currentIndex)
    });
}
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
    [actionsType.DELETE_SONG]: (state, {
        payload: song
    }) => {
        return handleDeleteSong(state, song);
    }
}, defaultState);