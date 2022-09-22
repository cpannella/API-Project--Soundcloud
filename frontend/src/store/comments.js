import { csrfFetch } from "./csrf"


const GET_COMMENT = 'comments/GET_COMMENT'
const DELETE_COMMENT = 'comments/DELETE_COMMENT'
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
    type: DELETE_COMMENT,
    commentId,
    songId
  }
}

export const getComments = (songId) => async dispatch => {
  console.log('comment thunk')
  const response = await csrfFetch(`/api/songs/${songId}/comments`)
  
  if(response.ok) {
    const commentsObj = await response.json()
    console.log(commentsObj, "the comments object")
    const comments = commentsObj.Comments
    console.log('just comments-------', comments)
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

  }
}

export const deleteComment = (id) => async dispatch => {
  console.log('delete comment thunk')
  const response = await csrfFetch(`/api/comments/${id}`, {
    method: 'DELETE'
  })
  if(response.ok){
    dispatch(remove(id))
  }
}




const initialState = {}

export default function commentReducer(state = initialState, action ){
  let newState = {}

  switch(action.type){
    case GET_COMMENT:
      console.log(state, "pplain state in comment reducers")
      newState = {...state}
      console.log('new state in get comments', newState)
      action.comments.forEach(comment => {
      newState[comment.id] = comment
      })
      return newState

    case ADD_COMMENT:
      // console.log('action in reducer-------------------',action)
      newState = {...state}
      newState[action.comment.id] = action.comment
      console.log('this is the new state------', newState)
      return newState

    case DELETE_COMMENT:
      newState = {...state}
      delete newState[action.commentId]
      return newState

    default:
      return state;
      }
    }
