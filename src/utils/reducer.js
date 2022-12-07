import { reducerCases } from "./Constants";

// self explanatory: this is what everything starts at
export const initialState = {
  token: null, //spotify token
  playlists: [],
  userInfo: null,
  selectedPlaylistId: "3Cb0Cx9SbrYvheoa2FjtA6",
  selectedPlaylist: null,
  currentlyPlaying: null,
  playerState: false,
  lyricsState: false,
  searchState: false,
  searchResults: null,
  searchTotal: null,
  recordingState:false,
};

/**
 * when a dispatch function is called, this function figures out what the response should be
 * @param {*} state the new/updated state
 * @param {*} action type determines what action you want to perform: e.g. pause music, change playlist, etc.
 * @returns
 */
const reducer = (state, action) => {
  switch (action.type) {
    case reducerCases.SET_TOKEN:
      return {
        ...state,
        token: action.token,
      };
    case reducerCases.SET_PLAYLISTS:
      return {
        ...state,
        playlists: action.playlists,
      };
    case reducerCases.SET_USER:
      return {
        ...state,
        userInfo: action.userInfo,
      };
    case reducerCases.SET_PLAYLIST:
      return {
        ...state,
        selectedPlaylist: action.selectedPlaylist,
      };
    case reducerCases.SET_PLAYLIST_ID:
      return {
        ...state,
        selectedPlaylistId: action.selectedPlaylistId,
      };
    case reducerCases.SET_PLAYING:
      return {
        ...state,
        currentlyPlaying: action.currentlyPlaying,
      };
    case reducerCases.SET_PLAYER_STATE:
      return {
        ...state,
        playerState: action.playerState,
      };
    case reducerCases.SET_LYRICS_STATE:
      return {
        ...state,
        lyricsState: action.lyricsState,
      };
    case reducerCases.SET_SEARCH_STATE:
      return {
        ...state,
        searchState: action.searchState,
      };
    case reducerCases.SET_SEARCH_RESULTS:
      return {
        ...state,
        searchResults: action.searchResults,
      };
    case reducerCases.SET_SEARCH_TOTAL:
      return {
        ...state,
        searchTotal: action.searchTotal,
      };
    case reducerCases.SET_RECORDING_STATE:
      return {
        ...state,
        recordingState: action.recordingState,
      };
    default:
      return state;
  }
};

export default reducer;
