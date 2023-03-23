import { createContext, useEffect, useReducer } from "react";

interface defaultReducerStates {
  user: {
    email: string;
    token: string;
  };
}
interface InitialStateTypes {
  state: defaultReducerStates;
  dispatch: React.Dispatch<any>;
}
interface AuthContextProviderTypes {
  children: React.ReactNode;
}

const initialState: InitialStateTypes = {
  state: {
    user: {
      email: "",
      token: "",
    },
  },
  dispatch: () => {},
};

export const AuthContext = createContext(initialState);

export const authReducer = (state: defaultReducerStates, action: any) => {
  switch (action.type) {
    case "LOGIN":
      return {
        user: action.payload,
      };
    case "LOGOUT":
      return {
        user: null,
      };
    default:
      return state;
  }
};

export const AuthContextProvider = ({ children }: AuthContextProviderTypes) => {
  const [state, dispatch] = useReducer(authReducer, { user: null });
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user")!);

    if (user) {
      fetch(`/api/user/verify`, {
        method: "POST",
        body: JSON.stringify(user),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => {
          if (!res.ok) throw new Error("Network response was not okay");
          return res.json();
        })
        .then((user) => {
          dispatch({ type: "LOGIN", payload: user });
        })
        .catch((err) => console.log(err));
    }
  }, []);
  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
