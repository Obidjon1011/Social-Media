import React, { useEffect, useState } from 'react';
import './SignUp.css'
import firebase from 'firebase/compat/app';
import { auth } from '../Service/Firebase';

function Sign({ setuserName }) {
    const [user, setUser] = useState(null);
    // const [isLogin, setisLogin] = useState(true)
    // const [username, setusername] = useState('');
    // const [email, setemail] = useState('');
    // const [password, setpassword] = useState('');

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((authUser) => {
            if (authUser) {
                setUser(authUser)
                console.log(authUser);
            } else {
                setUser(null)
            }
        })

        return () => {
            unsubscribe()
        }
    }, []);


    const signInWithGoogle = () => {
        const provider = new firebase.auth.GoogleAuthProvider()
        auth.signInWithPopup(provider)
    }

    // const signUpWithEmail = () => {
    //     auth.createUserWithEmailAndPassword(email, password)
    //         .then((authUser) => {
    //             return authUser.user.updateProfile({
    //                 displayName: username
    //             })
    //         })
    //         .catch(error => alert(error.message))

    // }

    // const signInWithEmail = () => {
    //     auth.signInWithEmail(email, password)
    //         .catch(error => alert(error.message))
    // }

    if (user?.displayName) {
        setuserName(user.displayName)
    }

    return (
        <div className='LoginPageBg'>
            <div className='rounded bg-white p-3'>
                <h4 className='text-center'>Sign In with Google</h4>
                <div className='text-center'>
                    <button onClick={signInWithGoogle} className='btn btn-outline-dark mt-3'><i className='bi bi-google me-2'></i>Sign In with Google</button>
                </div>
                {/* <p className='text-center'>or</p>
                {
                    isLogin ?
                        <div>
                            <input type="email" className='form-control my-3' value={email} onChange={(e) => setemail(e.target.value)} placeholder='Enter email' />
                            <input type="password" className='form-control my-3' value={password} onChange={(e) => setpassword(e.target.value)} placeholder='Enter password' />
                            <button onClick={signInWithEmail} className='btn btn-primary w-100'>Submit</button>
                            <p className='mt-3 text-center' style={{ fontSize: '14px' }}>Not registered yet? <span className='text-underline text-primary' style={{ cursor: 'pointer' }} onClick={() => setisLogin(false)}>Create an Account</span></p>
                        </div>
                        :
                        <div>
                            <input type="text" className='form-control my-3' value={username} onChange={(e) => setusername(e.target.value)} placeholder='Enter username' />
                            <input type="email" className='form-control my-3' value={email} onChange={(e) => setemail(e.target.value)} placeholder='Enter email' />
                            <input type="password" className='form-control my-3' value={password} onChange={(e) => setpassword(e.target.value)} placeholder='Enter password' />
                            <button onClick={signUpWithEmail} className='btn btn-primary w-100'>Submit</button>
                            <p className='mt-3 text-center' style={{ fontSize: '14px' }}>Already registered? <span className='text-underline text-primary' style={{ cursor: 'pointer' }} onClick={() => setisLogin(true)}>Sign In</span></p>
                        </div>
                } */}
            </div>
        </div>
    );
}

export default Sign;
