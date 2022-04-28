import React, { useEffect, useState, Fragment, useContext } from "react";
import Axios from "axios";
import ReactHtmlParser from "react-html-parser";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

import { AuthContext } from "../../Helpers/AuthContext";

import { Container, Row, Col, Form } from "react-bootstrap";
import { FcCamera, FcVideoCall } from "react-icons/fc";
import {
  BsXCircleFill,
  BsClockFill,
  BsThreeDotsVertical,
  BsTrash,
} from "react-icons/bs";
import { BiMessageCheck, BiMinusCircle } from "react-icons/bi";
import { FaComments, FaShare } from "react-icons/fa";
import { toast } from "react-toastify";

import Heading from "../Heading";
import MiddleBanner from "./MiddleBanner";
import PostOwnerProfile from "./PostOwnerProfile";
import Comment from "./Comment";
import Report from "./Report";
import Like from "./Like";

function Posts(props) {
  const userID = props.userID;
  const { authState, setAuthState } = useContext(AuthContext);

  const [viewProfile, setViewProfile] = useState("avatar/male.svg");
  const [postList, setPostList] = useState([]);

  useEffect(() => {
    Axios.get(
      `${process.env.REACT_APP_SERVER_DOMAIN}/home/userProfile/` + userID,
      {
        headers: {
          accessToken: localStorage.getItem("accessToken"),
        },
      }
    ).then((response) => {
      const profileDetail1 = response.data[0];
      const profileDetail2 = response.data[1];

      var profile;

      if (profileDetail1.length === 0) {
        if (authState.company === 1) {
          profile = `${process.env.REACT_APP_SERVER_DOMAIN}/public/Assests/Images/avatar/bp.png`;
          setViewProfile(profile);
        } else {
          if (profileDetail2[0].gender === "Male") {
            profile = `${process.env.REACT_APP_SERVER_DOMAIN}/public/Assests/Images/avatar/male.svg`;
            setViewProfile(profile);
          } else {
            profile = `${process.env.REACT_APP_SERVER_DOMAIN}/public/Assests/Images/avatar/female.svg`;
            setViewProfile(profile);
          }
        }
      } else {
        profile =
          `${process.env.REACT_APP_SERVER_DOMAIN}/public/Assests/Images/user/` +
          profileDetail1[0].profile_photo;
        setViewProfile(profile);
      }
    });
  });

  useEffect(() => {
    Axios.get(`${process.env.REACT_APP_SERVER_DOMAIN}/home/postList`).then(
      (response) => {
        setPostList(response.data);
      }
    );
  }, []);

  //Text Input
  const [postText, setPostText] = useState("");

  //Image Input
  const [postImage, setPostImage] = useState();
  const [postImageName, setPostImageName] = useState("");
  const [postVideo, setPostVideo] = useState();
  const [postVideoName, setPostVideoName] = useState("");
  const [imageLength, setImageLength] = useState(false);
  const [videoLength, setVideoLength] = useState(false);

  //IMAGE INPUT
  const imageChange = (event) => {
    let imageFile = event.target.files[0];

    if (event.target.files && event.target.files.length > 0) {
      setPostImage(imageFile);
      setPostImageName(imageFile.name);
      setImageLength(true);
    }

    if (imageFile.size > 5e6) {
      setPostImage();
      setImageLength(false);
      return toast.warn(
        <Fragment>
          <span>Please upload a file smaller than 5 MB</span>
        </Fragment>
      );
    }

    if (!imageFile.name.match(/\.(jpg|jpeg|png|gif)$/)) {
      setPostImage();
      setImageLength(false);
      return toast.warn(
        <Fragment>
          <span>
            Invalid File Upload. Please Try to Upload file with jpg, jpeg, png
            or gif
          </span>
        </Fragment>
      );
    }
  };

  const removeSelectedImage = () => {
    setPostImage();
    setImageLength(false);
  };

  //VIDEO INPUT
  const videoChange = (event) => {
    let videoFile = event.target.files[0];

    if (event.target.files && event.target.files.length > 0) {
      setPostVideo(videoFile);
      setPostVideoName(videoFile.name);

      setVideoLength(true);
    }

    if (event.target.files[0].size > 5e7) {
      setPostVideo();
      setVideoLength(false);
      return toast.warn(
        <Fragment>
          <span>Please upload a file smaller than 50 MB</span>
        </Fragment>
      );
    }

    if (!videoFile.name.match(/\.(mp4)$/)) {
      setPostVideo();
      setVideoLength(false);
      return toast.warn(
        <Fragment>
          <span>Invalid File Upload. Please Try to Upload file with mp4</span>
        </Fragment>
      );
    }
  };
  const removeSelectedVideo = () => {
    setPostVideo();
    setVideoLength(false);
  };

  //Form Input
  let createPostFormIsValid = false;

  if (postText !== "" || imageLength || videoLength) {
    createPostFormIsValid = true;
  }

  const createPostFormSubmissionHandler = (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("file", postImage);
    formData.append("fileName", postImageName);

    formData.append("fileVideo", postVideo);
    formData.append("fileVideoName", postVideoName);

    formData.append("text", postText);
    formData.append("userID", userID);
    
    Axios.post(
      `${process.env.REACT_APP_SERVER_DOMAIN}/home/createPost`,
      formData
    ).then((response) => {
      const newpostData = response.data[1];
      if (response.data[0].error) {
        return toast.error(
          <Fragment>
            <BiMinusCircle /> <span>{response.data[0].error}</span>
          </Fragment>
        );
      } else {
        return [
          toast.success(
            <Fragment>
              <BiMessageCheck /> <span>{response.data[0].success}</span>
            </Fragment>
          ),
          setPostList([
            {
              post_id: newpostData[0].post_id,
              post_text: newpostData[0].post_text,
              post_image: newpostData[0].post_image,
              post_video: newpostData[0].post_video,
              owner_user_id: newpostData[0].owner_user_id,
              name: newpostData[0].name,
              time: newpostData[0].time,
              company: newpostData[0].company,
              companyname: newpostData[0].companyname,
            },
            ...postList,
          ]),
        ];
      }
    });
    document.getElementById("closeButton").click();
    setPostText("");
    setPostImage("");
    setPostVideo("");
  };

  //DELETE POST
  const deletePost = (event) => {
    const deletePostID = event.target.value;

    Axios.patch(
      `${process.env.REACT_APP_SERVER_DOMAIN}/home/deletePost/` + deletePostID
    ).then((response) => {
      if (response.data.error) {
        return toast.error(
          <Fragment>
            <BiMinusCircle /> <span>{response.data.error}</span>
          </Fragment>
        );
      } else {
        return [
          toast.success(
            <Fragment>
              <BiMessageCheck /> <span>{response.data.success}</span>
            </Fragment>
          ),
          setPostList(
            postList.filter((postDetails) => {
              /* eslint-disable-next-line */
              return postDetails.post_id != deletePostID;
            })
          ),
        ];
      }
    });
  };

  const copyPostLink = (sharePostLink) => {
    navigator.clipboard.writeText(sharePostLink);
    return toast.dark(
      <Fragment>
        <BiMessageCheck />
        <span>Copied to the clipboard!</span>
      </Fragment>
    );
  };

  return (
    <>
      <AuthContext.Provider value={{ authState, setAuthState }}>
        <div className="card py-3 mb-3">
          <Container>
            <Row className="mx-auto my-2">
              <Col xs={2} sm={1} className="d-flex p-0">
                <img
                  src={viewProfile}
                  className=" my-auto rounded-circle"
                  width="50"
                  height="50"
                  alt="Zom-IN User"
                />
              </Col>
              <Col xs={10} sm={11}>
                <div className="d-grid gap-2 createPost">
                  <button
                    className="btn btn-outline-secondary rounded-pill text-start p-3 fw-bold"
                    type="button"
                    data-bs-toggle="modal"
                    data-bs-target="#createPostModal"
                  >
                    Share your thoughts...
                  </button>
                </div>
              </Col>
            </Row>
            <Row>
              <Col xs={6} sm={6} className="p-2 text-end">
                <button
                  className="btn btn-outline-light fw-bold border-0 text-dark themeColorUser"
                  type="button"
                  data-bs-toggle="modal"
                  data-bs-target="#createPostModal"
                >
                  <FcCamera className="icon" /> Photos
                </button>
              </Col>
              <Col xs={6} sm={6} className="p-2 text-start border-start">
                <button
                  className="btn btn-outline-light fw-bold border-0 text-dark themeColorUser"
                  type="button"
                  data-bs-toggle="modal"
                  data-bs-target="#createPostModal"
                >
                  <FcVideoCall className="icon" /> Videos
                </button>
              </Col>
            </Row>
            <div
              className="modal fade"
              id="createPostModal"
              data-bs-backdrop="static"
              data-bs-keyboard="false"
              tabIndex="-1"
              aria-labelledby="staticBackdropLabel"
              aria-hidden="true"
            >
              <div className="modal-dialog modal-dialog-scrollable">
                <div className="modal-content">
                  <div className=" modal-header">
                    <Heading content="Create Post" design="h5 " />
                    <button
                      type="button"
                      id="closeButton"
                      className="btn-close"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                    ></button>
                  </div>
                  <Form
                    className="createPostForm"
                    onSubmit={createPostFormSubmissionHandler}
                    encType="multipart/form-data"
                  >
                    <div className="modal-body mt-3 mb-0 mx-0 p-0">
                      <CKEditor
                        editor={ClassicEditor}
                        config={{
                          placeholder: "Share your thoughts...",
                          removePlugins: [
                            "Heading",
                            "Essentials",
                            "Italic",
                            "Bold",
                            "imageUpload",
                            "EasyImage",
                            "ImageUpload",
                            "MediaEmbed",
                            "BlockQuote",
                            "List",
                            "Indent",
                            "Table",
                            // "link"
                          ],
                        }}
                        data={postText}
                        onChange={(event, editor) => {
                          const data = editor.getData();
                          setPostText(data);
                        }}
                      />

                      {postImage && (
                        <div className="m-2 w-75 mx-auto border border-5 themeColorUser rounded imgPostPreview">
                          <div className="position-relative">
                            <div className="position-absolute top-0 start-100 translate-middle">
                              <button
                                onClick={removeSelectedImage}
                                className="bg-transparent rounded-circle border-0 position-relative"
                              >
                                <BsXCircleFill
                                  size={21}
                                  className="bg-white rounded-circle"
                                />
                              </button>
                            </div>
                          </div>
                          <img
                            src={URL.createObjectURL(postImage)}
                            className="w-100"
                            alt=" Upload"
                          />
                        </div>
                      )}

                      {postVideo && (
                        <div className="m-2 w-75 mx-auto border border-5 themeColorUser rounded imgPostPreview">
                          <div className="position-relative">
                            <div className="position-absolute top-0 start-100 translate-middle">
                              <button
                                onClick={removeSelectedVideo}
                                className="bg-transparent rounded-circle border-0 position-relative"
                              >
                                <BsXCircleFill
                                  size={21}
                                  className="bg-white rounded-circle"
                                />
                              </button>
                            </div>
                          </div>
                          <video controls className="w-100">
                            <source
                              className="w-100"
                              alt="Video Upload"
                              src={URL.createObjectURL(postVideo)}
                            />
                          </video>
                        </div>
                      )}

                      <Row className="p-3">
                        <Col xs={6} sm={6} className="p-2 text-end">
                          <span className=" badge fw-bold border-0 text-dark p-3 fs-6 position-relative overflow-hidden themeColorUser inputPostFile">
                            <FcCamera className="icon" /> Photos
                            <input
                              type="file"
                              accept="image/*"
                              onChange={imageChange}
                            />
                          </span>
                        </Col>
                        <Col
                          xs={6}
                          sm={6}
                          className="p-2 text-start border-start"
                        >
                          <span className="badge fw-bold border-0 text-dark p-3 fs-6 position-relative overflow-hidden themeColorUser inputPostFile">
                            <FcVideoCall className="icon" /> Videos
                            <input
                              type="file"
                              accept="video/*"
                              onChange={videoChange}
                            />
                          </span>
                        </Col>
                      </Row>
                    </div>
                    <div className="modal-footer">
                      <button
                        type="submit"
                        disabled={!createPostFormIsValid}
                        className="btn btn-primary"
                        onClick={props.updatePost}
                      >
                        Post
                      </button>
                    </div>
                  </Form>
                </div>
              </div>
            </div>
          </Container>
        </div>
        <MiddleBanner />

        {postList.map((postDetails, key) => {
          const postID = postDetails.post_id;
          const postText = postDetails.post_text;
          const postImageName = postDetails.post_image;
          const postVideoName = postDetails.post_video;
          const postOwnerID = postDetails.owner_user_id;
          const postUserName = postDetails.name;
          const postingTime = new Date(postDetails.time);
          const postCompany = postDetails.company;
          const postCompanyName = postDetails.companyname;

          const postTime = postingTime
            .toLocaleDateString("en-GB", {
              day: "numeric",
              month: "short",
              year: "numeric",
              hour: "2-digit",
              minute: "2-digit",
              hour12: true,
            })
            .replace(/ /g, " ");

          const postImage =
            `${process.env.REACT_APP_SERVER_DOMAIN}/public/Assests/Images/post/` +
            postImageName;
          const postVideo =
            `${process.env.REACT_APP_SERVER_DOMAIN}/public/Assests/Videos/post/` +
            postVideoName;

          const sharePostLink = "https://www.zom-in.com/#" + postID;
          if (postCompany === 1) {
            var postCompanyLink =
              "/partner/" +
              postCompanyName.toLowerCase().trim().split(/\s+/).join("-");
          }

          return (
            <Container key={postID} id={postID} className="border p-2 mb-3">
              <Row className="mb-3">
                <Col xs={10} sm={10} className="text-start">
                  <Row>
                    <Col xs={2} sm={1} className="p-0 ps-2">
                      <PostOwnerProfile postOwnerID={postOwnerID} />
                    </Col>
                    <Col xs={10} sm={10} className="">
                      <Row>
                        <Col sm={12}>
                          <p className="my-auto fw-bold">
                            {postCompany === 1 ? (
                              <a
                                href={postCompanyLink}
                                target="_blank"
                                rel="noreferrer"
                                className="text-decoration-none text-dark"
                              >
                                {postCompanyName}
                              </a>
                            ) : (
                              <a
                                href="/home"
                                className="text-decoration-none text-dark"
                              >
                                {" "}
                                {postUserName}
                              </a>
                            )}
                          </p>
                        </Col>
                        <Col sm={12}>
                          <p className="text-muted fw-light fs-7">
                            <BsClockFill size={12} className="me-1" />
                            {postTime}
                          </p>
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                </Col>
                <Col xs={2} sm={2} className="text-end">
                  <div className="dropdown">
                    <button
                      className="btn shadow-none"
                      type="button"
                      id="dropdownMenuButton1"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      <BsThreeDotsVertical />
                    </button>
                    <ul
                      className="dropdown-menu dropdown-menu-end"
                      aria-labelledby="dropdownMenuButton1"
                    >
                      {postOwnerID === userID && (
                        <>
                          <li>
                            <button
                              type="button"
                              className="btn btn-link dropdown-item"
                              value={postID}
                              onClick={deletePost}
                            >
                              <BsTrash className="icon" /> Delete
                            </button>
                          </li>
                          <li>
                            <hr className="dropdown-divider" />
                          </li>
                        </>
                      )}
                      <li>
                        <Report
                          postID={postID}
                          userID={userID}
                          postOwnerID={postOwnerID}
                        />
                      </li>
                    </ul>
                  </div>
                </Col>
              </Row>
              <Row className="mb-3">
                <Col sm={12} className="px-3 text-decoration-none">
                  {postText !== "" && ReactHtmlParser(postText)}
                  {postImageName !== "" && (
                    <img
                      src={postImage}
                      alt="Zom-IN Posting"
                      className="w-100 mb-2"
                    />
                  )}
                  {postVideoName !== "" && (
                    <video controls className="d-flex w-75 mx-auto">
                      <source
                        className="w-75"
                        alt="Zom-IN video post"
                        src={postVideo}
                      />
                    </video>
                  )}
                </Col>
              </Row>
              <Row>
                <Col sm={12}>
                  <hr className="dropdown-divider" />
                </Col>
                <Like postID={postID} />
                <Col
                  xs={4}
                  sm={4}
                  className="text-center link-secondary border-start border-end px-0 px-md-1 px-lg-1"
                  data-bs-toggle="collapse"
                  href={`#col-${postID}`}
                  role="button"
                  aria-expanded="false"
                  aria-controls={`col-${postID}`}
                >
                  <FaComments className="icon icon-xs" />
                  Comment
                </Col>

                <Col
                  xs={4}
                  sm={4}
                  className="text-center link-secondary "
                  role="button"
                  onClick={() => copyPostLink(sharePostLink)}
                >
                  <FaShare className="icon icon-xs" />
                  Share
                </Col>

                <Col className="collapse" id={`col-${postID}`}>
                  <Comment userID={userID} postID={postID} />
                </Col>
              </Row>
            </Container>
          );
        })}
      </AuthContext.Provider>
    </>
  );
}

export default Posts;
