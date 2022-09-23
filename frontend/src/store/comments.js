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

  const response = await csrfFetch(`/api/songs/${songId}/comments`)

  if(response.ok) {
    const {Comments} = await response.json()

    const comments = Comments
    dispatch(get(comments, songId))
  } else {

  }
}

export const createComment = (comment, songId) => async dispatch => {
  const response = await csrfFetch(`/api/songs/${songId}/comments`, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(comment)
  })

  if(response.ok) {
    const newComment =  await response.json()
    console.log(newComment, 'this is the response')
    const updatedResponse = await csrfFetch(`/api/songs/${songId}/comments`)
    const {Comments} = await updatedResponse.json()
    console.log('THIS IS THE COMMENTS', Comments)
    const actualComment = Comments.find((comment) => {
      console.log("THE CONSOLE LOG INSIDE THE FIND",comment.id, newComment.id)
      return comment.id === newComment.id

    })
    console.log('THIS IS THE ACTUAL COMMENT', actualComment)
    dispatch(add(actualComment))

  }
}

export const deleteComment = (id) => async dispatch => {

  const response = await csrfFetch(`/api/comments/${id}`, {
    method: 'DELETE'
  })
  if(response.ok){
    dispatch(remove(id))
  }
}

const initialState = null

export default function commentReducer(state = initialState, action ){
  let newState;

  switch(action.type){
    case GET_COMMENT:

      newState = {...state}
      const newComments = action.comments.reduce((obj, comment) =>{
        obj[comment.id] = comment;
        return obj
      },{})
      console.log('this is the newComments obj ------------', newComments)
      // (comment => {
      // newState[comment.id] = comment
      // })

      return {...newComments}

    case ADD_COMMENT:
      console.log('this is the action object', action)
      newState = {...state}
      newState[action.comment.id] = action.comment

      return newState

    case DELETE_COMMENT:
      newState = {...state}
      delete newState[action.commentId]
      return newState

    default:
      return state;
      }
    }
