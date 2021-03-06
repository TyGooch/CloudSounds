import {receiveSingleTrack,
        receiveErrors,
        receiveUserTracks,
        removeDeletedTrack,
        TrackConstants} from '../actions/track_actions';

import {create_track,
        fetchUserTracks,
        deleteTrack} from '../util/track_api_util';

import {hashHistory} from 'react-router';

export default ({getState, dispatch}) => next => action => {
  const successCallback = track => {
    dispatch(receiveSingleTrack(track));
  };
  const userTracksSuccess = tracks => {
    dispatch(receiveUserTracks(tracks));
  };
  const deleteTracksSuccess = id => {
    dispatch(removeDeletedTrack(id));
  };
  const errorCallback = xhr => {
    const errors = xhr.responseJson;
    dispatch(receiveErrors(errors));
  };
  switch (action.type) {
    case TrackConstants.CREATE_TRACK:
      create_track(action.track, successCallback, errorCallback);
      return next(action);
    case TrackConstants.FETCH_USER_TRACKS:
      fetchUserTracks(action.tracks, userTracksSuccess, errorCallback);
      return next(action);
    case TrackConstants.DELETE_TRACK:
      deleteTrack(action.track.id, deleteTracksSuccess, errorCallback);
      return next(action);
    default:
      return next(action);
  }
};
