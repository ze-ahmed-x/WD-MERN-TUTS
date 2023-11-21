import { useEffect } from "react";
import WorkoutDetails from "../components/WorkoutDetails";
import WorkoutForm from "../components/WorkoutForm";
import { UseWorkoutContext } from "../hooks/UseWorkoutContext";
import { UseAuthContext } from "../hooks/UseAuthContext";

const Home = () => {
    // const [workouts, setWorkouts] = useState(null);
    const {workouts, dispatch } = UseWorkoutContext();
    const { user } = UseAuthContext();
    useEffect(() => {
        document.title = 'Workouts';
        const fetchWorkouts = async ()=> {
            try {
                const response = await fetch('/api/workouts/', {
                    headers: {
                        'Authorization': `Bearer ${user.token}`
                    }
                });
                // console.log(response);
                if (response.ok){
                    const json = await response.json();
                    // console.log(json);
                    // setWorkouts(json);
                    dispatch({type: 'SET_WORKOUTS', payload: json});
                }
            } catch (error) {
                console.log("i am in exception");
            }
        }
        if (user){
            fetchWorkouts();
        }
    }, [dispatch, user])
    return ( 
        <div className="home">
            <div className="workouts">
                {workouts && workouts.map((workout)=> (
                    // <p key={workout._id}>{workout.title}</p>
                    <WorkoutDetails key={workout._id} workout= {workout} />
                ))}
            </div>
            <WorkoutForm />
        </div>
     );
}

export default Home;