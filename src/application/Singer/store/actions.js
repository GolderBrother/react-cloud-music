import { fromJS } from 'immutable';
import { createAction } from 'redux-actions';
import { CHANGE_ENTER_LOADING, CHANGE_ARTIST, CHANGE_SONGS_OF_ARTIST } from './actionTypes';
import { getSingerInfoRequest } from '../../../api/request';


const changeAtrist = data => createAction(CHANGE_ARTIST)(fromJS(data));

const changeSongsOfArtist = data => createAction(CHANGE_SONGS_OF_ARTIST)(fromJS(data));

export const changeEnterLoading = data => createAction(CHANGE_ENTER_LOADING)(data);
/* export const changeEnterLoading = (data) => ({
    type: CHANGE_ENTER_LOADING,
    data
}); */

// 获取歌手信息
export const getSingerInfo = id => async (dispatch, getState) => {
    try {
        const {artist = {}, hotSongs = []} = await getSingerInfoRequest(id);
        dispatch(changeAtrist(artist));
        dispatch(changeSongsOfArtist(hotSongs));
        dispatch(changeEnterLoading(false));
    } catch (error) {
        console.log('获取歌手信息失败', error);
    }
};