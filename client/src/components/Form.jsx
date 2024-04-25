import { useState, useEffect } from 'react';
import DropdownArrow from '../assets/dropdownArrow.svg'
import Pencil from '../assets/Pencil.svg'
import './styles.css';
import useToken from '../hooks/useToken';


const Form = ({updateFormData}) => {

  const { token } = useToken();

  // States
  const [calendarColorCode, setCalendarColorCode] = useState();
  const [titleInput, setTiitleInput] = useState('');
  const [descriptionInput, setDescriptionInput] = useState('');

  const [displayed, setDisplayed] = useState();
  const [focus, setFocus] = useState(false);
  const [userData, setUserData] = useState();
  const [width, setWidth] = useState()
  const [visibility, setVisibility] = useState("none")
  const [colorVis, setColorVis] = useState("none")


  useEffect(() => {
    async function fetchCalendars () {
      const response = await fetch('http://localhost:3000/calendar', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ token: token })
      });
      const data = await response.json()
      const scrubbed = filterData(data.data)
      console.log(scrubbed);
      setUserData(scrubbed)
      setDefault(scrubbed)
    }
    fetchCalendars();

  }, [])


  function filterData(rawData) {
    const filteredData = [];
    rawData.forEach(item => {
      if (item.accessRole == "owner") {
        filteredData.push(item)
      }
    })
    return filteredData
  }


  function setDefault (data) {
    for (let i = 0; i < data.length; i++) {
      if (data[i].primary) {
        setDisplayed(data[i].summary);
        setCalendarColorCode(data[i].backgroundColor)
      }
    };
  }


  function handleMainClick(e) {
    setWidth(e.currentTarget.offsetWidth);
    visibility == "flex" ? setVisibility("none") : setVisibility("flex")
  };


  function handleSelection(e) {
    setDisplayed(e.target.textContent);
    // set the color to the corresponding color
  }
  

  const colorData = [
    {
      Tomato: '#C4291C',
      Flamingo: '#D98177'
    },
    {
      Tangerine: '#E35D33',
      Banana: '#EEC04C'
    },
    {
      Sage: '#5DB37E',
      Basil: '#397E49'
    },
    {
      Peacock: '#429ADF',
      Blueberry: '#4153AF'
    },
    {
      Lavendar: '#7B87C6',
      Grape: '#8331A4'
    },
    {
      Graphite: '#616161',
    }
  ]; 


  function handleColorClick() {
    colorVis == "flex" ? setColorVis("none") : setColorVis("flex")
  }


  function handleColorSelection(e) {
    setCalendarColorCode(e.currentTarget.style.backgroundColor);
  }

  // Update Title Chnage
  const handleTitleChange = (e) => {
    setTiitleInput(e.target.value)
  };

  // Update Description Change
  const handleDescriptionChange = (e) => {
    setDescriptionInput(e.target.value);
  };

  // Save / Edit Button
  function handleSave(e) {
    e.currentTarget.classList.toggle("buttonEdit");
    let saveOrEdit = e.currentTarget.firstElementChild;
    saveOrEdit.textContent === "Save" ? saveOrEdit.textContent = "Edit" : saveOrEdit.textContent = "Save";

    updateFormData({
      title: titleInput,
      summary: displayed,
      backgroundColor: calendarColorCode,
      description: descriptionInput
    })
  }


  return (
    <>
      <div className="flex flex-col bg-light-dark w-[400px] rounded-[10px] h-[467px] mt-[85px] ml-[90px]">
          <div className="flex">
            <h1 className='text-[36px] text-white font-bold pt-[33px] pl-[25px] font-poppins'>Add Event</h1>
            <div onClick={handleSave} className="buttonSave relative">
              <span className="block text-[14px] text-off-white font-medium font-poppins">Save</span>
              <img src={Pencil} alt="" className="hidden w-[30px] h-[30px]"/>
            </div>
          </div>

          <div className="flex flex-col mt-[15px] mx-[25px]">
            <div className="flex flex-col justify-center h-[53px] w-full rounded-[5px] bg-white">
              <input onFocus={() => setFocus(true)} onBlur={() => setFocus(false)}
              className='pl-[8px] bg-white text- border-none outline-none text-[20px] text-g-font font-roboto'
              type="text" value={titleInput} onChange={handleTitleChange} placeholder="Add title"/>
              <div className={focus ? 'active' : 'inactive'}></div>
            </div>

            <div className="flex h-[36px] w-full mt-[25px]">
              <div onClick={handleMainClick} className="relative flex items-center rounded-[5px] bg-white cursor-pointer">
                <span className='font-[14px] font-regular p-[8px] text-g-font font-roboto whitespace-nowrap'>{displayed}</span>
                <img src={DropdownArrow} alt="^" className="mr-[8px]"/>
                {userData && userData.length > 0 && (
                  <div id="calendarPopUp" style={{ height: `${(userData.length * 36 + 16)}px`, width: `${width}px`, display: visibility}}>
                    {userData.map(item => (
                      <span key={item.summary} onClick={handleSelection} className="calendarListItem">{item.summary}</span>
                    ))}
                  </div>
                )}
              </div>
              <div onClick={handleColorClick} className="relative flex items-center justify-center rounded-[5px] w-[60px] ml-[25px] bg-white cursor-pointer">
                <div style={{ backgroundColor: calendarColorCode}} id="colorDisplay" className='w-[18px] h-[18px] rounded-[9px] m-[3px]'></div>
                <img src={DropdownArrow} alt="^" className="px-[5px] py-[7px]"/>

                <div id="colorPopUp" style={{display: colorVis}}>
                  <div id="colorContainer">
                    {colorData.map((item, index) => (
                      <div key={index} className="colorRow">
                        {Object.entries(item).map((name, color) => (
                          <div key={name} onClick={handleColorSelection} style={{ backgroundColor: name[1] }} className="colorSelection"></div>
                        ))}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <textarea className='pl-[8px] pt-[13px] border-none outline-none text-[14px] font-medium text-g-font font-roboto h-[176px] mt-[25px] rounded-[5px] bg-white' 
            value={descriptionInput} onChange={handleDescriptionChange} placeholder="Add description"></textarea>
        </div>
      </div>
    </>
  )
}

export default Form