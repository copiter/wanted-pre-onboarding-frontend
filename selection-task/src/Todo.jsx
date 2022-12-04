import React, { useEffect } from 'react'
import { useNavigate } from "react-router-dom";


function Todo() {
  const navigate = useNavigate();

  // useEffect(() => {
  //   const checkJwt = localStorage.getItem("access_token");

  //   if (checkJwt === null) {
  //     navigate("/");
  //   }
  // }, [navigate]);


  return (
    <div>Todo</div>
  )
}

export default Todo