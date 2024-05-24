import linkedIn from "../assets/linkedIn.svg";
import gitHubV2 from "../assets/gitHubV2.svg";
import instagram from "../assets/instagram.svg";
import codepen from "../assets/codepen.svg";

const Social = () => {
  return (
    <div className="absolute bottom-[20rem] ml-[9rem] flex flex-col mobile:bottom-[15rem] mobile:ml-[2.5rem] mobile:items-center">
      <span className="text-[2rem] font-bold text-off-white mobile:text-[1.6rem] mobile:tracking-tight">
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
  );
};

export default Social;
