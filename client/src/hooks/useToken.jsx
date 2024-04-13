import { useContext } from "react";
import TokenContext from "../contexts/TokenContext";

const useToken = () => {
    return useContext(TokenContext);
}

export default useToken;