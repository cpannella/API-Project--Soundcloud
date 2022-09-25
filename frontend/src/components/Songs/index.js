import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, Route, useParams, useHistory } from 'react-router-dom';
import { getSongs } from '../../store/songs';
import './songs.css'
import CreateSongForm from './createSongForm';
import EditSongForm from './EditSongform';
import SongDetail from './songDetails';
import Player from '../AudioPlayer'
import { useAudio } from '../../context/audioPlayer';
import button from './playButton2.jpg'


 const SongPage = () => {
  const { id } = useParams()
  const dispatch = useDispatch()
  const songs = useSelector(state =>  state.songs)
  const sessionUser = useSelector(state => state.session.user);
  const songList = Object.values(songs)
  const comments = useSelector((state) => state.comments);
  const user = useSelector((state) => state.session.user)
  const { url, setUrl} = useAudio()
  const history = useHistory()

  useEffect(() => {
    dispatch(getSongs())
  }, [dispatch])

  if(!sessionUser || sessionUser == {}) return null
  else return (


        <div className='songPage-container'>
          <p className="songs-banner">Hear the latest posts on Sonic Cloud</p>
            {songList.map((song) =>{
              return (
                <div key={song.id} className="song-container">
                    <img alt={song.imageUrl} src={song.imageUrl} onClick={()=> {history.push(`/songs/${song.id}`)}}></img>

                    <div className="details-container">
                    <img className="play-button"src={button} onClick={()=> setUrl(song.url)}></img>

                        <div className="songstuff">
                            <p className="title-field">{song.title}</p>
                            <p className="artist-name">{song.Artist.username}</p>
                        </div>
                    </div>
                  <NavLink className="detail-navlink" key={song.id} to={`/songs/${song.id}`}>View Song Details Here</NavLink>
                  <h4></h4>

                    <div className="song-button-div">
                  </div>
                </div>
              )
            })}
        </div>




  )
}

export default SongPage
