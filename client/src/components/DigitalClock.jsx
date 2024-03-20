import React, { useState, useEffect } from 'react';
import StartTimer from '../assets/Start.svg';
import './styles.css';


const DigitalClock = () => {

    // States
    const [start, setStart] = useState(false);
    const [safeOff, setSafeOff] = useState(true);
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


    function startTimerFunction () {
        setStart(!start);
        setSafeOff(false);
    };


    const resetButton = () => {
        setStart(false)
        setSafeOff(true);
        setSeconds(0)
        setMinutes(0)
        setHours(0)
    }; 


    function postData () {
    }

        

    return (
        <div className="flex flex-col ml-[78px] mt-[85px]">
            <div className="flex gap-[25px]">
                <div className="flex justify-center items-center w-[300px] h-[300px] bg-light-dark rounded-[30px]">
                    <div className='font-poppins text-[230px] font-extrabold text-light-grey tracking-[-5px]'>{String(hours).padStart(2, '0')}</div>
                </div>
                <div className="flex justify-center items-center w-[300px] h-[300px] bg-light-dark rounded-[30px]">  
                    <div className='font-poppins text-[230px] font-extrabold text-light-grey tracking-[-5px]'>{String(minutes).padStart(2, '0')}</div>
                </div>
                <div className="flex justify-center items-center w-[132px] h-[132px] bg-light-dark rounded-[30px]">
                    <div className='font-poppins text-[100px] font-extrabold text-light-grey tracking-[-5px]'>{String(seconds).padStart(2, '0')}</div>
                </div>
            </div>
                <div className="flex gap-[25px]">
                    <div onClick={startTimerFunction} className={start ? 'stop-btn' : 'start-btn'}>
                        <div className="flex items-center">
                            <img src={StartTimer} alt="icon" className='w-[16px] h-[16px]'/>
                            <span className='ml-[10px] text-[20px] font-semibold text-off-white font-poppins tracking-[1px]'>{start ? 'Stop Timer' : 'Start Timer'}</span>
                        </div>
                    </div>
                    <div onClick={resetButton} className="flex justify-center items-center bg-light-dark rounded-[8px] w-[112px] h-[50px] border-solid border-light-grey border-[1px] mt-[50px] cursor-pointer">
                        <span className='text-[20px] font-semibold text-off-white font-poppins tracking-[1px]'>RESET</span>
                    </div>
                <div onClick={start ? null : postData} className={!start && !safeOff ? 'activeAdd' : 'inactiveAdd'}>
                    <div className="flex items-center">
                        <svg width="18" height="20" viewBox="0 0 18 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g opacity={!start && !safeOff ? "1" : "0.5"} clip-path="url(#clip0_42_6897)">
                            <path fillRule="evenodd" clipRule="evenodd" d="M6.09264 1.81007H12.0553C12.1172 1.81007 12.1788 1.81402 12.24 1.82195C14.6671 1.99168 16.5518 4.00591 16.56 6.43895V13.3823C16.551 15.9441 14.4692 18.0148 11.9074 18.0101H6.09264C3.53035 18.0148 1.44834 15.9435 1.44 13.3812V6.43895C1.44834 3.87667 3.53035 1.80528 6.09264 1.81007Z" stroke={!start && !safeOff ? "#E7EDF3" : "#B7B7B7"} strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M12.19 5.62896V6.38896H11.48V1.87196H13V5.57896H12.24H12.19V5.62896ZM11.4816 6.48896H12.19V7.19734C11.8101 7.17267 11.5063 6.86886 11.4816 6.48896ZM12.29 7.19896V6.48896H13.05H13.1V6.43896V5.67896H16.51V7.19896H12.29ZM17.32 6.43896C17.32 6.84189 17.0064 7.1716 16.61 7.19734V5.68058C17.0064 5.70633 17.32 6.03602 17.32 6.43896ZM12.29 5.67896H13V6.38896H12.29V5.67896ZM12.9984 1.77196H11.4816C11.5074 1.37553 11.8371 1.06196 12.24 1.06196C12.6429 1.06196 12.9726 1.37553 12.9984 1.77196ZM11.92 10.4501C11.92 10.853 11.6064 11.1827 11.21 11.2085V9.69171C11.6064 9.71746 11.92 10.0472 11.92 10.4501ZM11.11 9.69009V11.2101H4.73V9.69009H11.11ZM4.63 11.2085C4.23357 11.1827 3.92 10.853 3.92 10.4501C3.92 10.0472 4.23357 9.71746 4.63 9.69171V11.2085ZM8.67999 7.21008C8.67999 7.61302 8.36641 7.94272 7.97 7.96846V6.4517C8.36641 6.47745 8.67999 6.80714 8.67999 7.21008ZM7.86999 6.45008V7.97008H4.73V6.45008H7.86999ZM4.63 7.96846C4.23357 7.94272 3.92 7.61302 3.92 7.21008C3.92 6.80714 4.23357 6.47745 4.63 6.4517V7.96846ZM13 13.6901C13 14.093 12.6864 14.4227 12.29 14.4485V12.9317C12.6864 12.9575 13 13.2872 13 13.6901ZM12.19 12.9301V14.4501H4.73V12.9301H12.19ZM4.63 14.4485C4.23357 14.4227 3.92 14.093 3.92 13.6901C3.92 13.2872 4.23357 12.9575 4.63 12.9317V14.4485Z" fill={!start && !safeOff ? "#E7EDF3" : "#B7B7B7"} stroke={!start && !safeOff ? "#E7EDF3" : "#B7B7B7"} strokeWidth="0.1"/>
                            </g>
                            <defs>
                            <clipPath id="clip0_42_6897" />
                            <rect width="18" height="18.9" fill="white" transform="translate(0 0.550049)"/>
                            </defs>
                        </svg>
                        <span style={!start && !safeOff ? {color: '#E7EDF3', opacity: '100'} : {color: '#B7B7B7', opacity: '50'}} className='ml-[10px] text-[20px] font-semibold font-poppins tracking-[1px]'>Add to Calendar</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DigitalClock