import { useState } from "react";
import { UseAuthContext } from "./UseAuthContext";

export const UseSignup = ()=> {
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(null);
    const {dispatch} = UseAuthContext();
    const signup = async (email, password) => {
        setIsLoading(true);
        setError(null);
        const response = await fetch('/api/user/signup', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({email, password})
        })
        const json = await response.json();
        if (!response.ok){
            setIsLoading(false);
            setError(json.error);
        }
        else if (response.ok){
            //save the data to local storage of browser so that even if user close tab/ browser and come back he should be loged in
            localStorage.setItem("user", JSON.stringify(json));
            // set context by using its patch functon
            dispatch({type: 'LOGIN', payload: json});
            setIsLoading(false);            
        }
    }
    return {signup, isLoading, error}
}
