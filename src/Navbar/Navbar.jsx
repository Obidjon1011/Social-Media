import { Link } from 'react-router-dom'
import React from 'react'
import UploadImage from '../Components/UploadImage'
import { auth } from '../Service/Firebase'
import './Navbar.css'

export default function Navbar() {

    const SignOutFunc = () => {
        let confirm = window.confirm('Are you sure you want to delete the account?')
        if (confirm) {
            auth.signOut()
        }
    }


    return (
        <div className='my-md-3  container'>
            <div className='bg-white p-2 borderCustom d-flex justify-content-between alig-items-center'>
                <div>
                <Link to='/' className='text-dark text-decoration-none'>
                    <h1 className='m-0'>Dev Off</h1>
                </Link>
                </div>
                <div className='d-flex align-items-center'>
                    <button type="button" className="btn" data-bs-toggle="modal" data-bs-target="#exampleModal">
                        <i className='bi bi-plus-square fs-4'></i>
                    </button>
                    <Link to='/chat' className='text-dark'>
                        <i className="bi bi-chat-text fs-4 mx-2" ></i>
                    </Link>
                    <button className='btn fs-4' onClick={SignOutFunc}><i className="bi bi-box-arrow-right fs-4 ms-2"></i></button>
                </div>
            </div>
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Upload Image</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <UploadImage />
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
