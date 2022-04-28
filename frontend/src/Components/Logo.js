import React from 'react';
import Logoimg from '../Assests/Images/logo/logo.png';


function Logo(props) {
    return (
        <div>
            <img src={Logoimg} alt="Zom-IN logo" id="logo" />
        </div>
    );
}

export default Logo;