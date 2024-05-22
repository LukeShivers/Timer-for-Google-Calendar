import React from "react";

const Card = () => {
  return (
    <div className="relative flex h-[46.7rem] w-[78.8rem] rounded-[1rem] bg-light-dark mobile:h-[77.4rem] mobile:w-[34rem] mobile:flex-col">
      <div className="ml-[3.6rem] mt-[5rem] flex flex-col mobile:ml-[2.1rem] mobile:mt-[4.5rem]">
        <div className="flex h-[16.4rem] w-[16.4rem] items-center justify-center self-center rounded-[10rem] bg-off-white mobile:ml-[-2.1rem] mobile:h-[14rem] mobile:w-[14rem]">
          <span className="text-[9.6rem] mobile:text-[8rem]">👋</span>
        </div>
        <h1 className="mobile:text[3.3rem] mt-[3.6rem] text-[4rem] font-bold text-off-white mobile:mt-[2.2rem]">
          Hello
        </h1>
        <h2 className="mt-[2rem] w-[34.9rem] text-[1.8rem] font-bold text-off-white mobile:mt-[1.4rem] mobile:w-[31.1rem] mobile:text-[1.6rem]">
          Thank you for using Calendar Timer! Follow our three easy steps to
          start tracking your events.
        </h2>
      </div>

      <div className="ml-[0.9rem] mt-[5rem] h-[38rem] w-[0.08rem] bg-off-white opacity-50 mobile:ml-0 mobile:h-[0.08rem] mobile:w-[29.8rem] mobile:self-center"></div>

      <div className="ml-[3.6rem] mt-[5rem] flex flex-col mobile:ml-[2.1rem] mobile:mt-[4.5rem]">
        <div className="flex h-[16.4rem] w-[16.4rem] items-center justify-center self-center rounded-[10rem] bg-off-white mobile:ml-[-2.1rem] mobile:h-[14rem] mobile:w-[14rem]">
          <span className="text-[9.6rem] mobile:text-[8rem]">👉</span>
        </div>
        <h1 className="mobile:text[3.3rem] mt-[3.6rem] text-[4rem] font-bold text-off-white mobile:mt-[2.2rem]">
          Step 1.
        </h1>
        <h2 className="mt-[2rem] w-[30.3rem] text-[1.8rem] font-bold text-off-white mobile:mt-[1.4rem] mobile:w-[31.1rem] mobile:text-[1.6rem]">
          Please create the event details you would like to add to your
          calendar!
        </h2>
      </div>

      <div className="absolute left-[-9rem] top-[-3.6rem] h-[0.05rem] w-screen bg-light-grey opacity-50 mobile:left-[-2.5rem] mobile:mt-0"></div>
      <div className="absolute bottom-[-3.6rem] left-[-9rem] h-[0.05rem] w-screen bg-light-grey opacity-50 mobile:left-[-2.5rem]"></div>
      <div className="absolute right-[-3.6rem] mt-[-30rem] h-[200vh] w-[0.05rem] bg-light-grey opacity-50"></div>
    </div>
  );
};

export default Card;
