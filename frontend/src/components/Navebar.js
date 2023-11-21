import { Link } from 'react-router-dom';
import { UseLogout } from '../hooks/UseLogout';
import { UseAuthContext } from '../hooks/UseAuthContext';

const Navebar = () => {
    const {logout} = UseLogout();
    const { user } = UseAuthContext();
    const handleClick = ()=> {
        logout();
    }
    return (
        <header>
            <div className="container">
            <Link to='/'>
                <h1>Workout Buddy</h1>
            </Link>
            <nav>
                {user && (<div>
                    <span>{user.email}</span>
                    <button onClick={handleClick}>Log Out</button>
                </div>) }
                {!user && 
                <div>
                    <Link to='/login'> Sign In </Link>
                    <Link to='/signup'> Sign Up </Link>
                </div>
                }
            </nav>
            </div>
        </header>
    );
}

export default Navebar;