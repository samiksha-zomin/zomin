import React, { Fragment, useState } from "react";
import { Modal, Col, Button } from "react-bootstrap";
import { toast } from "react-toastify";

import Heading from "../Heading";

function UploadImgModal(props) {
  const [postImage, setPostImage] = useState();
  const [postImageName, setPostImageName] = useState("");
  const [imageLength, setImageLength] = useState(false);

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
          <span>Please upload an image smaller than 5 MB</span>
        </Fragment>
      );
    }

    if (!imageFile.name.match(/\.(jpg|jpeg|png|gif)$/)) {
      setPostImage();
      setImageLength(false);
      return toast.warn(
        <Fragment>
          <span>
            Invalid Image Upload. Please Try to Upload image with jpg, jpeg, png
            or gif
          </span>
        </Fragment>
      );
    }
  };

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Heading content="Upload Company Logo" design="h5" />
      </Modal.Header>
      <Modal.Body>
        <label>Please upload a clear image of your logo.</label>
        <p className="text-danger mb-2">
          Make sure the image is in .jpeg format and does not exceed 5MB.
        </p>
        <input
          className="form-control form-control-sm"
          type="file"
          onChange={imageChange}
          //   onChange="showPreview(event,'previewProfilePic')"
          accept="image/jpeg"
        />

        {postImage && (
          <Col sm={12} className="form-group my-4">
            <label htmlFor="preview">Preview</label>
            <div className="text-center border border-1 rounded" id="previewPP">
              <img
                id="previewProfilePic"
                width="250"
                height="250"
                className="rounded-circle  roundedPreview text-center my-2"
                src={URL.createObjectURL(postImage)}
              />
            </div>
          </Col>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button
        //   onClick={() => applyJob(oppoID)}
        >
          Upload
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default UploadImgModal;
