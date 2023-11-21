import { UseAuthContext } from "./UseAuthContext"
import { UseWorkoutContext } from "./UseWorkoutContext";


export const UseLogout = () => {
    const { dispatch } = UseAuthContext();
    const { dispatch: workOutDispatch} = UseWorkoutContext();
    const logout = ()=> {
        // remove from local storage
        localStorage.removeItem('user');
        // remove from context
        dispatch({type: 'LOGOUT'});
        workOutDispatch({type: 'SET_WORKOUTS', payload: null});
    }
    return {logout};
}