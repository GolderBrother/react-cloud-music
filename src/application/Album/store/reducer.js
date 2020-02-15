import * as actionTypes from './actionTypes';
import {
    fromJS
} from 'immutable';
import {
    handleActions
} from 'redux-actions';
const defaultState = fromJS({
    enterLoading: true,
    currentAlbum: {}
});
export default handleActions({
    [actionTypes.CHANGE_ENTER_LOADING]: (state, action) => {
        return state.set('enterLoading', action.payload);
    },
    [actionTypes.CHANGE_CURRENT_ALBUN]: (state, action) => {
        return state.set('currentAlbum', action.payload);
    }
}, defaultState);