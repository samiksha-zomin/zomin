import React, { Fragment, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Axios from 'axios';
import { BiError, BiMessageCheck } from "react-icons/bi";

//Toast
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Verify() {
    useEffect(() => {

    }, []);
    const { token } = useParams();

    if (token) {
        Axios.post('http://localhost:3001/verify/token', {
            token: token
        })
            .then((response) => {
                if (response.data === 'Email Activated') {
                    return toast.success(
                        <Fragment>
                            <BiMessageCheck />
                            <span>Your Account  has been Verified. You may now Login!</span>
                        </Fragment>

                    );
                } else if (response.data === 'Email Cannot Activate!') {
                    return toast.warn(
                        <Fragment>
                            <BiError />
                            <span>Your Email cannot Verified. Please Try Again!</span>
                        </Fragment>);
                } else if (response.data === 'Invalid Token!') {
                    return toast.warn(
                        <Fragment>
                            <BiError />
                            <span>Invalid Token! Please Try Again!</span>
                        </Fragment>);
                } else {
                    return toast.error(
                        <Fragment>
                            <BiError />
                            <span>System is Error. Please Try Again!</span>
                        </Fragment>);
                }
            }).then(setTimeout(function () {
                window.location.href = '/index';
            }, 3000)
            );
    }
    else {
        return toast.error(
            <Fragment>
                <BiError />
                <span>System is Error. Please Try Again!</span>
            </Fragment>);
    }



    if (token === null) {
        window.location.href = '/index';
    }

    return (
        <Fragment>
            <ToastContainer
                position="top-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                render="/index"
            />
        </Fragment>
    );


}

export default Verify;
