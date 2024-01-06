import { useState, useEffect } from 'react';
import DropdownArrow from '../../assets/dropdownArrow.svg'
import Pencil from '../../assets/Pencil.svg'
import '../Shared/styles.css';
import { useLoadContext } from '../../contexts/LoadedContext.jsx'
import { useDataContext } from '../../contexts/DataContext.jsx'

const Form = () => {

  // Contexts
  const { calLoaded, updateCalLoad} = useLoadContext();
  const { dataArray, updateData} = useDataContext();


  // States
  const [isLineFocused, setIsLineFocused] = useState(false);
  const [calendarName, setCalendarName] = useState();
  const [calendarColorCode, setCalendarColorCode] = useState();
  const [titleInput, setTiitleInput] = useState('');
  const [descriptionInput, setDescriptionInput] = useState('');


  // Blue line in Input
  const activeState = () => {
    setIsLineFocused(true);
  };
  const inactiveState = () => {
    setIsLineFocused(false);
  };


  // Load Default Values from data
  let timeoutId;
  const populateData = () => {
    if (calLoaded !== null) {
      for (let i = 0; i < dataArray.length; i++) {
        if(dataArray[i].primary === true) {
          setCalendarName(dataArray[i].summary);
          setCalendarColorCode(dataArray[i].backgroundColor);
        }
      };
      clearTimeout(timeoutId);
      return;
    } else {
      timeoutId = setTimeout(populateData, 100);
    }
  };
  useEffect(() => {
    populateData();
    return () => {
      clearTimeout(timeoutId);
    };
  }, [calLoaded]);


  // Create Calendar List Popup
  let userColor;
  const calendarCreation = (e) => {
    const calendarPopUp = document.createElement('div');
    calendarPopUp.id = "calendarPopUp";
    calendarPopUp.style.height = `Math((${dataArray.length} * 36 + 16)px)`;
    e.currentTarget.appendChild(calendarPopUp);
    let currentWidth = e.currentTarget.offsetWidth;


    for (let i = 0; i < dataArray.length; i++) {
      const calendarItem = document.createElement('span');
      calendarItem.innerHTML = dataArray[i].summary;
      calendarItem.classList.add("calendarListItem");
      calendarItem.style.width = `${currentWidth}px`;
      calendarItem.id = dataArray[i].summary;
      calendarPopUp.appendChild(calendarItem);

      calendarItem.addEventListener('click', () => {
        setCalendarName(dataArray[i].summary);
        userColor = dataArray[i].backgroundColor;
        setCalendarColorCode(userColor);
        calendarPopUp.remove();
      });
    };
  };


  // Create Color Grid Popup
  const colorCreation = (e) => {
    let colorPallet = [
      '#C4291C', '#D98177',
      '#E35D33', '#EEC04C',
      '#5DB37E', '#397E49',
      '#429ADF', '#4153AF',
      '#7B87C6', '#8331A4',
      '#616161', userColor
    ]; 
    let colorSelectionArray = [];
    const colorPopUp = document.createElement('div');
    colorPopUp.id = "colorPopUp";
    e.currentTarget.appendChild(colorPopUp);

    const colorContainer = document.createElement('div');
    colorContainer.id = "colorContainer";
    colorPopUp.appendChild(colorContainer);

    for (let i = 0; i < 6; i++) {
      const colorRow = document.createElement('div');
      colorRow.classList.add('colorRow');
      colorContainer.appendChild(colorRow);

      for (let i = 0; i < 2; i++) {
        const colorSelection = document.createElement('div');
        colorSelection.classList.add('colorSelection');
        colorSelectionArray.push(colorSelection);
        colorRow.appendChild(colorSelection);

        colorSelection.addEventListener('click', () => {
          setCalendarColorCode(colorSelection.style.backgroundColor);
          colorPopUp.remove();
        });
      };
    };

    for (let i = 0; i < colorSelectionArray.length; i++) {
      colorSelectionArray[i].style.backgroundColor = colorPallet[i];
    };
  };


  // Update Title Chnage
  const handleTitleChange = (e) => {
    setTiitleInput(e.target.value)
  };


  // Update Description Change
  const handleDescriptionChange = (e) => {
    setDescriptionInput(e.target.value);
  };


  // Save / Edit Button
  const handleSave = (e) => {
    e.currentTarget.classList.toggle("buttonEdit");
    let saveOrEdit = e.currentTarget.firstElementChild;
    saveOrEdit.textContent === "Save" ? saveOrEdit.textContent = "Edit" : saveOrEdit.textContent = "Save";
    let formData = {
      'title': titleInput,
      'summary': calendarName,
      'backgroundColor': calendarColorCode,
      'description': descriptionInput,
    };
    console.log(formData);
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
              <input onFocus={activeState} onBlur={inactiveState}
              className='pl-[8px] bg-white text- border-none outline-none text-[20px] text-g-font font-roboto'
              type="text" value={titleInput} onChange={handleTitleChange} placeholder="Add title"/>
              <div className={isLineFocused ? 'active' : 'inactive'}></div>
            </div>

            <div className="flex h-[36px] w-full mt-[25px]">
              <div onClick={calendarCreation} 
                className="relative flex items-center rounded-[5px] bg-white cursor-pointer">
                <span className='font-[14px] font-regular p-[8px] text-g-font font-roboto whitespace-nowrap'>{calendarName}</span>
                <img src={DropdownArrow} alt="^" className="mr-[8px]"/>
              </div>
              <div onClick={colorCreation} 
                className="relative flex items-center justify-center rounded-[5px] w-[60px] ml-[25px] bg-white cursor-pointer">
                <div style={{ backgroundColor: calendarColorCode}} id="colorDisplay" className='w-[18px] h-[18px] rounded-[9px] m-[3px]'></div>
                <img src={DropdownArrow} alt="^" className="px-[5px] py-[7px]"/>
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