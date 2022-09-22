import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import { getOneSong } from '../../store/songs';
import './player.css'
// import 'react-h5-audio-player/lib/styles.less' Use LESS
// import 'react-h5-audio-player/src/styles.scss' Use SASS

const Player = () => (




  <AudioPlayer className='audio-player'
    // autoPlay
    src="https://cdn.pixabay.com/download/audio/2022/08/04/audio_2dde668d05.mp3?filename=goldn-116392.mp3"
    onPlay={e => console.log("onPlay")}
    // other props here
  />
);

export default Player
