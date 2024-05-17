import React from "react";
import endCalendar from "../assets/endCalendar.svg";
import exit from "../assets/exit.svg";
import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

const End = ({ updateComplete2 }) => {
  const { auth, setAuth } = useAuth();
  const navigate = useNavigate();

  function newEvent() {
    // Clear content of event
    // Set button to save
    // Load default calendar
    // reset timer
  }

  function signOut() {
    setAuth(false);
    navigate("/");
  }

  function handleExit() {
    updateComplete2(false);
  }

  return (
    <>
      <div className="absolute top-0 flex items-center justify-center ">
        <div className="h-[200vh] w-screen bg-dark opacity-50 "></div>
        <div className="bg-lightest-grey absolute top-[200px] flex h-[351px] w-[790px] items-center justify-self-center rounded-[25px]">
          <div className="top-0 ml-[40px] flex h-[271px] w-[271px] items-center justify-center rounded-[150px] bg-[#CCCACA]">
            <img src={endCalendar} alt="calendar" />
          </div>
          <div className="pl-[56px] font-poppins text-[20px] font-bold text-dark">
            <h1 className="w-[286px] pb-[49px] text-center">
              The Event has Been Saved to Your Calendar!
            </h1>
            <div
              onClick={newEvent}
              className="mb-[23px] flex h-[50px] w-[286px] cursor-pointer items-center justify-center rounded-[25px] bg-green"
            >
              <span className="text-lightest-grey font-poppins font-semibold">
                New Event
              </span>
            </div>
            <div
              onClick={signOut}
              className="flex h-[50px] w-[286px] cursor-pointer items-center justify-center rounded-[25px] bg-dark"
            >
              <span className="text-lightest-grey font-poppins font-semibold">
                Sign Out
              </span>
            </div>
          </div>
          <img
            onClick={handleExit}
            src={exit}
            alt="exit"
            className="mb-[260px] ml-[71px] cursor-pointer"
          />
        </div>
      </div>
    </>
  );
};

export default End;
