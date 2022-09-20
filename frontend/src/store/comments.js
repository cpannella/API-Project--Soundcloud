
const GET_COMMENTS = 'songs/GET_COMMENTS'
const GET_ONE_COMMENT = 'songs/GET_ONE_COMMENT'

const DELETE_SONG = 'songs/DELETE_COMMENT'
const POST_SONG = 'songs/POST_COMMENT'


const get = (comments) => {
    return {
    type: GET_COMMENTS,
    comments
  }
}


const postComment = (comment) => {
  return {
    type: POST_COMMENT,
    comment
  }
}

const deleter = (id) => {
  return {
  type: DELETE_COMMENT,
  id
  }
}

//song retrieval
// export const getSongs = () => async dispatch => {
//   const response = await csrfFetch(`/api/songs`)
//   console.log('get songs thunk response', response )
//   if(response.ok) {
//     const data  = await response.json()
//     dispatch(get(data.Songs))
//   } else {
//     console.log('fooey')
//   }
// }

// export const getOneSong = (id) => async dispatch => {
//   console.log('the get one song THUNK')
//   const response = await csrfFetch(`/api/songs/${id}`)
//   if(response.ok) {
//     const song = await response.json()
//     dispatch(postSong(song))
//     return song
//   }
// }


// //song creation-----------------------------------
// export const createSong = (data) => async dispatch => {
//   console.log('createSong thunk')
//   const response = await csrfFetch(`/api/songs`, {
//     method: "POST",
//     headers : { "Content-Type":"application/json"},
//     body: JSON.stringify(data)
//   })
//   if(response.ok) {
//     const song = await response.json()
//     dispatch(postSong(song))
//     return song
//   }
//     console.log('error')
//   }


//   export const editSong = (data) => async dispatch => {
//     console.log('THIS IS THE DATA----------------', data)
//     console.log('editSong thunk')
//     const response = await csrfFetch(`/api/songs/${data.id}`, {
//       method: "PUT",
//       headers : { "Content-Type":"application/json"},
//       body: JSON.stringify(data)
//     })
//     if(response.ok) {
//       const song = await response.json()
//       dispatch(postSong(song))
//       return song
//     }
//       console.log('error')
//     }

//   export const deleteSong = (id) => async dispatch => {
//     console.log('this is the delete song thunk--------------', id)
//     const response = await csrfFetch(`/api/songs/${id}`, {method: 'DELETE'})
//     console.log('this is the response obj------------', response)

//     if(response.ok) {
//       dispatch(deleter(id))
//     }
//   }

const initialState = {}
//Songs are in form of array, need to normalize data.
  //can not seem to get the state to update though
export default function commentReducer(state = initialState, action ){

  let newState = {}
  switch(action.type){
    case GET_COMMENTS:
      action.comments.forEach(comment => {
        newState[comment.id] = comment
      })
      newState = {...newState}
      return newState

    // case POST_COMMENT:
    //   newState = {...state}
    //                   // console.log('this is the new state before action', newState)
    //   newState[action.comment.id] = action.comment
    //   return newState

    // case DELETE_COMMENT:
    //   newState = {...state}
    //   console.log('newState delete action------', newState)
    //   delete newState[action.id]
    //   console.log('newState post deleteion ---------', newState)

    default:
    return state;
  }
}
