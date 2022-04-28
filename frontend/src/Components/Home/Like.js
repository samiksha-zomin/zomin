import React, { Fragment, useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import Axios from 'axios';

import { Col } from "react-bootstrap";
import { FaThumbsUp } from "react-icons/fa";
import { BiMinusCircle } from "react-icons/bi";

//Toast
import { toast } from "react-toastify";

function Like(props) {
const navigate = useNavigate();
    const postID = props.postID;

    const [likeStatus, setLikeStatus] = useState(false);

    useEffect(() => {
        if (localStorage.getItem("accessToken")) {
          Axios.get(
            `${process.env.REACT_APP_SERVER_DOMAIN}/home/likeStatus/` +
            postID,
            {
              headers: {
                accessToken: localStorage.getItem("accessToken"),
              },
            }
          ).then((response) => {
            const likedStatus = response.data;
            if (likedStatus.length > 0) {
                setLikeStatus(true);
            }
          });
        }
      });

      const likePost = (id) => {
        let likePostInfo = [id];
    
        if (!localStorage.getItem("accessToken")) {
          return [
            navigate("/signup"),
            toast.warn(
              <Fragment>
                <BiMinusCircle />
                <span>Please Sign In /Sign Up before like posts</span>
              </Fragment>
            ),
          ];
        } else {
          Axios.post(
            `${process.env.REACT_APP_SERVER_DOMAIN}/home/like`,
            {
                postID: likePostInfo[0],
            },
            {
              headers: {
                accessToken: localStorage.getItem("accessToken"),
              },
            }
          ).then((response) => {
            if (response.data.error) {
              return toast.error(
                <Fragment>
                  <BiMinusCircle /> <span>{response.data.error}</span>
                </Fragment>
              );
            } else {
              return (
              setLikeStatus(true)
              )
            }
          });
        }
      };

      const unlikePost = (id) => {
        let unlikePostInfo = [id];
    
        if (!localStorage.getItem("accessToken")) {
          return [
            navigate("/signup"),
            toast.warn(
              <Fragment>
                <BiMinusCircle />
                <span>Please Sign In /Sign Up before likes post</span>
              </Fragment>
            ),
          ];
        } else {
          Axios.post(
            `${process.env.REACT_APP_SERVER_DOMAIN}/home/unlike`,
            {
                postID: unlikePostInfo[0],
            },
            {
              headers: {
                accessToken: localStorage.getItem("accessToken"),
              },
            }
          ).then((response) => {
            if (response.data.error) {
              return toast.error(
                <Fragment>
                  <BiMinusCircle /> <span>{response.data.error}</span>
                </Fragment>
              );
            } else {
            return (
                setLikeStatus(false)
            )
            }
          });
        }
      };


    return (
    <>
    {likeStatus ? 
        <Col xs={4} sm={4} className="text-center link-primary" role="button" onClick={() => unlikePost(postID)}>
       <FaThumbsUp/> Like
      </Col>
       : 
       <Col xs={4} sm={4} className="text-center link-secondary" role="button" onClick={() => likePost(postID)}>
       <FaThumbsUp /> Like
      </Col>}
    </>
        
    )
}

export default Like
