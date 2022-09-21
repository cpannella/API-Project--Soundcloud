import { csrfFetch } from "./csrf"


const GET_COMMENT = 'comments/GET_COMMENT'
const REMOVE_COMMENT = 'comments/DELETE_COMMENT'
const ADD_COMMENT = 'comments/ADD_COMMENT'


const get = (comments, songId) => {
  return {
    type: GET_COMMENT,
    comments,
    songId
  }
}


const add = (comment) => {
  return {
    type: ADD_COMMENT,
    comment
  }
}

const remove = (commentId, songId) => {

  return {
    type: REMOVE_COMMENT,
    commentId,
    songId
  }
}

export const getComments = (songId) => async dispatch => {

  const response = await csrfFetch(`/api/songs/${songId}/comments`)
  if(!response) console.log("error")
  if(response.ok) {
    const commentsObj = await response.json()
    const comments = commentsObj.Comments
    dispatch(get(comments, songId))
  } else {
    console.log('error')
  }
}

export const createComment = (comment, songId) => async dispatch => {
  const response = await csrfFetch(`/api/songs/${songId}/comments`, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(comment)
  })
  if(response.ok) {
    const comment = await response.json()
    dispatch(add(comment))
    return comment
  }

}



const initialState = {}

export default function commentReducer(state = initialState, action ){
  let newState = {}
  console.log('comment reducer firing here')
  switch(action.type){
    case GET_COMMENT:
      action.comments.forEach(comment => {
      newState[comment.id] = comment
      })
      return newState

    case ADD_COMMENT:

      newState = {...state}
      console.log('this is the state reducer', newState)
      newState[action.comment.id] = action.comment
      return newState

    default:
      return state;
      }
    }
