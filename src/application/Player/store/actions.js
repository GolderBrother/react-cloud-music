import {
    createAction
} from 'redux-actions';
import {
    fromJS
} from 'immutable';
import * as actionTypes from './actionTypes';
import { getSongDetailRequest } from '../../../api/request';

export const changeFullScreen = data => createAction(actionTypes.CHANGE_FULLSCREEN)(data);

export const changePlayingState = data => createAction(actionTypes.CHANGE_PLAYING_STATE)(data);

export const changeSequencePlayList = data => createAction(actionTypes.CHANGE_SEQUENCE_PLAYLIST)(fromJS(data));

export const changePlayList = data => createAction(actionTypes.CHANGE_PLAYLIST)(fromJS(data));

export const changePlayMode = data => createAction(actionTypes.CHANGE_PLAY_MODE)(data);

export const changeShowPlayList = data => createAction(actionTypes.CHANGE_SHOW_PLAYLIST)(data);

export const changeCurrentSong = data => createAction(actionTypes.CHANGE_CURRENT_SONG)(fromJS(data));

export const changeCurrentIndex = data => createAction(actionTypes.CHANGE_CURRENT_INDEX)(data);

export const deleteSong = data => createAction(actionTypes.DELETE_SONG)(data);

// 插入歌曲到播放列表中
export const insertSong = data => createAction(actionTypes.INSERT_SONG)(data);

/**
 * 根据歌曲id获取单曲详情
 * @param {number} id 歌曲id
 */
export const getSongDetail = id => async dispatch => {
    try {
        const data = await getSongDetailRequest(id);
        const song = data.songs[0];
        dispatch(insertSong(song));
    } catch (error) {
        consoel.log('根据歌曲id获取单曲详情: ', error);
    }
}