import Navbar from '../components/Shared/Navbar.jsx'
import Form from '../components/Timer/Form.jsx'
import DigitalClock from '../components/Timer/DigitalClock.jsx'

const Timer = () => {
  return (
    <>
      <Navbar />
      <div className="flex">
        <div>
          <Form />
        </div>
        <div>
          <DigitalClock />
        </div>
      </div>
    </>
  )
}

export default Timer