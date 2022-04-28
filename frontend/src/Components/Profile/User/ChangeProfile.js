import React, {useContext} from 'react';
import { AuthContext } from "../../../Helpers/AuthContext";
import Profile from "../../Profile";

function ChangeProfile() {
  const { authState, setAuthState } = useContext(AuthContext);

    return (
    <AuthContext.Provider value={{ authState, setAuthState }}>
        
        <Profile id={authState.id} design="border rounded-circle bg-white position-absolute top-0 end-0 translate-middle-y me-2" width="100"
            height="100"
            
          />
    </AuthContext.Provider>
        
    )
}

export default ChangeProfile
