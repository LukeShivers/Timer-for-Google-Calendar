import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Logo from "../assets/Logo.svg";
import Github from "../assets/Github.svg";
import "./styles.css";

const Navbar = () => {
  const { auth, setAuth } = useAuth();
  const navigate = useNavigate();

  const [mobile, setMobile] = useState(false);

  function signOutClick() {
    setAuth(false);
    navigate("/");
  }

  return (
    <div className="absolute z-50 mx-[9rem] mt-[5rem] flex h-[7.5rem] w-[126rem] items-center justify-between rounded-[1rem] border-[0.08rem] border-solid border-[rgba(183,183,183,0.5)] bg-light-dark mobile:mx-[4.5rem] mobile:mb-[4rem] mobile:mt-[4rem] mobile:h-[4.2rem] mobile:w-[30rem] mobile:border-none mobile:bg-transparent">
      <a href="/">
        <img
          src={Logo}
          alt="logo"
          className="ml-[5rem] w-[13.4rem] mobile:ml-0"
        />
      </a>
      <div className="mr-[5rem] flex items-center mobile:hidden">
        <a
          href="https://github.com/LukeShivers/Timer-for-Google-Calendar"
          target="_blank"
          className="flex h-[4rem] w-[16.6rem] items-center rounded-[0.8rem] border-[0.15rem] border-solid border-light-grey"
        >
          <div className="mx-[1.5rem] flex w-full justify-between">
            <span className="font-poppins text-[1.6rem] font-normal text-light-grey">
              Source Code
            </span>
            <img className="w-[1.4rem]" src={Github} alt="icon" />
          </div>
        </a>
        <div
          onClick={signOutClick}
          className="ml-[5rem] h-[4rem] w-[10.5rem] cursor-pointer items-center justify-center rounded-[0.8rem] border-[0.15rem] border-solid border-light-grey"
          style={auth ? { display: "flex" } : { display: "none" }}
        >
          <span className="font-poppins text-[1.6rem] font-normal text-light-grey">
            Sign Out
          </span>
        </div>
      </div>
      <div
        onClick={() => setMobile(!mobile)}
        className="absolute right-0 opacity-0 mobile:opacity-100"
      >
        <span
          style={{
            transform: mobile ? "translateY(0.8rem) rotate(45deg)" : "none",
          }}
          className="mb-[0.6rem] block h-[0.3rem] w-[3.2rem] rounded-[1rem] bg-off-white transition-all duration-300 ease-in-out"
        ></span>
        <span
          style={{ opacity: mobile ? "0" : "100" }}
          className="my-[0.6rem] block h-[0.3rem] w-[3.2rem] rounded-[1rem] bg-off-white transition-all duration-300 ease-in-out"
        ></span>
        <span
          style={{
            transform: mobile ? "translateY(-1rem) rotate(-45deg)" : "none",
          }}
          className="block h-[0.3rem] w-[3.2rem] rounded-[1rem] bg-off-white transition-all duration-300 ease-in-out"
        ></span>
      </div>
    </div>
  );
};

export default Navbar;
