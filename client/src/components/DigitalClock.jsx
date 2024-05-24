import React, { useState, useEffect } from "react";
import StartTimer from "../assets/Start.svg";
import calendar from "../assets/calendar.svg";
import "./styles.css";

const DigitalClock = ({
  formData,
  completed,
  updateCompleted,
  updateFormData,
}) => {
  // States
  const [start, setStart] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [hours, setHours] = useState(0);

  useEffect(() => {
    let interval;

    if (start) {
      interval = setInterval(() => {
        setSeconds((prevSeconds) => (prevSeconds + 1) % 60);

        if (seconds === 59) {
          setMinutes((prevMinutes) => (prevMinutes + 1) % 60);
        }

        if (seconds === 59 && minutes === 59) {
          setHours((prevHours) => prevHours + 1);
        }
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [start, seconds, minutes]);

  function startTimerFunction() {
    if (formData.safety) {
      updateFormData({
        startTime: new Date().toISOString(),
      });
    }
    if (!formData.safety && start) {
      updateFormData({
        endTime: new Date().toISOString(),
      });
    }
    start && !formData.safety
      ? updateCompleted({ timer: true, calendar: false })
      : updateCompleted({ timer: false, calendar: false });
    setStart(!start);
    updateFormData({
      safety: false,
    });
  }

  const resetButton = () => {
    setStart(false);
    updateFormData({
      safety: true,
    });
    updateCompleted({
      timer: false,
    });
    setSeconds(0);
    setMinutes(0);
    setHours(0);
  };

  async function postData() {
    console.log("Data to be submitted: ", formData);

    const response = await fetch("http://localhost:3000/calendar/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    const data = await response.json();
    console.log("Response: ", data);

    updateCompleted({
      timer: true,
      calendar: true,
    });

    window.scrollTo({
      top: 0,
      behavior: "smooth", // Optional smooth scrolling behavior
    });
  }

  return (
    <div
      style={formData.saved ? { display: "flex" } : { display: "none" }}
      className="flex-col mobile:mt-[6.2rem]"
    >
      <div className="flex gap-[2.5rem] mobile:gap-[1.087rem]">
        <div className="flex h-[30rem] w-[30rem] items-center justify-center rounded-[3rem] bg-light-dark mobile:h-[13.034rem] mobile:w-[13.034rem] mobile:rounded-[1.3rem]">
          <span className="font-poppins text-[23rem] font-extrabold tracking-[-0.5rem] text-light-grey mobile:text-[9.87rem] mobile:tracking-[-0.217rem]">
            {String(hours).padStart(2, "0")}
          </span>
        </div>
        <div className="flex h-[30rem] w-[30rem] items-center justify-center rounded-[3rem] bg-light-dark mobile:h-[13.034rem] mobile:w-[13.034rem] mobile:rounded-[1.3rem]">
          <span className="font-poppins text-[23rem] font-extrabold tracking-[-0.5rem] text-light-grey mobile:text-[9.87rem] mobile:tracking-[-0.217rem]">
            {String(minutes).padStart(2, "0")}
          </span>
        </div>
        <div className="flex h-[13.8rem] w-[13.8rem] items-center justify-center rounded-[3rem] bg-light-dark mobile:h-[5.722rem] mobile:w-[5.722rem] mobile:rounded-[1.3rem]">
          <span className="font-poppins text-[10rem] font-extrabold tracking-[-0.5rem] text-light-grey mobile:text-[4.335rem] mobile:tracking-[-0.217rem]">
            {String(seconds).padStart(2, "0")}
          </span>
        </div>
      </div>

      <div className="mt-[5rem] flex gap-[2.5rem] mobile:mt-[2.9rem] mobile:flex-col mobile:gap-[1.2rem]">
        <div className="flex gap-[2.5rem] mobile:gap-[1.2rem] ">
          {/* start / stop btn */}
          <div
            onClick={startTimerFunction}
            style={
              start
                ? { backgroundColor: "var(--red)" }
                : { backgroundColor: "var(--green)" }
            }
            className="flex h-[5rem] w-[19.8rem] cursor-pointer items-center justify-center rounded-[0.8rem] mobile:h-[4.2rem] mobile:w-[16.4rem] mobile:rounded-[0.7rem]"
          >
            <div className="flex items-center">
              <img
                src={StartTimer}
                alt="icon"
                className="h-[1.6rem] w-[1.6rem] mobile:h-[1.5rem] mobile:w-[1.5rem]"
              />
              <span className="ml-[1rem] font-poppins text-[2rem] font-semibold tracking-[0.1rem] text-off-white mobile:text-[1.68rem]">
                {start ? "Stop Timer" : "Start Timer"}
              </span>
            </div>
          </div>
          {/* reset btn */}
          <div
            onClick={resetButton}
            className="flex h-[5rem] w-[11.2rem] cursor-pointer items-center justify-center rounded-[0.8rem] border-[0.1rem] border-solid border-light-grey bg-light-dark mobile:h-[4.2rem] mobile:w-[16.4rem] mobile:rounded-[0.7rem]"
          >
            <span className="font-poppins text-[2rem] font-semibold tracking-[0.1rem] text-off-white mobile:text-[1.68rem]">
              RESET
            </span>
          </div>
        </div>
        {/* add to calendar btn */}
        {window.innerWidth <= 600 && completed.timer && (
          <div className="relative flex h-[16.6rem] w-[34rem] flex-col rounded-[1rem] bg-light-dark">
            <h1 className="ml-[2.1rem] mt-[2.7rem] text-[3.3rem] font-bold text-off-white">
              Step 3.
            </h1>
            <h2 className="ml-[2.1rem] mt-[1.4rem] w-[28.7rem] text-[1.6rem] font-bold text-off-white">
              It’s time to add your event to your calendar!
            </h2>
          </div>
        )}
        <div
          onClick={!start && !formData.safety ? postData : undefined}
          style={
            !start && !formData.safety
              ? { backgroundColor: "var(--blue)" }
              : { backgroundColor: "var(--light-dark)" }
          }
          className="flex h-[5rem] w-[25.9rem] cursor-pointer items-center justify-center rounded-[0.8rem] mobile:h-[4.2rem] mobile:w-[34rem] mobile:rounded-[0.7rem]"
        >
          <div className="flex items-center">
            <svg
              width="17"
              height="19"
              viewBox="0 0 17 19"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="h-[1.7rem] w-[1.593rem] mobile:h-[1.387rem] mobile:w-[1.3rem]"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M5.65264 1.29908H11.6153C11.6772 1.29908 11.7388 1.30303 11.8 1.31096C14.2271 1.48069 16.1118 3.49493 16.12 5.92796V12.8713C16.111 15.4331 14.0292 17.5038 11.4674 17.4991H5.65264C3.09035 17.5038 1.00834 15.4325 1 12.8702V5.92796C1.00834 3.36568 3.09035 1.2943 5.65264 1.29908Z"
                stroke={!start && !formData.safety ? "#E7EDF3" : "#B7B7B7"}
                strokeWidth="1.75"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M11.75 5.11798V5.87798H11.04V1.36098H12.56V5.06798H11.8H11.75V5.11798ZM11.0416 5.97798H11.75V6.68636C11.3701 6.66168 11.0663 6.35787 11.0416 5.97798ZM11.85 6.68798V5.97798H12.61H12.66V5.92798V5.16798H16.07V6.68798H11.85ZM16.88 5.92798C16.88 6.33091 16.5664 6.66061 16.17 6.68636V5.1696C16.5664 5.19534 16.88 5.52503 16.88 5.92798ZM11.85 5.16798H12.56V5.87798H11.85V5.16798ZM12.5584 1.26098H11.0416C11.0674 0.864543 11.3971 0.550977 11.8 0.550977C12.2029 0.550977 12.5326 0.864543 12.5584 1.26098ZM11.48 9.93911C11.48 10.342 11.1664 10.6717 10.77 10.6975V9.18073C11.1664 9.20647 11.48 9.53619 11.48 9.93911ZM10.67 9.17911V10.6991H4.28999V9.17911H10.67ZM4.18999 10.6975C3.79357 10.6717 3.47999 10.342 3.47999 9.93911C3.47999 9.53618 3.79357 9.20647 4.18999 9.18073V10.6975ZM8.23999 6.6991C8.23999 7.10203 7.92641 7.43173 7.52999 7.45748V5.94072C7.92641 5.96646 8.23999 6.29615 8.23999 6.6991ZM7.42999 5.9391V7.4591H4.28999V5.9391H7.42999ZM4.18999 7.45748C3.79357 7.43173 3.47999 7.10203 3.47999 6.6991C3.47999 6.29615 3.79357 5.96646 4.18999 5.94072V7.45748ZM12.56 13.1791C12.56 13.582 12.2464 13.9117 11.85 13.9375V12.4207C12.2464 12.4465 12.56 12.7762 12.56 13.1791ZM11.75 12.4191V13.9391H4.28999V12.4191H11.75ZM4.18999 13.9375C3.79357 13.9117 3.47999 13.582 3.47999 13.1791C3.47999 12.7762 3.79357 12.4465 4.18999 12.4207V13.9375Z"
                fill={!start && !formData.safety ? "#E7EDF3" : "#B7B7B7"}
                stroke={!start && !formData.safety ? "#E7EDF3" : "#B7B7B7"}
                strokeWidth="0.1"
              />
            </svg>
            <span
              style={
                !start && !formData.safety
                  ? { color: "#E7EDF3", opacity: "100" }
                  : { color: "#B7B7B7", opacity: "50" }
              }
              className="ml-[1rem] font-poppins text-[2rem] font-semibold tracking-[0.1rem] mobile:text-[1.68rem]"
            >
              Add to Calendar
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DigitalClock;
