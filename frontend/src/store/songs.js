import { csrfFetch } from "./csrf"

const GET_SONGS = 'songs/GET_SONGS'
const GET_ONE_SONG = 'songs/GET_ONE_SONG'

const DELETE_SONG = 'songs/DELETE_SONG'
const POST_SONG = 'songs/POST_SONG'


const get = (songs) => {
    return {
    type: GET_SONGS,
    songs
  }
}


const postSong = (song) => {
  return {
    type: POST_SONG,
    song
  }
}

const deleter = (id) => {
  return {
  type: DELETE_SONG,
  id
  }
}

//song retrieval
export const getSongs = () => async dispatch => {
  const response = await csrfFetch(`/api/songs`)
  if(response.ok) {
    const data  = await response.json()
    dispatch(get(data.Songs))
  } else {

  }
}

export const getOneSong = (id) => async dispatch => {
  const response = await csrfFetch(`/api/songs/${id}`)
  if(response.ok) {
    const song = await response.json()

    dispatch(postSong(song))
    return song
  }
}


//song creation-----------------------------------
export const createSong = (data) => async dispatch => {
  const response = await csrfFetch(`/api/songs`, {
    method: "POST",
    headers : { "Content-Type":"application/json"},
    body: JSON.stringify(data)
  })
  if(response.ok) {
    const song = await response.json()
    dispatch(postSong(song))
    return song
  }

  }


  export const editSong = (data) => async dispatch => {
    const response = await csrfFetch(`/api/songs/${data.id}`, {
      method: "PUT",
      headers : { "Content-Type":"application/json"},
      body: JSON.stringify(data)
    })

    if(response.ok) {
      const song = await response.json()

      dispatch(postSong(song))
      return song
    }

    }

  export const deleteSong = (id) => async dispatch => {
    const response = await csrfFetch(`/api/songs/${id}`, {method: 'DELETE'})
    if(response.ok) {
      dispatch(deleter(id))
    }
  }

const initialState = {}
//Songs are in form of array, need to normalize data.
  //can not seem to get the state to update though
export default function songReducer(state = initialState, action ){

  let newState = {}
  switch(action.type){
    case GET_SONGS:
      action.songs.forEach(song => {
        newState[song.id] = song
      })
      newState = {...newState}
      return newState

    case POST_SONG:
      newState = {...state}
      newState[action.song.id] = action.song
    
      return newState

    case DELETE_SONG:
      newState = {...state}
      delete newState[action.id]

    default:
      return state;
  }
}
