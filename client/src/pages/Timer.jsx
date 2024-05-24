import { useState } from "react";
import Form from "../components/Form.jsx";
import DigitalClock from "../components/DigitalClock.jsx";
import Card from "../components/Card.jsx";
import End from "../components/End.jsx";

const Timer = () => {
  const [formData, setFormData] = useState({
    calendar: "",
    calendarId: null,
    summary: "",
    colorId: null,
    backgroundColor: null,
    description: "",
    safety: true,
    saved: false,
  });

  const updateFormData = (newData) => {
    setFormData((prevData) => ({
      ...prevData,
      ...newData,
    }));
  };

  const [resData, setResData] = useState();

  const updateResData = (res) => {
    setResData(res);
  };

  const [completed, setCompleted] = useState({
    timer: false,
    calendar: false,
  });

  const updateCompleted = (status) => {
    setCompleted(status);
  };

  return (
    <div className="w-[calc(100% - 18rem)] mobile:w-[calc(100% - 4.5rem)] mx-[9rem] mt-[21.1rem] flex h-[125vh] justify-center mobile:mx-[2.5rem] mobile:mb-[30rem] mobile:mt-[12.2rem] mobile:h-fit mobile:flex-col wide:h-[150vh]">
      {completed.calendar ? (
        <End
          updateFormData={updateFormData}
          updateCompleted={updateCompleted}
        />
      ) : (
        <div className="flex w-full justify-between mobile:flex-col">
          <Card updateFormData={updateFormData} formData={formData} />
          <DigitalClock
            completed={completed}
            updateCompleted={updateCompleted}
            formData={formData}
            updateFormData={updateFormData}
          />
          <Form
            completed={completed}
            formData={formData}
            updateFormData={updateFormData}
            resData={resData}
            updateResData={updateResData}
          />
        </div>
      )}
    </div>
  );
};

export default Timer;
