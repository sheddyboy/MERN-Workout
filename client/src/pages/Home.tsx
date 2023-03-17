import React, { useEffect } from "react";
import WorkoutDetails from "../components/WorkoutDetails/WorkoutDetails";
import WorkoutForm from "../components/WorkoutForm/WorkoutForm";
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
  useEffect(() => {
    fetch("/api/workouts")
      .then((res) => res.json())
      .then((data) => {
        dispatch({
          type: "SET_WORKOUTS",
          payload: data,
        });
        console.log(data);
      })
      .catch((err) => console.log("Error: ", err));
  }, [dispatch]);

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
