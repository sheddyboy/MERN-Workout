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
        ...state,
        user: action.payload,
      };
    case "LOGOUT":
      return {
        ...state,
        user: null,
      };
    default:
      return state;
  }
};

export const AuthContextProvider = ({ children }: AuthContextProviderTypes) => {
  const [state, dispatch] = useReducer(authReducer, {
    user: null,
  });
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user")!);
    let error = false;

    if (user) {
      fetch(`${process.env.BASE_URL}/api/user/verify`, {
        method: "POST",
        body: JSON.stringify(user),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => {
          error = !res.ok;
          return res.json();
        })
        .then((data) => {
          if (error) throw new Error(data.message);
          dispatch({ type: "LOGIN", payload: data });
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
