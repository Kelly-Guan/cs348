import React, { useEffect } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

function LogOut() {

  const nav = useNavigate();

  useEffect(() => {

    Cookies.remove("signedInUser");
    nav("/");
    window.location.reload();
  }, [nav])


  return (
    <div>
      
    </div>
  );
}

export default LogOut;
