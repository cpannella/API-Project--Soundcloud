import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import { useAudio } from '../../context/audioPlayer';
import { getOneSong } from '../../store/songs';
import './player.css'
// import 'react-h5-audio-player/lib/styles.less' Use LESS
// import 'react-h5-audio-player/src/styles.scss' Use SASS

const Player = () => {
  const { url, setUrl } = useAudio()
  console.log('this is the audio player')
  return (
  <AudioPlayer className='audio-player'
    showSkipControls={false}
    src={url}
    onPlay={e => console.log("onPlay")}
    // other props here
  />
);}

export default Player
