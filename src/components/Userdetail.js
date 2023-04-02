import React from 'react'
import './userdetail.css'
import { useAuth0 } from "@auth0/auth0-react";
import Button from "@mui/material/Button";

const Userdetail = () => {
  const { loginWithRedirect, logout, user, isAuthenticated }= useAuth0();
  
  return (
    <div className="userdetail-container">
      <div className="userdetail">
        {isAuthenticated ? (
          <>
            <Button className="button" variant="contained" color="primary" style={{background:"#081014",color:"lightgrey"}} onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}>
              LOGOUT
            </Button>
            <img className="image" src={user.picture} alt="Not shown" />
          </>
        ) : (
          <Button className="button" variant="contained" color="primary" style={{background:"#081014",color:"lightgrey"}} onClick={() => loginWithRedirect()}>
            LOGIN
          </Button>
        )}
      </div>
    </div>
  )
}

export default Userdetail;
