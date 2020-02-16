import {
    createAction
} from 'redux-actions';
import {
    fromJS
} from 'immutable';
import * as actionTypes from './actionTypes';

export const changeFullScreen = data => createAction(actionTypes.CHANGE_FULLSCREEN)(data);

export const changePlayingState = data => createAction(actionTypes.CHANGE_PLAYING_STATE)(data);

export const changeSequencePlayList = data => createAction(actionTypes.CHANGE_SEQUENCE_PLAYLIST)(fromJS(data));

export const changePlayList = data => createAction(actionTypes.CHANGE_PLAYLIST)(fromJS(data));

export const changePlayMode = data => createAction(actionTypes.CHANGE_PLAY_MODE)(data);

export const changeShowPlayList = data => createAction(actionTypes.CHANGE_SHOW_PLAYLIST)(data);

export const changeCurrentSong = data => createAction(actionTypes.CHANGE_CURRENT_SONG)(fromJS(data));

export const changeCurrentIndex = data => createAction(actionTypes.CHANGE_CURRENT_INDEX)(data);