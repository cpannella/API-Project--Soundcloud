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
// const getById = (id) => {
//   return {
//   type: GET_ONE_SONG,
//   id
//   }
// }



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
  console.log('get songs thunk response', response )
  if(response.ok) {
    const data  = await response.json()
    dispatch(get(data.Songs))
  } else {
    console.log('fooey')
  }
}

export const getOneSong = (id) => async dispatch => {
  console.log('the get one song THUNK')
  const response = await csrfFetch(`/api/songs/${id}`)
  if(response.ok) {
    const song = await response.json()
    dispatch(postSong(song))
    return song
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
    console.log('THIS IS THE DATA----------------', data)
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

  export const deleteSong = (id) => async dispatch => {
    console.log('this is the delete song thunk--------------', id)
    const response = await csrfFetch(`/api/songs/${id}`, {method: 'DELETE'})
    console.log('this is the response obj------------', response)

    if(response.ok) {
      dispatch(deleter(id))
    }
  }

const initialState = {}
//Songs are in form of array, need to normalize data.
  //can not seem to get the state to update though
export default function songReducer(state = initialState, action ){

  let newState = {}
  // console.log('this is the action.songList', action.songs)
  switch(action.type){
    case GET_SONGS:
                        // console.log('newState spread out---------', newState)

      action.songs.forEach(song => {
        newState[song.id] = song
      })
                     
      newState = {...newState}
                        // console.log(newState)
      return newState

    case POST_SONG:
                      // console.log('this is the post_Song action initializing')
      newState = {...state}
                      // console.log('this is the new state before action', newState)
      newState[action.song.id] = action.song
                      // console.log('the post song action after action', newState)
      return newState
    case DELETE_SONG:
      newState = {...state}
      console.log('newState delete action------', newState)
      delete newState[action.id]
      console.log('newState post deleteion ---------', newState)

    default:
    return state;
  }
}
