import { useState, useEffect } from "react";
import "./styles.css";
import useToken from "../hooks/useToken";
import Color from "./Color.jsx";
import Calendar from "./Calendar.jsx";

const Form = ({
  completed,
  formData,
  updateFormData,
  resData,
  updateResData,
}) => {
  // Hooks
  const { token } = useToken();

  // States
  const [focus, setFocus] = useState(false); // holds weather the title is being typed (for microinteraction)

  const [calendarColorCode, setCalendarColorCode] = useState(); // holds the color for the event
  const [titleInput, setTiitleInput] = useState(""); // holds the event name
  const [descriptionInput, setDescriptionInput] = useState(""); // holds the event description
  const [displayed, setDisplayed] = useState(); // holds the calendar for the event
  const [userData, setUserData] = useState(); // holds the raw data response from the API
  const [saved, setSaved] = useState(false); // holds weather the form has been saved or not (old)
  const [width, setWidth] = useState(); // holds the width of the calendar box
  const [calVis, setCalVis] = useState("none"); // holds the visibility of the calendar dropdown
  const [colorVis, setColorVis] = useState("none"); // holds the visibility of the color dropdown

  // Fetch data for populating form
  useEffect(() => {
    async function fetchCalendars() {
      const response = await fetch("http://localhost:3000/calendar", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token: token }),
      });
      const data = await response.json();
      updateResData(data.data);
      setDefault(data.data);
      console.log("API Data ", data.data);
    }
    fetchCalendars();
  }, []);

  // Loops through the filtered data and sets the UI to the default
  function setDefault(data) {
    for (let i = 0; i < data.length; i++) {
      if (data[i].primary) {
        updateFormData({
          calendar: data[i].summary,
          backgroundColor: data[i].backgroundColor,
          calendarId: data[i].id,
          colorId: data[i].colorId,
        });
      }
    }
  }

  function saveEvent() {
    updateFormData({ saved: !formData.saved });
    window.scrollTo({
      top: 0,
      behavior: "smooth", // Optional smooth scrolling behavior
    });
  }

  return (
    <div
      style={formData.saved ? { display: "none" } : { display: "flex" }}
      className=" h-[46.7rem] w-[40rem] flex-col rounded-[1rem] bg-light-dark mobile:mt-[2.4rem] mobile:h-[39.695rem] mobile:w-[34rem]"
    >
      <div className="flex items-center pl-[2.5rem] pt-[3.3rem] mobile:pl-[2.125rem] mobile:pt-[2.7rem]">
        <h1 className="font-poppins text-[3.6rem] font-bold text-white mobile:text-[3.06rem]">
          Add Event
        </h1>
        <div
          onClick={saveEvent}
          className="relative ml-[8.3rem] flex h-[3.7rem] w-[8rem] cursor-pointer items-center justify-center rounded-[0.5rem] bg-green mobile:ml-[7.055rem] mobile:h-[3.145rem] mobile:w-[6.8rem] mobile:rounded-[0.425rem]"
        >
          <span className="block font-poppins text-[1.4rem] font-medium text-off-white mobile:text-[1.19rem]">
            Save
          </span>
        </div>
      </div>

      <div className="mx-[2.5rem] mt-[1.5rem] flex flex-col mobile:mx-[2.125rem] mobile:mt-[1.275rem]">
        <div className="flex h-[5.3rem] w-full flex-col justify-center rounded-[0.5rem] bg-white mobile:h-[4.505rem] mobile:rounded-[0.425rem]">
          <input
            onFocus={() => setFocus(!focus)}
            onBlur={() => setFocus(!focus)}
            className="text- border-none bg-white pl-[0.8rem] font-roboto text-[2rem] text-g-font outline-none mobile:pl-[0.68rem] mobile:text-[1.7rem]"
            type="text"
            value={formData.summary}
            onChange={(e) => updateFormData({ summary: e.target.value })}
            placeholder="Add title"
          />
          <div className={focus ? "active" : "inactive"}></div>
        </div>

        <div className="mt-[2.5rem] flex h-[3.6rem] w-full mobile:mt-[2.125rem] mobile:h-[3.06rem]">
          {/* Calendar Display */}
          <Calendar
            resData={resData}
            formData={formData}
            updateFormData={updateFormData}
          />
          {/* Color Display */}
          <Color
            resData={resData}
            formData={formData}
            updateFormData={updateFormData}
          />
        </div>

        <textarea
          className="mt-[2.5rem] h-[17.6rem] rounded-[0.5rem] border-none bg-white pl-[0.8rem] pt-[1.3rem] font-roboto text-[1.4rem] font-medium text-g-font outline-none mobile:mt-[2.125rem] mobile:h-[14.96rem] mobile:rounded-[0.425rem] mobile:pl-[0.68rem] mobile:pt-[1.105rem] mobile:text-[1.19rem]"
          value={formData.description}
          onChange={(e) => updateFormData({ description: e.target.value })}
          placeholder="Add description"
        ></textarea>
      </div>
    </div>
  );
};

export default Form;
