import React, { Fragment, useEffect, useState } from 'react';
import { useParams , } from 'react-router-dom';

import Axios from 'axios';
import { BiError, BiMessageCheck, BiMinusCircle } from "react-icons/bi";
import { useNavigate } from "react-router-dom";

//Toast
import { toast } from "react-toastify";

function ResetPasswordToken() {
    const navigate = useNavigate();
    const { token } = useParams();
    const [validToken, setValidToken] = useState(false);

    useEffect(() => {
        if (token) {
            Axios.post(`${process.env.REACT_APP_SERVER_DOMAIN}/verify/resetpassword/token`, {
                token: token
            })
                .then((response) => {
                    if (response.data.success) {
                        return [toast.success(
                            <Fragment>
                                <BiMessageCheck />
                                <span>{response.data.success}</span>
                            </Fragment>
    
                        ),setValidToken(true)];
                    } else if (response.data.warn) {
                        return toast.warn(
                            <Fragment>
                                <BiError />
                                <span>{response.data.warn}</span>
                            </Fragment>);
                    }  else {
                        return toast.error(
                            <Fragment>
                                <BiMinusCircle />
                                <span>{response.data.error}</span>
                            </Fragment>);
                    }
                }).then(
                    navigate("/signup")
                );
        }
        else {
            return toast.error(
                <Fragment>
                    <BiMinusCircle />
                    <span>System is Error. Please Try Again!</span>
                </Fragment>);
        }
    
    
    
        if (token === null) {
            navigate("/");
        }
      }, []);



    return (
        <Fragment>
           <p>{validToken ? "HEllo" : "No token"}</p>
        </Fragment>
    );


}

export default ResetPasswordToken;