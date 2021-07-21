import React from 'react';
import Logoimg from '../Assests/Images/logo.png';


function Logo(props) {
    return (
        <div>
            <img src={Logoimg} alt="Zom-in logo" id="logo" />
        </div>
    );
}

export default Logo;