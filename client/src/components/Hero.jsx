import IconsFrame from "../assets/IconsFrame.svg";
import Authorization from "./Authorization.jsx";
import heroGraphic from "../assets/heroGraphic.svg";

const Hero = () => {
  return (
    <>
      <div className="ml-[90px] mt-[66px] flex h-screen w-screen flex-col items-start">
        <div className="relative flex">
          <div className="absolute left-[-90px] top-[59px] h-[0.5px] w-screen bg-light-grey opacity-50"></div>
          <div className="absolute bottom-[59px] left-[-90px] h-[0.5px] w-screen bg-light-grey opacity-50"></div>
          <div className="absolute left-[-15px] top-[-190px] h-screen w-[0.5px] bg-light-grey opacity-50"></div>
          <h1 className="font-poppins text-[150px] font-bold text-light-grey">
            WELCOME
          </h1>
          <div className="absolute right-[-15px] top-[-190px] h-screen w-[0.5px] bg-light-grey opacity-50"></div>
        </div>
        <h2 className="block w-[467px] font-poppins text-[20px] font-light text-light-grey">
          Timer for Google Calendar automates your events for increased
          productivity. Track events and analyze results.
        </h2>
        <img src={IconsFrame} alt="icons" className="ml-[137px] mt-[55px]" />
        <Authorization />
      </div>
      <img
        src={heroGraphic}
        alt="graphic"
        className="absolute right-[37px] top-[446px]"
      />
    </>
  );
};

export default Hero;
