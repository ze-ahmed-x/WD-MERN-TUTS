import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export const UseAuthContext = () => {
    const context = useContext(AuthContext);
    if (!context){
        throw Error("UseAuth must be used inside UseAuthContextProvider");
    }
    return context;
}

