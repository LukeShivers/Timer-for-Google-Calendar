import { useEffect } from "react";
import Google from "../assets/Google.svg";
import useAuth from "../hooks/useAuth";
import useToken from "../hooks/useToken";
import { useNavigate } from "react-router-dom";

export default function Authorization() {
  const { setAuth } = useAuth();
  const { setToken } = useToken();
  const navigate = useNavigate();

  function navWindow(url) {
    window.location.href = url;
  }

  async function fetchAuthUrl() {
    const response = await fetch("http://localhost:3000/requests", {
      method: "post",
    });
    const data = await response.json();
    console.log("Auth URL: ", data);
    navWindow(data.url);
  }

  async function authenticate() {
    const response = await fetch("http://localhost:3000/oauth", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ params: window.location.search }),
    });
    const data = await response.json();
    console.log(data);

    if (data.token) {
      setToken(data.token);
      setAuth(true);
      navigate("/timer");
    }
  }

  useEffect(() => {
    authenticate();
  }, []);

  return (
    <>
      <div
        onClick={() => fetchAuthUrl()}
        id="authorize_button"
        className="mobile:ml-0 mobile:mt-[3.2rem] ml-[15.4rem] mt-[5.5rem] flex h-[5rem] w-[25rem] cursor-pointer items-center justify-center rounded-[10rem] bg-off-white px-[1.8rem] py-[1.2rem]"
      >
        <div className="flex h-[5rem] w-[21.4rem] items-center justify-between">
          <img className="w-[2.4rem]" src={Google} alt="/" />
          <span className="font-poppins text-[1.6rem] font-semibold">
            Continue With Google
          </span>
        </div>
      </div>
    </>
  );
}
