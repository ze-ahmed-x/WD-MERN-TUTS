const express = require('express');
const {createWorkout, getWorkouts, getWorkout, deleteWorkout, updateWorkout} = require('../controllers/workoutController');
const requireAuth = require('../middleware/requireAuth');


const  router = express.Router();

//get auth first
router.use(requireAuth);

//get all workouts
router.get('/', getWorkouts);

//get a single workout
router.get('/:id', getWorkout);

//Post a new workout
router.post('/', createWorkout);

//Delete a workout
router.delete('/:id', deleteWorkout);

//Patch/ Edit a workout
router.patch ('/:id', updateWorkout);

module.exports = router;