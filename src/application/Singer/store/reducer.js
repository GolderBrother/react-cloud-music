import { handleActions } from 'redux-actions';
import { fromJS } from 'immutable';
import { CHANGE_ARTIST, CHANGE_SONGS_OF_ARTIST, CHANGE_ENTER_LOADING } from './actionTypes';
const defaultState = fromJS({
    artist: {},
    songsOfArtist: [],
    enterLoading: true,
});
export default handleActions({
    [CHANGE_ARTIST]: (state, action) => {
        return state.set('artist', action.payload);
    },
    [CHANGE_SONGS_OF_ARTIST]: (state, action) => {
        return state.set('songsOfArtist', action.payload);
    },
    [CHANGE_ENTER_LOADING]: (state, action) => {
        return state.set('enterLoading', action.payload);
    }
}, defaultState);