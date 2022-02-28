import React, { useContext, useEffect, useState } from 'react'
import './Home.css'
import { Avatar } from '@material-ui/core'
import { db } from '../../Service/Firebase'
import firebase from "firebase/compat/app";
import { UserNameContext } from '../../App';


export default function Home({ caption, username, imageUrl, postId }) {
    const [Comments, setComments] = useState([]);
    const [openComment, setopenComment] = useState(false);
    const displayName = useContext(UserNameContext);


    useEffect(() => {
        if (postId) {
            db.collection('posts')
                .doc(postId)
                .collection('comments')
                .orderBy("timestamp", "desc")
                .onSnapshot((snapshot) => {
                    setComments(snapshot.docs.map((doc) => doc.data()))
                })
        }

    }, [postId]);


    const AddComment = (e) => {
        e.preventDefault();
        db.collection('posts')
            .doc(postId)
            .collection('comments')
            .add({
                comment: e.target[0].value,
                username: displayName,
                timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            })
        e.target[0].value = ''
    }

    return (
        <div className='borderCustom bg-white mb-4 '>
            <div className='d-flex align-items-center my-2 p-2'>
                <Avatar alt={username} src='/static/images/avatar/1.jpg' />
                <h4 className='my-0 ms-2 '>{username} <i className='bi bi-patch-check-fill text-primary'></i></h4>
            </div>
            <div>
                <div >
                    <img className='w-100 post__image' src={imageUrl} alt="" />
                </div>
                <div className='p-lg-3'>
                    <div className='d-flex align-items-center mb-2'>
                        {
                            openComment ?
                                <i className="bi bi-chat-fill fs-3 mx-2" onClick={() => setopenComment(!openComment)}></i>
                                :
                                <i className='bi bi-chat fs-3 mx-2' onClick={() => setopenComment(!openComment)}></i>
                        }
                    </div>
                    <p><strong className='me-2'>{username}</strong>{caption}</p>
                </div>
            </div>

            {
                openComment ?
                    <div className='p-3'>
                        <h6>Comments:</h6>
                        {
                            Comments.map((comment, index) => {
                                return (
                                    <div key={index}>
                                        <p><strong className='me-2'>{comment.username}: </strong>{comment.comment}</p>
                                    </div>
                                )
                            })

                        }
                        <form onSubmit={AddComment}>
                            <div className='d-flex' >
                                <input type="text" placeholder='Add Comment...' className='form-control' />
                                <button type='submit' className='btn btn-outline-primary'>Post</button>
                            </div>
                        </form>
                    </div> :
                    ''
            }
        </div>
    )
}
