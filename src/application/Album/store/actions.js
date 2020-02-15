import {
    fromJS
} from 'immutable';
import * as actionTypes from './actionTypes';
import { createAction } from 'redux-actions';
import {
    getAlbumDetailRequest
} from '../../../api/request';

const changeEnterLoading = data => createAction(actionTypes.CHANGE_ENTER_LOADING)(data);
const changeCurrentAlbum = data => createAction(actionTypes.CHANGE_CURRENT_ALBUN)(fromJS(data));

/**
 * 获取歌单详情
 * @param {number} id 歌单id
 */
export const getAlbumDetail = id => async dispatch => {
    try {
        const {
            playlist: albumDetail = {}
        } = await getAlbumDetailRequest(id);
        dispatch(changeCurrentAlbum(albumDetail));
        dispatch(changeEnterLoading(false));
    } catch (error) {
        console.log('获取歌单详情失败：', error);
    }
}