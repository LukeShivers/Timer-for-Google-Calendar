import { useState } from 'react'
import Navbar from '../components/Navbar.jsx'
import Form from '../components/Form.jsx'
import DigitalClock from '../components/DigitalClock.jsx'

const Timer = () => {

  const [formData, setFormData] = useState({
    title: null,
    summary: null,
    backgroundColor: null,
    description: null
  })


  const updateFormData = (newData) => {
    setFormData(newData);
  };


  return (
    <>
      <Navbar />
      <div className="flex">
          <Form updateFormData={updateFormData} />
          <DigitalClock formData={formData} />
      </div>
    </>
  )
};

export default Timer