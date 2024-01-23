import Navbar from '../components/Navbar.jsx'
import Form from '../components/Form.jsx'
import DigitalClock from '../components/DigitalClock.jsx'

const Timer = () => {
  return (
    <>
      <Navbar />
      <div className="flex">
          <Form />
          <DigitalClock />
      </div>
    </>
  )
};

export default Timer