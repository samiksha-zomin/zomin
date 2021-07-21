import React, { Fragment, useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Axios from 'axios';

import Header from '../Components/Header';
import Heading from '../Components/Heading';

//Icon
import { Button, Form } from 'react-bootstrap';
import { FaGoogle, FaFacebook } from 'react-icons/fa';
import { BiError, BiMessageCheck } from "react-icons/bi";

//Toast
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

//Custom Style
import '../Styles/signup.css';




function SignUp() {

    //SignUp form or LogIn form
    const [userIsRegistered, setLogin] = useState(false);

    function getLogin() {
        setLogin(!userIsRegistered);
    }

    //SignUp Form
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [contactNumber, setContactNumber] = useState("");
    const [password, setPassword] = useState("");


    useEffect(() => {

    }, []);

    // const handleChange = (event) => {
    //     //Set the value of tweet
    //     setFullName(event && event.target.value ? event.target.value : "");
    // }


    const save = (event) => {
        if (fullName && email && contactNumber && password) {
            Axios.post('http://localhost:3001/auth/signup', {
                fullName: fullName,
                email: email,
                contactNumber: contactNumber,
                password: password
            })
                .then((response) => {
                    if (response.data === 'Email sent successfully') {
                        console.log(response.data);
                        return toast.success(
                        <Fragment>
                            <BiMessageCheck />
                            <span>Email sent successfully!</span>
                        </Fragment>);
                        
                    } else if (response.data === 'Email Exist!') {
                        return toast.error(
                            <Fragment>
                                <BiError />
                                <span>This Email already exists!</span>
                            </Fragment>
                        );
                        //return window.location.href = '/index';
                    } else if (response.data === 'Invalid Email!') {
                        return toast.error(
                            <Fragment>
                                <BiError />
                                <span>This Email is Invalid!</span>
                            </Fragment>
                        );
                    } else {
                        console.log(response.data);
                        <Fragment>
                        <BiError />
                        <span>System is Error. Please Try Again!</span>
                    </Fragment>
                    }
                });
        }; event.preventDefault();
        setEmail("");
        setFullName("");
        setContactNumber("");
        setPassword("");
    };

    //LogIn Form
    const [emailConf, setEmailConf] = useState("");
    const [passwordConf, setPasswordConf] = useState("");

    return (
        <Fragment>
            <Helmet>
                <title>Sign Up</title>
            </Helmet>
            <Header />
            <div id="signUp" className="col-11 col-md-9 text-center">
                <div className="row">
                    <div className="col-12 col-md-6">
                        {userIsRegistered ?
                            <div>

                                <Heading content="Log In Now!" />
                                <Form>
                                    <Form.Group className="mb-3" controlId="exampleForm.ControlEmail">
                                        <Form.Control
                                            size="sm"
                                            type="email"
                                            required
                                            name="email"
                                            placeholder="Email Address"
                                            value={emailConf}
                                            onChange={(e) => {
                                                setEmailConf(e.target.value);
                                            }}
                                        />
                                    </Form.Group>
                                    <Form.Group className="mb-3" controlId="exampleForm.ControlPassword">
                                        <Form.Control
                                            size="sm"
                                            type="password"
                                            required
                                            name="password"
                                            placeholder="Password"
                                            value={passwordConf}
                                            onChange={(e) => {
                                                setPasswordConf(e.target.value);
                                            }}
                                        />
                                    </Form.Group>
                                </Form>
                            </div>

                            :
                            <div>
                                <Heading content="Sign Up Now!" />


                                <Form id="signUpForm">
                                    <Form.Group className="mb-3" controlId="exampleForm.ControlFullName">
                                        <Form.Control
                                            size="sm"
                                            type="text"
                                            required
                                            name="fullName"
                                            placeholder="Full Name"
                                            value={fullName}
                                            onChange={(e) => {
                                                setFullName(e.target.value);
                                            }}
                                        />
                                    </Form.Group>
                                    <Form.Group className="mb-3" controlId="exampleForm.ControlEmail">
                                        <Form.Control
                                            size="sm"
                                            type="email"
                                            required
                                            name="email"
                                            placeholder="Email Address"
                                            value={email}
                                            onChange={(e) => {
                                                setEmail(e.target.value);
                                            }}
                                        />
                                    </Form.Group>

                                    <Form.Group className="mb-3" controlId="exampleForm.ControlContactNumber">
                                        <Form.Control
                                            size="sm"
                                            type="tel"
                                            required
                                            name="contactNumber"
                                            placeholder="Contact Number"
                                            value={contactNumber}
                                            onChange={(e) => {
                                                setContactNumber(e.target.value);
                                            }}
                                        />
                                    </Form.Group>
                                    <Form.Group className="mb-3" controlId="exampleForm.ControlPsssword">
                                        <Form.Control
                                            size="sm"
                                            type="password"
                                            required
                                            name="password"
                                            placeholder="Password"
                                            value={password}
                                            onChange={(e) => {
                                                setPassword(e.target.value);
                                            }}

                                        />
                                    </Form.Group>
                                    <div className="mb-3">
                                        <label>By clicking sign up, you agree to Zom-In's <a className="text-decoration-none" href="https://github.com" >Privacy Policy</a> and <a className="text-decoration-none" href="https://github.com">Term of Use</a></label>
                                    </div>
                                    <Button variant="primary" type="submit" onClick={save}>
                                        Sign Up
                                    </Button>
                                </Form>
                                {/* <h1>{signUpStatus}</h1> */}

                            </div>

                        }

                        <div className="row">
                            <div className="col">
                                <div className=" text-start">

                                    <Button variant="link">{userIsRegistered ? "Forget Password?" : null}</Button>
                                </div>
                            </div>
                            <div className="col">
                                <div className=" text-end">
                                    <Button variant="link" onClick={getLogin} >{userIsRegistered ? "Don't have an account?" : "Already have an account?"} </Button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-12 col-md-6 divider ">
                        <Heading content={userIsRegistered ? "Log In with Social Network" : "Sign Up with Social Network"} />
                        <div className="mb-5 d-grid gap-3">
                            <Button variant="btnGoogle" href="/google"><FaGoogle />{' '}{userIsRegistered ? "Log In with Google" : "Sign Up with Google"}</Button>
                        </div>
                        <div className="mb-5 d-grid gap-3">
                            <Button variant="btnFacebook" href="/facebook"><FaFacebook />{' '}{userIsRegistered ? "Log In with Facebook" : "Sign Up with Facebook"}</Button>
                        </div>
                    </div>
                </div>
            </div>

            <ToastContainer
                position="bottom-left"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
        </Fragment>
    )
}

export default SignUp;
