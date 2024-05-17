import React, { useState, useEffect } from "react";
import StartTimer from "../assets/Start.svg";
import calendar from "../assets/calendar.svg";
import "./styles.css";

const DigitalClock = ({ formData, updateComplete, complete }) => {
  // States
  const [start, setStart] = useState(false);
  const [safeOff, setSafeOff] = useState(true);
  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [hours, setHours] = useState(0);
  const [startTime, setStartTime] = useState();
  const [endTime, setEndTime] = useState();

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
    setStart(!start);
    setSafeOff(false);
    setStartTime(new Date());
  }

  const resetButton = () => {
    setStart(false);
    setSafeOff(true);
    setSeconds(0);
    setMinutes(0);
    setHours(0);
  };

  async function postData() {
    const end = new Date();

    const isoStart = startTime.toISOString();
    const isoEnd = end.toISOString();

    const dataPackage = {
      title: formData.title,
      summary: formData.summary,
      backgroundColor: formData.backgroundColor,
      description: formData.description,
      startTime: isoStart,
      endTime: isoEnd,
    };

    console.log("Data to be submitted: ", dataPackage);

    const response = await fetch("http://localhost:3000/calendar/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataPackage),
    });
    const data = await response.json();
    console.log(data);
    // Update a state that the data has been posted then render the custom pop-up
    updateComplete(true);
  }

  return (
    <div className="ml-[78px] mt-[85px] flex flex-col">
      <div className="flex gap-[25px]">
        <div className="flex h-[300px] w-[300px] items-center justify-center rounded-[30px] bg-light-dark">
          <div className="font-poppins text-[230px] font-extrabold tracking-[-5px] text-light-grey">
            {String(hours).padStart(2, "0")}
          </div>
        </div>
        <div className="flex h-[300px] w-[300px] items-center justify-center rounded-[30px] bg-light-dark">
          <div className="font-poppins text-[230px] font-extrabold tracking-[-5px] text-light-grey">
            {String(minutes).padStart(2, "0")}
          </div>
        </div>
        <div className="flex h-[132px] w-[132px] items-center justify-center rounded-[30px] bg-light-dark">
          <div className="font-poppins text-[100px] font-extrabold tracking-[-5px] text-light-grey">
            {String(seconds).padStart(2, "0")}
          </div>
        </div>
      </div>
      <div className="flex gap-[25px]">
        <div
          onClick={startTimerFunction}
          className={start ? "stop-btn" : "start-btn"}
        >
          <div className="flex items-center">
            <img src={StartTimer} alt="icon" className="h-[16px] w-[16px]" />
            <span className="ml-[10px] font-poppins text-[20px] font-semibold tracking-[1px] text-off-white">
              {start ? "Stop Timer" : "Start Timer"}
            </span>
          </div>
        </div>
        <div
          onClick={resetButton}
          className="mt-[50px] flex h-[50px] w-[112px] cursor-pointer items-center justify-center rounded-[8px] border-[1px] border-solid border-light-grey bg-light-dark"
        >
          <span className="font-poppins text-[20px] font-semibold tracking-[1px] text-off-white">
            RESET
          </span>
        </div>
        <div
          onClick={start ? null : postData}
          className={!start && !safeOff ? "activeAdd" : "inactiveAdd"}
        >
          <div className="flex items-center">
            <svg
              width="17"
              height="19"
              viewBox="0 0 17 19"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M5.65264 1.29908H11.6153C11.6772 1.29908 11.7388 1.30303 11.8 1.31096C14.2271 1.48069 16.1118 3.49493 16.12 5.92796V12.8713C16.111 15.4331 14.0292 17.5038 11.4674 17.4991H5.65264C3.09035 17.5038 1.00834 15.4325 1 12.8702V5.92796C1.00834 3.36568 3.09035 1.2943 5.65264 1.29908Z"
                stroke={!start && !safeOff ? "#E7EDF3" : "#B7B7B7"}
                strokeWidth="1.75"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M11.75 5.11798V5.87798H11.04V1.36098H12.56V5.06798H11.8H11.75V5.11798ZM11.0416 5.97798H11.75V6.68636C11.3701 6.66168 11.0663 6.35787 11.0416 5.97798ZM11.85 6.68798V5.97798H12.61H12.66V5.92798V5.16798H16.07V6.68798H11.85ZM16.88 5.92798C16.88 6.33091 16.5664 6.66061 16.17 6.68636V5.1696C16.5664 5.19534 16.88 5.52503 16.88 5.92798ZM11.85 5.16798H12.56V5.87798H11.85V5.16798ZM12.5584 1.26098H11.0416C11.0674 0.864543 11.3971 0.550977 11.8 0.550977C12.2029 0.550977 12.5326 0.864543 12.5584 1.26098ZM11.48 9.93911C11.48 10.342 11.1664 10.6717 10.77 10.6975V9.18073C11.1664 9.20647 11.48 9.53619 11.48 9.93911ZM10.67 9.17911V10.6991H4.28999V9.17911H10.67ZM4.18999 10.6975C3.79357 10.6717 3.47999 10.342 3.47999 9.93911C3.47999 9.53618 3.79357 9.20647 4.18999 9.18073V10.6975ZM8.23999 6.6991C8.23999 7.10203 7.92641 7.43173 7.52999 7.45748V5.94072C7.92641 5.96646 8.23999 6.29615 8.23999 6.6991ZM7.42999 5.9391V7.4591H4.28999V5.9391H7.42999ZM4.18999 7.45748C3.79357 7.43173 3.47999 7.10203 3.47999 6.6991C3.47999 6.29615 3.79357 5.96646 4.18999 5.94072V7.45748ZM12.56 13.1791C12.56 13.582 12.2464 13.9117 11.85 13.9375V12.4207C12.2464 12.4465 12.56 12.7762 12.56 13.1791ZM11.75 12.4191V13.9391H4.28999V12.4191H11.75ZM4.18999 13.9375C3.79357 13.9117 3.47999 13.582 3.47999 13.1791C3.47999 12.7762 3.79357 12.4465 4.18999 12.4207V13.9375Z"
                fill={!start && !safeOff ? "#E7EDF3" : "#B7B7B7"}
                stroke={!start && !safeOff ? "#E7EDF3" : "#B7B7B7"}
                strokeWidth="0.1"
              />
            </svg>
            <span
              style={
                !start && !safeOff
                  ? { color: "#E7EDF3", opacity: "100" }
                  : { color: "#B7B7B7", opacity: "50" }
              }
              className="ml-[10px] font-poppins text-[20px] font-semibold tracking-[1px]"
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
