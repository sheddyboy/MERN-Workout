import { formatDistanceToNow } from "date-fns";
import React from "react";
import { useWorkoutsContext } from "../../hooks/useWorkoutContext";
import { WorkoutsTypes } from "../../pages/Home";

interface WorkoutDetailsTypes {
  workout: WorkoutsTypes;
}

const WorkoutDetails = ({ workout }: WorkoutDetailsTypes) => {
  const { dispatch } = useWorkoutsContext();
  const handleClick = () => {
    fetch("/api/workouts/" + workout._id, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => dispatch({ type: "DELETE_WORKOUT", payload: data }))
      .catch((err) => console.log(err));
  };
  return (
    <div className="workout-details">
      <h4>{workout.title}</h4>
      <p>
        <strong>Load (kg)</strong>
        {workout.load}
      </p>
      <p>
        <strong>Reps (kg)</strong>
        {workout.reps}
      </p>
      <p>
        {formatDistanceToNow(new Date(workout.createdAt), { addSuffix: true })}
      </p>
      <span className="material-symbols-outlined" onClick={handleClick}>
        delete
      </span>
    </div>
  );
};

export default WorkoutDetails;
