import {createContext, useContext, useState, useEffect} from 'react'

export const AudioPlayerContext = createContext()
export const useAudio = () => useContext(AudioPlayerContext)


export const AudioProvider = (props) => {
  const [url, setUrl] = useState('')


  return (
    <AudioPlayerContext.Provider value={{url, setUrl}}>
      {props.children}
    </AudioPlayerContext.Provider>
    )


}
