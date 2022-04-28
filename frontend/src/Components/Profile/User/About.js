// import React, { useState, useEffect, Fragment } from "react";
// import { useNavigate } from "react-router-dom";
// import Axios from "axios";
// import { BiPencil, BiMinusCircle } from "react-icons/bi";
// import { FcAbout } from "react-icons/fc";
// import LocationIcon from "../../../Assests/Images/icon/location.svg";
// import ContactIcon from "../../../Assests/Images/icon/contact.svg";
// import DobIcon from "../../../Assests/Images/icon/dob.svg";
// import NationalityIcon from "../../../Assests/Images/icon/earth.svg";

// import { Col, Row, Form } from "react-bootstrap";
// import Heading from "../../Heading";
// import { toast } from "react-toastify";

// function About() {
//   const navigate = useNavigate();

//   const [aboutUser, setAboutUser] = useState({
//     name: "",
//     email: "",
//     contnum: "",
//     gender: "",
//     dob: "",
//     nationality: "",
//     user_address: "",
//     about_user: "",
//   });

//   useEffect(() => {
//     if (!localStorage.getItem("accessToken")) {
//       navigate("/signup");
//     } else {
//       Axios.get(
//         `${process.env.REACT_APP_SERVER_DOMAIN}/dashboardUserProfile/about/`,
//         {
//           headers: {
//             accessToken: localStorage.getItem("accessToken"),
//           },
//         }
//       ).then((response) => {
//         if (response.data.error) {
//           return toast.error(
//             <Fragment>
//               <BiMinusCircle /> <span>{response.data.error}</span>
//             </Fragment>
//           );
//         } else {
//           setAboutUser((aboutUser) => ({
//             ...aboutUser,
//             name: response.data[0].name,
//             email: response.data[0].email,
//             contnum: response.data[0].contnum,
//             gender: response.data[0].gender,
//             birthday: response.data[0].birthday,
//             nationality: response.data[0].nationality,
//             user_address: response.data[0].user_address,
//             about_user: response.data[0].about_user,
//           }));
//         }
//       });
//     }
//   }, []);

//   let aboutMeFormIsValid = false;

//   if (
//     aboutUser.name !== "" &&
//     aboutUser.contnum !== "" &&
//     aboutUser.gender !== "" &&
//     aboutUser.birthday !== "" &&
//     aboutUser.nationality !== "" &&
//     aboutUser.user_address !== "" &&
//     aboutUser.about_user !== ""
//   ) {
//     aboutMeFormIsValid = true;
//   }

//   const aboutMeFormSubmissionHandler = (event) => {
//     event.preventDefault();
//     // console.log(event.target.value)
//     console.log("hi");

//     console.log(aboutUser);
//     console.log(aboutUser.name);
//     console.log(aboutUser.birthday);
//     // if(!enteredNameIsValid) {
//     //   return;
//     // } else {
//     //   alert("sending")
//     // }

//     // resetNameInput();
//   };

//   return (
//     <>
//       <Row className="mx-auto border rounded p-2 my-2">
//         <Col sm={12}>
//           <Row>
//             <Col xs={10} sm={10} className="text-start">
//               <Heading content="About Me" design="h5" />
//             </Col>
//             <Col xs={2} sm={2} className="text-end align-self-center">
//               <p role="button" className="my-auto">
//                 <BiPencil
//                   className="icon"
//                   type="button"
//                   data-bs-toggle="modal"
//                   data-bs-target="#about"
//                 />
//               </p>
//             </Col>
//           </Row>
//         </Col>
//         <Col sm={12}>
//           <Col>
//             <>
//               {aboutUser.contnum !== null && (
//                 <p className="m-0 text-start fs-7 text-capitalize">
//                   <img alt="" src={ContactIcon} className="icon" />
//                   {aboutUser.contnum}
//                 </p>
//               )}
//               {aboutUser.user_address !== null && (
//                 <p className="m-0 text-start fs-7 text-capitalize">
//                   <img alt="" src={LocationIcon} className="icon" />
//                   {aboutUser.user_address}
//                 </p>
//               )}
//               {aboutUser.birthday !== null && (
//                 <p className="m-0 text-start fs-7 text-capitalize">
//                   <img alt="" src={DobIcon} className="icon" />
//                   {aboutUser.birthday}
//                 </p>
//               )}
//               {aboutUser.nationality !== null && (
//                 <p className="m-0 text-start fs-7 text-capitalize">
//                   <img alt="" src={NationalityIcon} className="icon" />
//                   {aboutUser.nationality}
//                 </p>
//               )}
//               {aboutUser.about_user !== null && (
//                 <p className="m-0 text-start fs-7">
//                   <FcAbout className="icon" />
//                   {aboutUser.about_user}
//                 </p>
//               )}

