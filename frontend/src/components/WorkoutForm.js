import { useState } from "react";
import { UseWorkoutContext } from "../hooks/UseWorkoutContext";
import { UseAuthContext } from "../hooks/UseAuthContext";


const WorkoutForm = () => {
    const { dispatch } = UseWorkoutContext();
    const [title, setTitle] = useState('');
    const [load, setLoad] = useState('');
    const [reps, setReps] = useState('');
    const [error, setError] = useState('');
    const { user } = UseAuthContext();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!user) {
            setError("Please log in first !");
            return;
        }
        const workout = {title, load, reps};
        const response = await fetch('/api/workouts/', {
            method: 'POST',
            body: JSON.stringify(workout),
            headers: {'Content-Type': 'application/json',
            'Authorization': `Bearer ${user.token}`}
        });
        console.log(response);
        const json = await response.json();
        if (response.ok) {
            setTitle('');
            setLoad('');
            setReps('');
            setError('');
            console.log('New Workout', json);
            dispatch({type: 'CREATE_WORKOUT', payload: json});
        }
        else if (!response.ok) {
            setError(json.error);
        }
    }

    return (
    <form className="create" onSubmit={handleSubmit}>
        <label > Title: </label>
        <input 
        type="text"
        onChange={(e) => setTitle(e.target.value)}
        value={title}
        />
        <label > Load (kg): </label>
        <input 
        type="number"
        onChange={(e) => setLoad(e.target.value)}
        value={load}
        />
        <label > Reps: </label>
        <input 
        type="number"
        onChange={(e) => setReps(e.target.value)}
        value={reps}
        />
        <button>Add Workout</button>
        {error && <div className="error">{error}</div>}
    </form>
     );
}
 
export default WorkoutForm;