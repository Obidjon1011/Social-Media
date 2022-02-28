import { Container } from '@material-ui/core'
import React, { useEffect, useRef, useState } from 'react'
import { auth, db } from '../Service/Firebase';
import firebase from "firebase/compat/app";
import './Chat.css'
import Navbar from '../Navbar/Navbar';

export default function Chat() {
    const [msg, setmsg] = useState('');
    const [messages, setmessages] = useState([]);
    const scroll = useRef()

    useEffect(() => {
        db.collection('messages').orderBy('createdAt').limit(50).onSnapshot((snapshot) => {
            setmessages(snapshot.docs.map(doc => doc.data()))
        })
    }, []);

    async function sendMessage(e) {
        e.preventDefault()
        const { uid, photoURL } = auth.currentUser
        if (msg === '') {
            alert('Maydonlarni to`ldiring')
        } else {
            await db.collection('messages').add({
                text: msg,
                photoURL,
                uid,
                createdAt: firebase.firestore.FieldValue.serverTimestamp()
            })
        }
        setmsg('')
        scroll.current.scrollIntoView({ behavior: 'smooth' })
    }
    return (
        <div>
            <Navbar />
            <Container>
                <div className='msgs'>
                    {
                        messages.map(({ id, text, photoURL, uid }) => {
                            return (
                                <div key={id}>
                                    <div className={`msg ${uid === auth.currentUser.uid ? 'sent' : 'received'}`} >
                                        <img className='user-image' src={photoURL} alt='' />
                                        <p>{text}</p>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
                <div ref={scroll}></div>
                <div className='bg-white d-flex justify-content-center align-items-center'>
                    <div>
                        <form onSubmit={sendMessage}>
                            <div className='sendMsg'>
                                <input value={msg} onChange={(e) => setmsg(e.target.value)} type="text" placeholder='Write a message...' />
                                <button type='submit' className='btn btn-primary'>Send</button>
                            </div>
                        </form>
                    </div>
                </div>
            </Container>
        </div>
    )
}
