import { useState } from "react";
import DropdownArrow from "../assets/dropdownArrow.svg";

const Color = ({ resData, formData, updateFormData }) => {
  const [colorVis, setColorVis] = useState("none"); // holds the visibility of the color dropdown

  // The background color data for the color selection
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
      Default: formData.backgroundColor,
    },
  ];

  // Converts an rgb color string to a hex code
  function rgbStringToHex(rgbString) {
    var components = rgbString.match(/\d+/g);
    var r = parseInt(components[0]);
    var g = parseInt(components[1]);
    var b = parseInt(components[2]);
    var hexColor =
      "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
    return hexColor;
  }

  // Runs anytime the color selction box is selcted
  function handleColorClick() {
    colorVis == "flex" ? setColorVis("none") : setColorVis("flex");
  }

  // Runs everytime the calendar box is clicked (Desktop ONLY)
  function handleColorSelection(e) {
    const rgbColor = e.currentTarget.style.backgroundColor;
    var hexColor = rgbStringToHex(rgbColor);
    updateFormData({ backgroundColor: hexColor });
  }

  // Runs everytime the calendar box is clicked (Mobile ONLY)
  function mobileColorSelection(e) {
    const rgbColor = e.currentTarget.querySelector("div").style.backgroundColor;
    var hexColor = rgbStringToHex(rgbColor);
    updateFormData({ backgroundColor: hexColor });
  }

  return (
    <div
      onClick={handleColorClick}
      className=" ml-[2.5rem] flex w-[6rem] cursor-pointer items-center justify-center rounded-[0.5rem] bg-white mobile:ml-[2.125rem] mobile:w-[5.1rem] mobile:rounded-[0.425rem]"
    >
      {/* Default View */}
      <div
        style={{ backgroundColor: formData.backgroundColor }}
        id="colorDisplay"
        className="m-[0.3rem] h-[1.8rem] w-[1.8rem] rounded-[0.9rem] mobile:m-[0.255rem] mobile:h-[1.53rem] mobile:w-[1.53rem]"
      ></div>
      <img
        src={DropdownArrow}
        alt="^"
        className="ml-[0.3rem] w-[1rem] mobile:ml-[0.255rem] mobile:w-[0.85rem]"
      />
      {/* Mobile View */}
      {window.innerWidth <= 600 && resData && (
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
                <div key={`${index}-${color}`}>
                  {!(index === 0 && color === 0) && (
                    <div className="mt-[0.85rem] h-[0.025rem] w-[20rem] bg-off-white opacity-50"></div>
                  )}
                  <div
                    onClick={mobileColorSelection}
                    className="ml-[2.6rem] mt-[0.85rem] flex w-[15.8rem] items-center justify-between"
                  >
                    <span className="font-poppins text-[1.3rem] font-medium text-off-white">
                      {name[0]}
                    </span>
                    <div
                      style={{
                        backgroundColor: name[1],
                      }}
                      className="h-[1.3rem] w-[1.3rem] rounded-[0.3rem]"
                    ></div>
                  </div>
                </div>
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
  );
};

export default Color;
