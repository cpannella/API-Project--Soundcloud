import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, Route, useParams } from 'react-router-dom';
import { getSongs } from '../../store/songs';


const SongPage = () => {
  const { songId } = useParams()
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getSongs())
  }, [dispatch])



  return (
    <div>
      <h1>Songs Component</h1>
    </div>
  )
}

export default SongPage
