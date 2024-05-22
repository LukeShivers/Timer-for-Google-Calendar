import { useState, useEffect } from "react";
import DropdownArrow from "../assets/dropdownArrow.svg";
import Pencil from "../assets/Pencil.svg";
import "./styles.css";
import useToken from "../hooks/useToken";

const Form = ({ updateFormData, complete }) => {
  const { token } = useToken();

  // States
  const [calendarColorCode, setCalendarColorCode] = useState();
  const [titleInput, setTiitleInput] = useState("");
  const [descriptionInput, setDescriptionInput] = useState("");

  const [displayed, setDisplayed] = useState();
  const [focus, setFocus] = useState(false);
  const [userData, setUserData] = useState();
  const [width, setWidth] = useState();
  const [calVis, setCalVis] = useState("none");
  const [colorVis, setColorVis] = useState("none");
  const [saved, setSaved] = useState(false);

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
      const scrubbed = filterData(data.data);
      console.log(scrubbed);
      setUserData(scrubbed);
      setDefault(scrubbed);
      console.log("scrubbed ", scrubbed);
    }
    fetchCalendars();
  }, []);

  function filterData(rawData) {
    const filteredData = [];
    rawData.forEach((item) => {
      if (item.accessRole == "owner") {
        filteredData.push(item);
      }
    });
    return filteredData;
  }

  function setDefault(data) {
    for (let i = 0; i < data.length; i++) {
      if (data[i].primary) {
        setDisplayed(data[i].summary);
        setCalendarColorCode(data[i].backgroundColor);
      }
    }
  }

  function handleMainClick(e) {
    setWidth(e.currentTarget.offsetWidth);
    calVis == "flex" ? setCalVis("none") : setCalVis("flex");
  }

  function handleSelection(userDataItem, e) {
    setDisplayed(e.target.textContent);
    setCalendarColorCode(userDataItem.backgroundColor);
  }

  function mobileSelection(e) {
    const first = e.currentTarget.querySelector(".mobileContainer");
    setDisplayed(first.querySelector("span").textContent);
    setCalendarColorCode(first.querySelector("div").style.backgroundColor);
  }

  const colorData = [
    {
      Tomato: "#C4291C",
      Flamingo: "#D98177",
    },
    {
      Tangerine: "#E35D33",
      Banana: "#EEC04C",
    },
    {
      Sage: "#5DB37E",
      Basil: "#397E49",
    },
    {
      Peacock: "#429ADF",
      Blueberry: "#4153AF",
    },
    {
      Lavendar: "#7B87C6",
      Grape: "#8331A4",
    },
    {
      Graphite: "#616161",
      Default: calendarColorCode,
    },
  ];

  function rgbStringToHex(rgbString) {
    // Extract RGB components from the string
    var components = rgbString.match(/\d+/g);
    var r = parseInt(components[0]);
    var g = parseInt(components[1]);
    var b = parseInt(components[2]);

    // Convert RGB to hex
    var hexColor =
      "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
    return hexColor;
  }

  function handleColorClick() {
    colorVis == "flex" ? setColorVis("none") : setColorVis("flex");
  }

  function handleColorSelection(e) {
    const rgbColor = e.currentTarget.style.backgroundColor;
    var hexColor = rgbStringToHex(rgbColor);
    setCalendarColorCode(hexColor);
  }

  function mobileColorSelection(e) {
    const rgbColor = e.currentTarget.querySelector("div").style.backgroundColor;
    var hexColor = rgbStringToHex(rgbColor);
    setCalendarColorCode(hexColor);
  }

  const handleTitleChange = (e) => {
    setTiitleInput(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescriptionInput(e.target.value);
  };

  function handleSave(e) {
    e.currentTarget.classList.toggle("buttonEdit");
    let saveOrEdit = e.currentTarget.firstElementChild;
    saveOrEdit.textContent === "Save"
      ? (saveOrEdit.textContent = "Edit")
      : (saveOrEdit.textContent = "Save");

    saved ? setSaved(false) : setSaved(true);

    updateFormData({
      title: titleInput,
      summary: displayed,
      backgroundColor: calendarColorCode,
      description: descriptionInput,
    });

    console.log("Saved color: ", calendarColorCode);
  }

  return (
    <div className="flex h-[46.7rem] w-[40rem] flex-col rounded-[1rem] bg-light-dark mobile:mt-[2.4rem] mobile:h-[39.695rem] mobile:w-[34rem]">
      <div className="flex items-center pl-[2.5rem] pt-[3.3rem] mobile:pl-[2.125rem] mobile:pt-[2.7rem]">
        <h1 className="font-poppins text-[3.6rem] font-bold text-white mobile:text-[3.06rem]">
          Add Event
        </h1>
        <div onClick={handleSave} className="buttonSave">
          <span className="block font-poppins text-[1.4rem] font-medium text-off-white mobile:text-[1.19rem]">
            Save
          </span>
          <img
            src={Pencil}
            alt="pencil"
            className="hidden h-[3rem] w-[3rem] mobile:h-[2.55rem] mobile:w-[2.55rem]"
          />
        </div>
      </div>

      <div className="mx-[2.5rem] mt-[1.5rem] flex flex-col mobile:mx-[2.125rem] mobile:mt-[1.275rem]">
        <div className="flex h-[5.3rem] w-full flex-col justify-center rounded-[0.5rem] bg-white mobile:h-[4.505rem] mobile:rounded-[0.425rem]">
          <input
            onFocus={() => setFocus(true)}
            onBlur={() => setFocus(false)}
            className="text- border-none bg-white pl-[0.8rem] font-roboto text-[2rem] text-g-font outline-none mobile:pl-[0.68rem] mobile:text-[1.7rem]"
            type="text"
            value={titleInput}
            onChange={handleTitleChange}
            placeholder="Add title"
          />
          <div className={focus ? "active" : "inactive"}></div>
        </div>

        <div className="mt-[2.5rem] flex h-[3.6rem] w-full mobile:mt-[2.125rem] mobile:h-[3.06rem]">
          {/* Calendar Display */}
          <div
            onClick={handleMainClick}
            className="flex cursor-pointer items-center rounded-[0.5rem] bg-white"
          >
            {/* Default View */}
            <span className="font-regular whitespace-nowrap p-[0.8rem] font-roboto text-[1.4rem] text-g-font mobile:p-[0.68rem] mobile:text-[1.19rem]">
              {displayed}
            </span>
            <img
              src={DropdownArrow}
              alt="^"
              className="mr-[0.8rem] w-[1rem] mobile:mr-[0.68rem] mobile:w-[0.85rem]"
            />
            {/* Mobile View */}
            {window.innerWidth <= 600 && userData && (
              <div
                style={{
                  height: `${userData.length * 3.7}rem`,
                  display: calVis,
                }}
                className="absolute right-[1.3rem] hidden w-[20rem] flex-col rounded-[1rem] bg-[#21272D]"
              >
                {userData.map((item, index) => (
                  <div
                    onClick={mobileSelection}
                    key={item.summary}
                    className=""
                  >
                    {index !== 0 && (
                      <div className="mt-[1rem] h-[0.025rem] w-[20rem] bg-off-white opacity-50"></div>
                    )}
                    <div
                      className="mobileContainer ml-[2.6rem] mt-[1rem] flex w-[15.8rem] items-center justify-between"
                      key={index}
                    >
                      <span className="font-poppins text-[1.1rem] font-medium text-off-white">
                        {item.summary}
                      </span>
                      <div
                        style={{
                          backgroundColor: item.backgroundColor,
                        }}
                        className="h-[1.1rem] w-[1.1rem] rounded-[0.2rem]"
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            )}
            {/* Desktop Display */}
            {window.innerWidth >= 600 && userData && userData.length > 0 && (
              <div
                id="calendarPopUp"
                style={{
                  height: `${userData.length * 3.6 + 1.6}rem`,
                  width: `${width / 10}rem`,
                  display: calVis,
                }}
              >
                {userData.map((item) => (
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
          {/* Color Display */}
          <div
            onClick={handleColorClick}
            className=" ml-[2.5rem] flex w-[6rem] cursor-pointer items-center justify-center rounded-[0.5rem] bg-white mobile:ml-[2.125rem] mobile:w-[5.1rem] mobile:rounded-[0.425rem]"
          >
            {/* Default View */}
            <div
              style={{ backgroundColor: calendarColorCode }}
              id="colorDisplay"
              className="m-[0.3rem] h-[1.8rem] w-[1.8rem] rounded-[0.9rem] mobile:m-[0.255rem] mobile:h-[1.53rem] mobile:w-[1.53rem]"
            ></div>
            <img
              src={DropdownArrow}
              alt="^"
              className="ml-[0.3rem] w-[1rem] mobile:ml-[0.255rem] mobile:w-[0.85rem]"
            />
            {/* Mobile View */}
            {window.innerWidth <= 600 && userData && (
              <div
                style={{
                  height: `${colorData.length * 2 * 3.7}rem`,
                  display: colorVis,
                }}
                className="absolute right-[1.3rem] hidden w-[20rem] flex-col rounded-[1rem] bg-[#21272D]"
              >
                {colorData.map((item, index) => (
                  <div key={index}>
                    {Object.entries(item).map((name, color) => (
                      <>
                        {!(index === 0 && color === 0) && (
                          <div className="mt-[1rem] h-[0.025rem] w-[20rem] bg-off-white opacity-50"></div>
                        )}
                        <div
                          onClick={mobileColorSelection}
                          className="ml-[2.6rem] mt-[1rem] flex w-[15.8rem] items-center justify-between"
                        >
                          <span className="font-poppins text-[1.1rem] font-medium text-off-white">
                            {name[0]}
                          </span>
                          <div
                            style={{
                              backgroundColor: name[1],
                            }}
                            className="h-[1.1rem] w-[1.1rem] rounded-[0.2rem]"
                          ></div>
                        </div>
                      </>
                    ))}
                  </div>
                ))}
              </div>
            )}
            {/* Desktop View */}
            {window.innerWidth >= 600 && colorData && (
              <div id="colorPopUp" style={{ display: colorVis }}>
                <div id="colorContainer">
                  {colorData.map((item, index) => (
                    <div key={index} className="colorRow">
                      {Object.entries(item).map((name, color) => (
                        <div
                          key={name}
                          onClick={handleColorSelection}
                          style={{ backgroundColor: name[1] }}
                          className="colorSelection"
                        ></div>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        <textarea
          className="mt-[2.5rem] h-[17.6rem] rounded-[0.5rem] border-none bg-white pl-[0.8rem] pt-[1.3rem] font-roboto text-[1.4rem] font-medium text-g-font outline-none mobile:mt-[2.125rem] mobile:h-[14.96rem] mobile:rounded-[0.425rem] mobile:pl-[0.68rem] mobile:pt-[1.105rem] mobile:text-[1.19rem]"
          value={descriptionInput}
          onChange={handleDescriptionChange}
          placeholder="Add description"
        ></textarea>
      </div>
    </div>
  );
};

export default Form;
