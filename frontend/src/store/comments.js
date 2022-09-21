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
  console.log('this is the thunk response-----------------------------', response)
  if(response.ok) {
    const commentsObj = await response.json()
    const comments = commentsObj.Comments
    console.log('this is the comment json console.log',comments)
    dispatch(get(comments, songId))
  }
}

const initialState = {}

export default function commentReducer(state = initialState, action ){
  let newState = {}

  switch(action.type){
    case GET_COMMENT:
      console.log('action log--------------------------', action.comments)
      action.comments.forEach(comment => {
        newState[comment.id] = comment
      })
      
      console.log('this is the newstate-----------',newState)
      return newState


      default:
        return state;
      }
    }
