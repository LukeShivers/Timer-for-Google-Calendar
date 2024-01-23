import { useState, useEffect, useContext } from 'react';
import { useNavigate } from "react-router-dom";
import Logo from '../assets/Logo.svg'
import Github from '../assets/Github.svg'
import './styles.css';
import { useLoadContext } from '../contexts/LoadedContext.jsx'
import { SignOutContext } from '../contexts/SignOutContext.jsx'


const Navbar = () => {

  // Contexts
  // const { calLoaded, updateCalLoad} = useLoadContext();
  const calLoaded = true;
  const { signOut, updateSignOut } = useContext(SignOutContext);
  

  // States
  const [signedIn, setSignedIn] = useState(false);


  // Ever 100ms check if user signed in
  let timeoutId;
  const checkIfLoaded = () => {
    if (calLoaded !== null) {
      setSignedIn(true);
      clearTimeout(timeoutId);
    } else {
      timeoutId = setTimeout(checkIfLoaded, 100);
    }
  }


  // On click remove button and call signOut function 
  const signOutClick = (e) => {
    e.currentTarget.remove();
    const handleSignOut = signOut;
    handleSignOut();
  }


  // Call main function initially and if load status changes
  useEffect(() => {
    checkIfLoaded();
    return () => {
      clearTimeout(timeoutId);
    };
  }, [calLoaded]);


  return (
    <div className='flex justify-between items-center w-[calc(100% - 180px)] h-[75px] mt-[50px] mx-[90px] bg-light-dark rounded-[10px] border-solid border-[rgba(183,183,183,0.5)] border-[0.8px]'>
      <a href="/">
        <img src={Logo} alt="logo" className='ml-[50px]'
        />
      </a>
      <div className="flex items-center mr-[50px]">
        <a href='https://github.com/LukeShivers/Timer-for-Google-Calendar' target="_blank" className='flex items-center w-[166px] h-[40px] rounded-[8px] border-solid border-light-grey border-[1.5px]'>
          <div className='flex w-full justify-between mx-[15px]'>
            <span className='font-normal text-light-grey font-poppins'>Source Code</span>
            <img src={Github} alt="icon"/>
          </div>
        </a>
        {signedIn && (
          <div id='signoutBtn' onClick={signOutClick} className="flex justify-center items-center w-[105px] h-[40px] text-light-grey font-normal border-solid border-[1.5px] border-light-grey rounded-[8px] ml-[50px] font-poppins cursor-pointer">Sign Out</div>
        )}
      </div>
    </div>
  )
}

export default Navbar