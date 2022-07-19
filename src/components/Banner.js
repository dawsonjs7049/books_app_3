import React from "react";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBookOpen } from '@fortawesome/free-solid-svg-icons'
import { useUserAuth } from '../context/UserAuthContext';
import { useNavigate } from 'react-router-dom'

function Banner(){

    let { logout } = useUserAuth();
    const navigate = useNavigate();

    const handleLogout = async () => {
        try 
        {
            await logout();
            navigate("/");
            console.log("LOGGED OUT");
        }
        catch (error)
        {
            console.log(error.message);
        }
    }

    return (
        <div className={'bannerContainer'}>
            <div className={'bannerName'}>
                Jake's Bookshelf <FontAwesomeIcon icon={faBookOpen} />
            </div>
            <button type="submit" className={'logoutBtn'} onClick={() => handleLogout()}>Logout</button>
        </div>
    )


}

export default Banner;