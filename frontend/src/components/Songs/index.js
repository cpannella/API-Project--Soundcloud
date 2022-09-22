import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, Route, useParams } from 'react-router-dom';
import { getSongs } from '../../store/songs';
import './songs.css'
import CreateSongForm from './createSongForm';
import EditSongForm from './EditSongform';
import SongDetail from './songDetails';
import Player from '../AudioPlayer'
import { useAudio } from '../../context/audioPlayer';


 const SongPage = () => {
  const { id } = useParams()
  const dispatch = useDispatch()
  const songs = useSelector(state =>  state.songs)
  const sessionUser = useSelector(state => state.session.user);
  const songList = Object.values(songs)
  const comments = useSelector((state) => state.comments);
  const user = useSelector((state) => state.session.user)
  const { url, setUrl} = useAudio()

  useEffect(() => {
    dispatch(getSongs())
  }, [dispatch, id])

  if(!sessionUser) return null
  else return (
    <div >
      <CreateSongForm/>
      <div>
        <ul>
          {songList.map((song) =>{
            return (
              <div key={song.id} className="song-container">
                  <h2>{song.title}</h2>
                <NavLink key={song.id} to={`/songs/${song.id}`}>View Song Details Here</NavLink>

                <h4></h4>
                  <img alt={song.imageUrl} src={song.imageUrl}></img>
                  <div className="button-div">
                  <button onClick={()=> setUrl(song.url)}>Play song</button>
                </div>
              </div>
            )
          })}
        </ul>
      </div>
    </div>
  )
}

export default SongPage
