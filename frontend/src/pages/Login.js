import { useState, useEffect } from "react";
import { UseLogin } from "../hooks/UseLogin";


const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const {login, isLoading, error} = UseLogin();
    useEffect (() => {
        document.title = 'Login'
    }, []);
    
    const handleSumbit = async (e) => {
        e.preventDefault();
        // console.log(email, password);
        await login(email, password);
    }
    return (
        <form className="login" onSubmit={handleSumbit}>
            <h3>Sign In</h3>
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
            <button disabled={isLoading} >Sign In</button>
            {error && <div className = 'error'>{error}</div>}
        </form>
    )


}

export default Login;