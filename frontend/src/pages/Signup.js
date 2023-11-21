import { useState, useEffect } from "react";
import { UseSignup } from "../hooks/UseSignup";


const Signup = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const {signup, isLoading, error} = UseSignup();
    
    useEffect (() => {
        document.title = 'Sign Up';
    }, []);

    const handleSumbit = async (e) => {
        e.preventDefault();
        await signup(email, password);
        // if (error){
        //     //move to home page
        //     setEmail('');
        //     setPassword('');
        // }
    }
    return (
        <form className="signup" onSubmit={handleSumbit}>
            <h3>Sign Up</h3>
            <label>Email: </label>
            <input type="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            />
            <label>Password</label>
            <input
            type="password" 
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            />
            <button disabled={isLoading}>Sign Up</button>
            {error && <div className="error"> {error} </div>}
            
        </form>
    )


}

export default Signup;
