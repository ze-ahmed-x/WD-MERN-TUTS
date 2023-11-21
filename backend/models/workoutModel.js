const mongoos = require('mongoose');

const Schema = mongoos.Schema;

const workoutSchema = Schema({
    title: {
        type: String,
        required: true
    },
    reps: {
        type: Number,
        required: true
    },
    load: {
        type: Number,
        required: true
    },
    user_id: {
        type: String,
        required: true
    }
}, {timestamps: true});

module.exports = mongoos.model("Workout", workoutSchema);

