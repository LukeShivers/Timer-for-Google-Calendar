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
    <>
      <div
        className="absolute ml-[90px] mt-[85px] h-[467px] w-[400px] rounded-[10px] bg-light-dark opacity-50"
        style={saved ? { display: "flex" } : { display: "none" }}
      ></div>
      <div className="ml-[90px] mt-[85px] flex h-[467px] w-[400px] flex-col rounded-[10px] bg-light-dark">
        <div className="flex">
          <h1 className="pl-[25px] pt-[33px] font-poppins text-[36px] font-bold text-white">
            Add Event
          </h1>
          <div onClick={handleSave} className="buttonSave relative">
            <span className="block font-poppins text-[14px] font-medium text-off-white">
              Save
            </span>
            <img src={Pencil} alt="" className="hidden h-[30px] w-[30px]" />
          </div>
        </div>

        <div className="mx-[25px] mt-[15px] flex flex-col">
          <div className="flex h-[53px] w-full flex-col justify-center rounded-[5px] bg-white">
            <input
              onFocus={() => setFocus(true)}
              onBlur={() => setFocus(false)}
              className="text- border-none bg-white pl-[8px] font-roboto text-[20px] text-g-font outline-none"
              type="text"
              value={titleInput}
              onChange={handleTitleChange}
              placeholder="Add title"
            />
            <div className={focus ? "active" : "inactive"}></div>
          </div>

          <div className="mt-[25px] flex h-[36px] w-full">
            <div
              onClick={handleMainClick}
              className=" flex cursor-pointer items-center rounded-[5px] bg-white"
            >
              <span className="font-regular whitespace-nowrap p-[8px] font-roboto font-[14px] text-g-font">
                {displayed}
              </span>
              <img src={DropdownArrow} alt="^" className="mr-[8px]" />
              {userData && userData.length > 0 && (
                <div
                  id="calendarPopUp"
                  style={{
                    height: `${userData.length * 36 + 16}px`,
                    width: `${width}px`,
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
            <div
              onClick={handleColorClick}
              className=" ml-[25px] flex w-[60px] cursor-pointer items-center justify-center rounded-[5px] bg-white"
            >
              <div
                style={{ backgroundColor: calendarColorCode }}
                id="colorDisplay"
                className="m-[3px] h-[18px] w-[18px] rounded-[9px]"
              ></div>
              <img src={DropdownArrow} alt="^" className="px-[5px] py-[7px]" />

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
            </div>
          </div>

          <textarea
            className="mt-[25px] h-[176px] rounded-[5px] border-none bg-white pl-[8px] pt-[13px] font-roboto text-[14px] font-medium text-g-font outline-none"
            value={descriptionInput}
            onChange={handleDescriptionChange}
            placeholder="Add description"
          ></textarea>
        </div>
      </div>
    </>
  );
};

export default Form;
