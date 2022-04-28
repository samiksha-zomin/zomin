import React, { useState, useEffect, useContext} from 'react';
import Axios from 'axios';
import { AuthContext } from '../../Helpers/AuthContext';

function PostOwnerProfile(props) {

  const { authState, setAuthState } = useContext(AuthContext);

    const postOwnerID = props.postOwnerID;
    const [viewOwnerPostProfile, setViewOwnerPostProfile] = useState("avatar/male.svg");
  
    useEffect(() => {
      Axios.get(
        `${process.env.REACT_APP_SERVER_DOMAIN}/home/userProfile/` + postOwnerID,
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
            setViewOwnerPostProfile(profile);
          } else {
          if (profileDetail2[0].gender === "Male") {
            profile = `${process.env.REACT_APP_SERVER_DOMAIN}/public/Assests/Images/avatar/male.svg`;
            setViewOwnerPostProfile(profile);
          } else {
            profile = `${process.env.REACT_APP_SERVER_DOMAIN}/public/Assests/Images/avatar/female.svg`;
            setViewOwnerPostProfile(profile);
          }
        }
        } else {
          profile =
            `${process.env.REACT_APP_SERVER_DOMAIN}/public/Assests/Images/user/` +
            profileDetail1[0].profile_photo;
            setViewOwnerPostProfile(profile);
        }
      });
    });


    return (
    <AuthContext.Provider value={{ authState, setAuthState }}>
        <img
                      src={viewOwnerPostProfile}
                      alt="Zom-IN User"
                      className=" col w-100 rounded-circle"
                    />
    </AuthContext.Provider>

    )
}

export default PostOwnerProfile;