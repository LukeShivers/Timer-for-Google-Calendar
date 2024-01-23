import IconsFrame from '../assets/IconsFrame.svg'
import Authorization from './Authorization.jsx'

const Hero = () => {
  return (
    <div className='absolute flex flex-col items-start h-screen w-screen ml-[90px] mt-[66px]'>
        <div className="relative flex">
          <div className="absolute left-[-90px] top-[59px] w-screen h-[0.5px] bg-light-grey opacity-50"></div>
          <div className="absolute left-[-90px] bottom-[59px] w-screen h-[0.5px] bg-light-grey opacity-50"></div>
          <div className="absolute top-[-190px] w-[0.5px] h-screen left-[-15px] bg-light-grey opacity-50"></div>
          <h1 className='text-[150px] text-light-grey font-bold font-poppins'>WELCOME</h1>
          <div className="absolute top-[-190px] w-[0.5px] h-screen right-[-15px] bg-light-grey opacity-50"></div>
        </div>
        <h2 className='block w-[467px] text-[20px] text-light-grey font-light font-poppins'>Timer for Google Calendar automates your events for increased productivity. Track events and analyze results.</h2>
        <img src={IconsFrame} alt="icons" className='ml-[137px] mt-[55px]'/>
        <Authorization />
    </div>
  )
}

export default Hero