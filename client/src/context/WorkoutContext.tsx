import React, { createContext, useReducer } from "react";
import { WorkoutsTypes } from "../pages/Home";
interface defaultReducerStates {
  workouts: WorkoutsTypes[];
}
interface InitialStateTypes {
  state: defaultReducerStates;
  dispatch: React.Dispatch<any>;
}
interface WorkoutsContextProviderTypes {
  children: React.ReactNode;
}

const initialState: InitialStateTypes = {
  state: {
    workouts: [],
  },
  dispatch: () => {},
};

export const WorkoutsContext = createContext(initialState);

export const workoutsReducer = (state: defaultReducerStates, action: any) => {
  switch (action.type) {
    case "SET_WORKOUTS":
      return {
        workouts: action.payload,
      };
    case "CREATE_WORKOUT":
      return {
        workouts: [action.payload, ...state.workouts],
      };
    case "DELETE_WORKOUT":
      return {
        workouts: state.workouts.filter((w) => w._id !== action.payload._id),
      };
    default:
      return state;
  }
};

export const WorkoutsContextProvider = ({
  children,
}: WorkoutsContextProviderTypes) => {
  const [state, dispatch] = useReducer(workoutsReducer, {
    workouts: null,
  });
  const value: InitialStateTypes = {
    state,
    dispatch,
  };

  return (
    <WorkoutsContext.Provider value={value}>
      {children}
    </WorkoutsContext.Provider>
  );
};
