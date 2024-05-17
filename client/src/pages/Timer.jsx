import { useState } from "react";
import Navbar from "../components/Navbar.jsx";
import Form from "../components/Form.jsx";
import DigitalClock from "../components/DigitalClock.jsx";
import Footer from "../components/Footer.jsx";
import End from "../components/End.jsx";

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
      <div className="flex h-screen">
        <Form complete={complete} updateFormData={updateFormData} />
        <DigitalClock
          complete={complete}
          updateComplete={updateComplete}
          formData={formData}
        />
      </div>
      {complete && <End updateComplete2={updateComplete} />}
      <Footer />
    </>
  );
};

export default Timer;
