import { useState } from "react";
import DropdownArrow from "../assets/dropdownArrow.svg";

const Calendar = ({ resData, formData, updateFormData }) => {
  const [width, setWidth] = useState(); // holds the width of the calendar box
  const [visibility, setVisibility] = useState("none"); // holds the visibility of the calendar dropdown

  // Runs everytime the calendar box is clicked (Desktop ONLY)
  function handleMainClick(e) {
    setWidth(e.currentTarget.offsetWidth);
    visibility == "flex" ? setVisibility("none") : setVisibility("flex");
  }

  // Runs when a calendar is selected from the dropdown
  function handleSelection(userDataItem, e) {
    updateFormData({
      calendarId: userDataItem.id,
      calendar: e.target.textContent,
      backgroundColor: userDataItem.backgroundColor,
    });
  }

  //  Runs everytime the calendar box is clicked (Mobile ONLY)
  function mobileSelection(e) {
    const first = e.currentTarget.querySelector(".mobileContainer");
    updateFormData({
      calendar: first.querySelector("span").textContent,
      backgroundColor: first.querySelector("div").style.backgroundColor,
    });
  }

  return (
    <div
      onClick={handleMainClick}
      className="flex cursor-pointer items-center rounded-[0.5rem] bg-white"
    >
      <span className="font-regular whitespace-nowrap p-[0.8rem] font-roboto text-[1.4rem] text-g-font mobile:p-[0.68rem] mobile:text-[1.19rem]">
        {formData.calendar}
      </span>
      <img
        src={DropdownArrow}
        alt="arrow"
        className="mr-[0.8rem] w-[1rem] mobile:mr-[0.68rem] mobile:w-[0.85rem]"
      />
      {/* Mobile View */}
      {window.innerWidth <= 600 && resData && (
        <div
          style={{
            height: `${resData.length * 3.7}rem`,
            display: visibility,
          }}
          className="absolute right-[1.3rem] hidden w-[20rem] flex-col rounded-[1rem] bg-[g-darkGrey]"
        >
          {resData.map((item, index) => (
            <div onClick={mobileSelection} key={item.summary}>
              {index !== 0 && (
                <div className="mt-[0.85rem] h-[0.025rem] w-[20rem] bg-off-white opacity-50"></div>
              )}
              <div
                className="mobileContainer ml-[2.6rem] mt-[0.85rem] flex w-[15.8rem] items-center justify-between"
                key={index}
              >
                <span className="font-poppins text-[1.3rem] font-medium text-off-white">
                  {item.summary}
                </span>
                <div
                  style={{
                    backgroundColor: item.backgroundColor,
                  }}
                  className="h-[1.3rem] w-[1.3rem] rounded-[0.3rem]"
                ></div>
              </div>
            </div>
          ))}
        </div>
      )}
      {/* Desktop Display */}
      {window.innerWidth >= 600 && resData && resData.length > 0 && (
        <div
          id="calendarPopUp"
          style={{
            height: `${resData.length * 3.6 + 1.6}rem`,
            width: `${width / 10}rem`,
            display: visibility,
          }}
        >
          {resData.map((item) => (
            <span
              key={item.summary}
              onClick={(e) => handleSelection(item, e)}
              className="calendarListItem"
            >
              {item.summary}
            </span>
          ))}
        </div>
      )}
    </div>
  );
};

export default Calendar;