//               <div
//                 className="modal fade"
//                 id="about"
//                 data-bs-backdrop="static"
//                 data-bs-keyboard="false"
//                 tabIndex="-1"
//                 aria-labelledby="staticBackdropLabel"
//                 aria-hidden="true"
//               >
//                 <div className="modal-dialog ">
//                   <div className="modal-content">
//                     <div className=" modal-header">
//                       <Heading content="About Me" design="h4 my-auto" />
//                       <button
//                         type="button"
//                         id="closeButton"
//                         className="btn-close"
//                         data-bs-dismiss="modal"
//                         aria-label="Close"
//                       ></button>
//                     </div>
//                     <Form
//                       onSubmit={aboutMeFormSubmissionHandler}
//                       encType="multipart/form-data"
//                     >
//                       <div className="modal-body">
//                         <Col sm={12} className="form-group mb-3">
//                           <label htmlFor="fullName" className="required">
//                             Full Name
//                           </label>
//                           <input
//                             type="text"
//                             placeholder="Enter your full name"
//                             className="form-control form-control-sm"
//                             onChange={(e) =>
//                               setAboutUser((aboutUser) => ({
//                                 ...aboutUser,
//                                 name: e.target.value,
//                               }))
//                             }
//                             value={aboutUser.name}
//                             required
//                           />
//                         </Col>
//                         <Col sm={12} className="form-group mb-3">
//                           <label htmlFor="phone" className="required">
//                             Contact Number
//                           </label>
//                           <input
//                             type="text"
//                             placeholder="Enter your Contact Number"
//                             className="form-control form-control-sm"
//                             onChange={(e) =>
//                               setAboutUser((aboutUser) => ({
//                                 ...aboutUser,
//                                 contnum: e.target.value,
//                               }))
//                             }
//                             value={aboutUser.contnum}
//                             required
//                           />
//                         </Col>

//                         <Col sm={12} className="form-group mb-3">
//                           <label htmlFor="emailAddress" className="required">
//                             Email Address
//                           </label>
//                           <input
//                             plaintext
//                             readOnly
//                             defaultValue={aboutUser.email}
//                             className="form-control-plaintext form-control-sm"
//                           />
//                         </Col>

//                         <Col sm={12} className="form-group mb-2">
//                           <label htmlFor="gender" className="required">
//                             Gender
//                           </label>
//                           <select
//                             aria-label="Gender"
//                             className="form-select form-select-sm"
//                             onChange={(e) =>
//                               setAboutUser((aboutUser) => ({
//                                 ...aboutUser,
//                                 gender: e.target.value,
//                               }))
//                             }
//                             required
//                           >
//                             <option selected={`${aboutUser.gender === "Male" && "true"} ` } value="Male">Male</option>
//                             <option selected={`${aboutUser.gender === "Female" && "true" } ` }  value="Female">Female</option>
//                           </select>
//                         </Col>

//                         <Col sm={12} className="form-group mb-2">
//                           <label htmlFor="inputdob" className="required">
//                             Date of Birth
//                           </label>
//                           <input
//                             type="date"
//                             id="inputdob"
//                             placeholder="Your Birthday"
//                             className="form-control form-control-sm"
//                             onChange={(e) =>
//                               setAboutUser((aboutUser) => ({
//                                 ...aboutUser,
//                                 birthday: e.target.value,
//                               }))
//                             }
//                             value={aboutUser.birthday}
//                             required
//                           />
//                         </Col>
//                         <Col sm={12} className="form-group mb-2">
//                           <label htmlFor="gender" className="required">
//                             Nationality
//                           </label>
//                           <select
//                             aria-label="Gender"
//                             className="form-select form-select-sm"
//                             // onChange={(e) => setNationality(e.target.value)}
//                             // defaultValue={nationality}
//                             required
//                           >
//                             <option value="">Please Choose One</option>
//                             <option value="Malaysian">Malaysian</option>
//                             <option value="Others">Others</option>
//                           </select>
//                         </Col>

//                         <Col sm={12} className="form-group mb-2">
//                           <label htmlFor="inputAddress" className="required">
//                             Adress
//                           </label>
//                           <Form.Control
//                             as="textarea"
//                             placeholder="Enter your address"
//                             className="form-control form-control-sm"
//                             // onChange={(e) => setAddress(e.target.value)}
//                             // value={address}
//                             required
//                           />
//                         </Col>

//                         <Col sm={12} className="form-group mb-2">
//                           <label htmlFor="inputabout" className="required">
//                             About
//                           </label>
//                           <Form.Control
//                             as="textarea"
//                             placeholder="Tell us about you"
//                             className="form-control form-control-sm"
//                             // onChange={(e) => setAboutUser(e.target.value)}
//                             // value={aboutUser}
//                           />
//                         </Col>
//                       </div>
//                       <div className="modal-footer">
//                         <button
//                           type="button"
//                           className="btn btn-secondary"
//                           data-bs-dismiss="modal"
//                         >
//                           Close
//                         </button>
//                         <button
//                           type="submit"
//                           className="btn btn-primary"
//                           data-bs-dismiss="modal"
//                           disabled={!aboutMeFormIsValid}
//                         >
//                           Save Changes
//                         </button>
//                       </div>
//                     </Form>
//                   </div>
//                 </div>
//               </div>
//             </>
//           </Col>
//         </Col>
//       </Row>
//     </>
//   );
// }

// export default About;


import React from 'react'

function About() {
  return (
    <div>About</div>
  )
}

export default About
