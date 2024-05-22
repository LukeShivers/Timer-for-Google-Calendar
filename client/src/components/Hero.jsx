import IconsFrame from "../assets/IconsFrame.svg";
import Authorization from "./Authorization.jsx";
import heroGraphic from "../assets/heroGraphic.svg";

const Hero = () => {
  return (
    <>
      <div className="ml-[9rem] mt-[19.1rem] flex h-[125vh] w-screen flex-col items-start mobile:mx-[2.5rem] mobile:ml-0 mobile:mt-[16.4rem] mobile:items-center wide:h-[150vh]">
        <div className="relative flex">
          <div className="absolute left-[-9rem] top-[5.9rem] h-[0.05rem] w-screen bg-light-grey opacity-50 mobile:left-[-3.3rem] mobile:top-[2.45rem]"></div>
          <div className="absolute bottom-[5.9rem] left-[-9rem] h-[0.05rem] w-screen bg-light-grey opacity-50 mobile:bottom-[2.5rem] mobile:left-[-3.3rem]"></div>
          <div className="absolute left-[-1.5rem] top-[-19rem] h-[200vh] w-[0.05rem] bg-light-grey opacity-50 mobile:left-[-0.8em]"></div>
          <h1 className="font-poppins text-[15rem] font-bold text-light-grey mobile:text-[6.4rem]">
            WELCOME
          </h1>
          <div className="absolute right-[-1.5rem] top-[-19rem] h-[200vh] w-[0.05rem] bg-light-grey opacity-50 mobile:right-[-0.8rem]"></div>
        </div>
        <h2 className="block w-[46.7rem] font-poppins text-[2rem] font-light text-light-grey mobile:ml-[3.8rem] mobile:w-[27.2rem] mobile:self-start mobile:text-[1.2rem]">
          Timer for Google Calendar automates your events for increased
          productivity. Track events and analyze results.
        </h2>
        <img
          src={heroGraphic}
          alt="graphic"
          className="absolute right-[3.7rem] top-[44.6rem] w-[66.7rem] mobile:relative mobile:right-0 mobile:top-0 mobile:mt-[3.2rem] mobile:w-[32.4rem]"
        />
        <img
          src={IconsFrame}
          alt="icons"
          className="ml-[13.7rem] mt-[5.5rem] w-[28.5rem] mobile:ml-0 mobile:mt-[3.2rem] mobile:w-[22.5rem]"
        />
        <Authorization />
      </div>
    </>
  );
};

export default Hero;
