import { useState } from "react";
import Navbar from "../components/Navbar.jsx";
import Form from "../components/Form.jsx";
import DigitalClock from "../components/DigitalClock.jsx";
import Card from "../components/Card.jsx";
import Footer from "../components/Footer.jsx";
import End from "../components/End.jsx";
import linkedIn from "../assets/linkedIn.svg";
import gitHubV2 from "../assets/gitHubV2.svg";
import instagram from "../assets/instagram.svg";
import codepen from "../assets/codepen.svg";

const Timer = () => {
  const [formData, setFormData] = useState({
    title: null,
    summary: null,
    backgroundColor: null,
    description: null,
  });
  const [complete, setComplete] = useState(false);

  const updateFormData = (newData) => {
    setFormData(newData);
  };

  const updateComplete = (status) => {
    setComplete(status);
  };

  return (
    <>
      <Navbar />
      <div className="flex flex-col">
        <div className="w-[calc(100% - 18rem)] mobile:w-[calc(100% - 4.5rem)] mx-[9rem] mt-[21.1rem] flex h-[125vh] justify-between mobile:mx-[2.5rem] mobile:mb-[30rem] mobile:mt-[13.4rem] mobile:h-fit mobile:flex-col wide:h-[150vh]">
          <Card />
          <Form complete={complete} updateFormData={updateFormData} />
          {/* <DigitalClock
          complete={complete}
          updateComplete={updateComplete}
          formData={formData}
        /> */}
        </div>
        <div className="absolute bottom-[20rem] ml-[9rem] flex flex-col mobile:bottom-[15rem] mobile:ml-[2.5rem] mobile:items-center">
          <span className="text-[2rem] font-bold text-off-white mobile:text-[1.6rem]">
            See what else the development team is up to :
          </span>
          <div className="mt-[2.5rem] flex w-[19.5rem] justify-around mobile:mt-[1.6rem]">
            <a href="https://www.linkedin.com/in/luke-shivers/" target="_blank">
              <img className="w-[3rem]" src={linkedIn} alt="LinkedIn" />
            </a>
            <a href="https://github.com/LukeShivers" target="_blank">
              <img className="w-[3rem]" src={gitHubV2} alt="GitHub" />
            </a>
            <a href="https://www.instagram.com/luke_shivers/" target="_blank">
              <img className="w-[3rem]" src={instagram} alt="Instagram" />
            </a>
            <a href="https://codepen.io/Luke-Shivers" target="_blank">
              <img className="w-[3rem]" src={codepen} alt="Codepen" />
            </a>
          </div>
        </div>
      </div>

      {complete && <End updateComplete2={updateComplete} />}
      <Footer />
    </>
  );
};

export default Timer;
