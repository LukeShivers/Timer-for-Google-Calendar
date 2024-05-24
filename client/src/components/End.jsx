import React from "react";
import googleCalendar from "../assets/googleCalendar.svg";
import exit from "../assets/exit.svg";
import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

const End = ({ updateFormData, updateCompleted }) => {
  const { setAuth } = useAuth();
  const navigate = useNavigate();

  function newEvent() {
    updateFormData({
      calendar: "",
      calendarId: null,
      summary: "",
      colorId: null,
      backgroundColor: null,
      description: "",
      safety: true,
      saved: false,
    });
    updateCompleted({
      timer: false,
      calendar: false,
    });
  }

  function signOut() {
    setAuth(false);
    navigate("/");
  }

  function handleExit() {
    updateCompleted({
      calendar: false,
    });
  }

  return (
    <>
      <div className="flex h-[35.1rem] w-[79rem] items-center justify-center rounded-[1rem] bg-light-dark mobile:mb-[10rem] mobile:mt-[1.2rem] mobile:h-[42.2rem] mobile:w-[34rem]">
        <div className="flex h-[62.1rem] w-[62.1rem] items-center justify-between mobile:h-[32.9rem] mobile:w-[29.8rem] mobile:flex-col">
          <div className="top-0 flex h-[26.1rem] w-[26.1rem] items-center justify-center rounded-[15rem] bg-off-white mobile:h-[14rem] mobile:w-[14rem]">
            <img
              src={googleCalendar}
              className="h-[15rem] w-[15rem] mobile:h-[7.4rem] mobile:w-[7.4rem]"
              alt="calendar"
            />
          </div>

          <div className="flex flex-col items-center">
            <h1 className="w-[28.6rem] pb-[5rem] text-center font-poppins text-[2rem] font-bold text-off-white mobile:w-[22rem] mobile:pb-[2.5rem] mobile:text-[1.6rem]">
              The Event has Been Saved to Your Calendar!
            </h1>
            <div
              onClick={newEvent}
              className="mb-[2.1rem] flex h-[5rem] w-[28.8rem] cursor-pointer items-center justify-center rounded-[0.7rem] bg-green mobile:h-[3.8rem] mobile:w-[29.8rem]"
            >
              <span className="font-poppins text-[1.6rem] font-medium text-lightest-grey">
                New Event
              </span>
            </div>
            <div
              onClick={signOut}
              className="flex h-[5rem] w-[28.8rem] cursor-pointer items-center justify-center rounded-[0.7rem] border-[0.15rem] border-solid border-light-grey bg-dark mobile:h-[3.8rem] mobile:w-[29.8rem]"
            >
              <span className="font-poppins text-[1.6rem] font-medium text-lightest-grey">
                Sign Out
              </span>
            </div>
          </div>
        </div>
        <img
          onClick={handleExit}
          src={exit}
          alt="exit"
          className="mb-[26rem] ml-[7.1rem] cursor-pointer mobile:absolute mobile:right-[5rem] mobile:top-[15.3rem] mobile:mb-0 mobile:ml-0"
        />
      </div>
      <div className="absolute top-[17.5rem] h-[0.05rem] w-screen bg-light-grey opacity-50 mobile:left-0 mobile:top-[12.2rem]"></div>
      <div className="absolute top-[59.8rem] h-[0.05rem] w-screen bg-light-grey opacity-50 mobile:left-0 mobile:top-[56.8rem]"></div>
      <div className="absolute right-[28.9rem] top-0 h-[200vh] w-[0.05rem] bg-light-grey opacity-50 mobile:right-[1.3rem]"></div>
      <div className="absolute left-[28.9rem] top-0 h-[200vh] w-[0.05rem] bg-light-grey opacity-50 mobile:left-[1.3rem]"></div>
    </>
  );
};

export default End;
