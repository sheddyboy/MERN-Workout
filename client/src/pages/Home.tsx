import React, { useEffect } from "react";
import WorkoutDetails from "../components/WorkoutDetails/WorkoutDetails";
import WorkoutForm from "../components/WorkoutForm/WorkoutForm";
import { useAuthContext } from "../hooks/useAuthContext";
import { useWorkoutsContext } from "../hooks/useWorkoutContext";

export interface WorkoutsTypes {
  title: string;
  reps: number;
  load: number;
  _id: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

const Home = () => {
  const { state, dispatch } = useWorkoutsContext();
  const { workouts } = state;
  const { state: authState } = useAuthContext();
  const { user } = authState;
  useEffect(() => {
    const fetchWorkouts = async () => {
      const response = await fetch(`${process.env.BASE_URL}/api/workouts`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      const data = await response.json();

      response.ok && dispatch({ type: "SET_WORKOUTS", payload: data });
    };
    user && fetchWorkouts();
  }, [dispatch, user]);

  return (
    <div className="home">
      <div className="workouts">
        {workouts &&
          workouts.map((workout) => (
            <WorkoutDetails workout={workout} key={workout._id} />
          ))}
      </div>
      <WorkoutForm />
    </div>
  );
};

export default Home;
