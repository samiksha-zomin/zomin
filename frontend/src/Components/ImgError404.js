import React from 'react';
import errorImgGirl from '../Assests/Images/error404/error404.png';
import errorImgGuy from '../Assests/Images/error404/error-404.png';

function ImgError404(props) {

    var today = new Date();
    var currentHour = today.getHours();
    var errorImg;

    if (currentHour < 12) {
        errorImg = errorImgGirl;
    } else {
        errorImg = errorImgGuy;
    }

    return (
        <div>
            <img className="img-fluid shadow-4" src={errorImg}  alt="Zom-IN error 404" />
        </div>
    );
}

export default ImgError404;
