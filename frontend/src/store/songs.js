import { csrfFetch } from "./csrf"

const GET_SONGS = '/api/songs'
const GET_ONE_SONG = 'api/songs/:songId'
// const EDIT_SONG = 'api/songs/:songId'
const DELETE_SONG = 'api/songs/:songId'
const POST_SONG = 'api/songs'


const get = (songs) => {
    return {
    type: GET_SONGS,
    songs
  }
}

const getById = (id) => {
  return {
  type: GET_ONE_SONG,
  id
  }
}

// const edit = (data) => {
//   return {
//   type: EDIT_SONG,
//   data
//   }
// }

const postSong = (song) => {
  return {
    type: POST_SONG,
    song
  }
}

const deleter = (data) => {
  return {
  type: DELETE_SONG,
  data
  }
}

//song retrieval
export const getSongs = () => async dispatch => {
  const response = await csrfFetch(`/api/songs`)
  console.log('get songs thunk response', response )
  if(response.ok) {
    const songs  = await response.json()
    dispatch(get(songs))
  } else {
    console.log('fooey')
  }
}

export const getOneSong = (id) => async dispatch => {
  const response = await csrfFetch(`/api/songs/${id}`)
  if(response.ok) {
    const song = await response.json()
    dispatch(postSong(song))
  }
}


//song creation-----------------------------------
export const createSong = (data) => async dispatch => {
  console.log('createSong thunk')
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
    console.log('error')
  }


  export const editSong = (data) => async dispatch => {
    console.log('editSong thunk')
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
      console.log('error')
    }


const initialState = {}
//Songs are in form of array, need to normalize data.
  //can not seem to get the state to update though
export default function songReducer(state = initialState, action ){

  let newState = {}
  // console.log('this is the action.songList', action.songs)
  switch(action.type){
    case GET_SONGS:
      newState = {...state, ...action.songs.Songs}
      // console.log('newState spread out---------', newState)
      // console.log(action.songs.Songs, 'console.log your way to freedom')
      //normalizing song array into object
      action.songs.Songs.forEach(song => {
        newState[song.id] = song
      })
      //spreading new state
      newState = {...newState}
      // console.log(newState)
      return newState

    case POST_SONG:
    console.log('this is the post_Song action initializing')
    newState = {...state}
    console.log('this is the new state before action', newState)
    newState[action.song.id] = action.song
    console.log('the post song action after action', newState)
    return newState


    default:
    return state;
  }
}
