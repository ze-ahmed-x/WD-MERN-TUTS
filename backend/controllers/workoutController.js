const Workout = require('../models/workoutModel');
const mongoos = require('mongoose');

// Get all workouts
const getWorkouts = async (req, res) => {
    try {
        const workouts = await Workout.find({user_id: req.user._id}).sort({createdAt: -1});
        res.status(200).json(workouts);
    } catch (error) {
        res.status(400).json({error: error.message});
    }
}

// Get a single workout
const getWorkout = async (req, res) => {
    try {
        const {id} = req.params;
        if (! mongoos.Types.ObjectId.isValid(id)) {
            return res.status(404).json({error: "No such workout"});
        }
        const workout = await Workout.findById(req.params.id);
        if (!workout) {
            return res.status(404).json({error:  "Workout not found"});
        }
        res.status(200).json(workout);
    } catch (error) {
        res.status(400).json({error: error.message});
    }
}

// Post a workout
const createWorkout = async (req, res) => {
    const {title, reps, load} = req.body;
    try {
        const workout = await Workout.create({title, reps, load, user_id: req.user._id});
        res.status(200).json(workout);
    } catch (error) {
        res.status(400).json({error: error.message});
    }
}

// Delete a workout
const deleteWorkout = async (req, res) => {
    try {
        const {id} = req.params;
        if (!mongoos.Types.ObjectId.isValid(id)){
            return res.status(404).json({error: "No such workout"});
        }
        const workout = await Workout.findByIdAndDelete(id);
        // const workout = await Workout.findOneAndDelete({_id: id}); //alternate way; the one described in the tut
        if (!workout){
            return res.status(404).json({error: "No such workout"});
        }
        res.status(200).json(workout);
    } catch (error) {
        res.status(400).json({error: error.message});
    }
}

// Update a workout
const updateWorkout = async (req, res) => {
    try {
        const {id} = req.params;
        if (!mongoos.Types.ObjectId.isValid(id)){
            return res.status(404).json({error: "No such workout"});
        }
        const workout = await Workout.findByIdAndUpdate({_id: id}, {...req.body})
        if (!workout){
            return res.status(404).json({error: "No such workout"});
        }
        res.status(200).json(workout);
    } catch (error) {
        res.status(400).json({error: error.message});
    }
}

module.exports = {
    createWorkout,
    getWorkouts,
    getWorkout,
    deleteWorkout,
    updateWorkout
};