

const GET_SONGS = '/api/songs'
const GET_ONE_SONG = 'api/songs/:songId'
const EDIT_SONG = 'api/songs/:songId'
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

const edit = (data) => {
  return {
  type: EDIT_SONG,
  data
  }
}

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


export const getSongs = () => async dispatch => {
  const response = await fetch(`/api/songs`)
  console.log('get songs thunk response', response )
  if(response.ok) {
    const songs  = await response.json()
    dispatch(get(songs))
  } else {
    console.log('fooey')
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
      // newState = {...state, ...action.songs.Songs}
      console.log('newState spread out---------', newState)
      console.log(action.songs.Songs, 'console.log your way to freedom')
      //normalizing song array into object
      action.songs.Songs.forEach(song => {
        newState[song.id] = song
        // console.log(song)
      })
      //spreading new state
      newState = {...newState}
      console.log(newState)
      return newState

    default:
    return state;
  }
}
