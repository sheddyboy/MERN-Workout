import { formatDistanceToNow } from "date-fns";
import React from "react";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useWorkoutsContext } from "../../hooks/useWorkoutContext";
import { WorkoutsTypes } from "../../pages/Home";

interface WorkoutDetailsTypes {
  workout: WorkoutsTypes;
}

const WorkoutDetails = ({ workout }: WorkoutDetailsTypes) => {
  const { state: authState } = useAuthContext();
  const { user } = authState;

  const { dispatch } = useWorkoutsContext();
  const handleClick = async () => {
    if (!user) {
      return;
    }

    const response = await fetch(
      `${process.env.REACT_APP_BASE_URL}/api/workouts/` + workout._id,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      }
    );
    const data = await response.json();

    if (response.ok) {
      dispatch({ type: "DELETE_WORKOUT", payload: data });
    }
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
