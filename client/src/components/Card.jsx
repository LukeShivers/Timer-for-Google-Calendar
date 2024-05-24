import React from "react";
import blueCheck from "../assets/blueCheck.svg";

const Card = ({ updateFormData, formData }) => {
  function editEvent() {
    updateFormData({ saved: false });
  }

  return (
    <div
      className="relative flex rounded-[1rem] bg-light-dark mobile:mt-[1.2rem] mobile:flex-col"
      style={{
        width: formData.saved
          ? window.innerWidth <= 600
            ? "34rem"
            : "40rem"
          : window.innerWidth > 600
            ? "78.8rem"
            : "34rem",
        height: formData.saved
          ? window.innerWidth <= 600
            ? "43.8rem"
            : "51.3rem"
          : window.innerWidth > 600
            ? "46.7rem"
            : "77.4rem",
      }}
    >
      <div className="ml-[3.6rem] mt-[5rem] flex flex-col mobile:ml-[2.1rem] mobile:mt-[4.5rem]">
        <div className="flex h-[16.4rem] w-[16.4rem] items-center justify-center self-center rounded-[10rem] bg-off-white mobile:ml-[-2.1rem] mobile:h-[14rem] mobile:w-[14rem]">
          {formData.saved ? (
            <img
              src={blueCheck}
              className="h-[10.1rem] w-[10.1rem] mobile:h-[8.622rem] mobile:w-[8.622rem]"
              alt="Blue Checkmark"
            />
          ) : (
            <span className="text-[9.6rem] mobile:text-[8rem]">👋</span>
          )}
        </div>
        <h1 className="mobile:text[3.3rem] mt-[3.6rem] text-[4rem] font-bold text-off-white mobile:mt-[2.2rem]">
          {formData.saved ? "Step 2." : "Hello"}
        </h1>
        <h2 className="mt-[2rem] w-[34.9rem] text-[1.8rem] font-bold text-off-white mobile:mt-[1.4rem] mobile:w-[31.1rem] mobile:text-[1.6rem]">
          {formData.saved
            ? "Your event details have been saved,  please begin timer."
            : "Thank you for using Calendar Timer! Follow our three easy steps to start tracking your events."}
        </h2>
        {formData.saved && (
          <div
            onClick={editEvent}
            className="mt-[3.6rem] flex h-[5rem] w-[32.8rem] cursor-pointer items-center justify-center rounded-[0.7rem] bg-blue mobile:h-[3.8rem] mobile:w-[29.8rem]"
          >
            <span className="font-poppins text-[2rem] font-semibold text-off-white mobile:text-[1.6rem]">
              Edit Event
            </span>
          </div>
        )}
      </div>

      {!formData.saved && (
        <>
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
        </>
      )}

      <div className="absolute left-[-9rem] top-[-3.6rem] h-[0.05rem] w-screen bg-light-grey opacity-50 mobile:left-[-2.5rem] mobile:top-[-1.2rem]"></div>
      <div className="absolute bottom-[-3.6rem] left-[-9rem] h-[0.05rem] w-screen bg-light-grey opacity-50 mobile:bottom-[-1.2rem] mobile:left-[-2.5rem]"></div>
      <div className="absolute right-[-3.6rem] mt-[-30rem] h-[200vh] w-[0.05rem] bg-light-grey opacity-50 mobile:left-[-0.8rem]"></div>
      <div className="absolute right-[-0.8em] top-[-19rem] hidden h-[200vh] w-[0.05rem] bg-light-grey opacity-50 mobile:block"></div>
    </div>
  );
};

export default Card;
