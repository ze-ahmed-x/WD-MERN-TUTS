import { UseAuthContext } from "../hooks/UseAuthContext";
import { UseWorkoutContext } from "../hooks/UseWorkoutContext";
import formatDistanceToNow from "date-fns/formatDistanceToNow";


const WorkoutDetails = ({workout}) => {
    const { dispatch } = UseWorkoutContext();
    const { user } = UseAuthContext();

    const handleClick = async ()=> {
        if (!user){
            return;
        }
        // delete from DB
        const response = await fetch('/api/workouts/' + workout._id, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${user.token}`
            }
        });
        const json = await response.json();
        if (response.ok){
            //delete form context as well
            dispatch({type: 'DELETE_WORKOUT', payload: json});
        }
    }
    return (
        <div className="workout-details">
            <h4>{workout.title}</h4>
            <p><strong>Load (KG):  </strong>{workout.load}</p>
            <p><strong>Reps:  </strong>{workout.reps}</p>
            <p>{formatDistanceToNow(new Date(workout.createdAt), {addSuffix: true}) }</p>
            <span onClick={handleClick}>Delete</span>
        </div> 

    );
}
 
export default WorkoutDetails;