import { useState, useEffect } from "react";
import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import Logo from "../assets/Logo.svg";
import Github from "../assets/Github.svg";
import "./styles.css";

const Navbar = () => {

  const { auth, setAuth } = useAuth();
  const navigate = useNavigate();
  
  function signOutClick () {
    setAuth(false)
    navigate("/")
  }

  return (
    <div className="w-[calc(100% - 180px)] mx-[90px] mt-[50px] flex h-[75px] items-center justify-between rounded-[10px] border-[0.8px] border-solid border-[rgba(183,183,183,0.5)] bg-light-dark">
      <a href="/">
        <img src={Logo} alt="logo" className="ml-[50px]" />
      </a>
      <div className="mr-[50px] flex items-center">
        <a
          href="https://github.com/LukeShivers/Timer-for-Google-Calendar"
          target="_blank"
          className="flex h-[40px] w-[166px] items-center rounded-[8px] border-[1.5px] border-solid border-light-grey"
        >
          <div className="mx-[15px] flex w-full justify-between">
            <span className="font-poppins font-normal text-light-grey">
              Source Code
            </span>
            <img src={Github} alt="icon" />
          </div>
        </a>
        <div
          id="signoutBtn"
          onClick={signOutClick}
          className="ml-[50px] flex h-[40px] w-[105px] cursor-pointer items-center justify-center rounded-[8px] border-[1.5px] border-solid border-light-grey font-poppins font-normal text-light-grey"
          style={auth ? { display: "visible" } : { display: "none" }}
        >
          Sign Out
        </div>
      </div>
    </div>
  );
};

export default Navbar;
