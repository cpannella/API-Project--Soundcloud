import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';



const CreateSongForm = ({song}) => {
   


  //form inputs
  //title,
  //imageUrl
  //description
  //url for audio

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [audioUrl, setAudioUrl] = useState('')

  return (
    <div>
      <h2>Contact Us</h2>
      <form>
        <div>
          <label htmlFor='title'>Title:</label>
          <input
            id='title'
            type='text'
            onChange={e => setTitle(e.target.value)}
            value={title}
          />
        </div>
        <div>
          <label htmlFor='description'>Description:</label>
          <input
            id='description'
            type='text'
            onChange={e => setDescription(e.target.value)}
            value={description}
          />
        </div>
        <div>
          <label htmlFor='imageUrl'>imageUrl:</label>
          <input
            id='imageUrl'
            type='text'
            onChange={e => setImageUrl(e.target.value)}
            value={imageUrl}
          />
        </div>
        <button>Submit</button>
      </form>
    </div>
  );



}
