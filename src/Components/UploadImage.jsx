import React, { useContext, useState } from 'react';
import {storage, db } from '../Service/Firebase'
import firebase from "firebase/compat/app";
import { UserNameContext } from '../App';


export default function UploadImage() {
  const [caption, setcaption] = useState('');
  const [Progress, setProgress] = useState(0);
  const [image, setimage] = useState(null);
  const userName = useContext(UserNameContext);

  const handleChange = (e) => {
    if (e.target.files[0]) {
      setimage(e.target.files[0])
    }
  }

  const handleUpload = () => {
    const uploadTask = storage.ref(`images/${image.name}`).put(image)
    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(progress)
      },
      (error) => {
        alert(error.message)
      },
      () => {
        storage.ref('images').child(image.name).getDownloadURL().then(url => {
          db.collection('posts').add({
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            caption: caption,
            imageUrl: url,
            username: userName
          });
        })
        setProgress(0)
        setcaption('')
        setimage(null)
      }
    )
  }

  return (
    <div className='uploadImage__wrapper'>

      <h1 className='text-center text-white'>Upload Image</h1>
      <div className='bg-white borderCustom d-flex flex-column p-4 my-3 justify-content-center'>
        <progress value={Progress} className='w-100 p-3' max='100' />
        <div className='my-3'>
          <input type="text" className='form-control me-3 mb-3 py-3' onChange={(e) => setcaption(e.target.value)} value={caption} placeholder='Enter Caption' />
          <input type="file" className='upload__file' onChange={handleChange} />
        </div>
          <button onClick={handleUpload} className='btn btn-primary py-3'>
            Upload <i className='bi bi-upload'></i>
          </button>
      </div>
    </div>
  );
}
