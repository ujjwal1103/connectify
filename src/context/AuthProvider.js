import React, {
  createContext,
  useContext,
  useReducer,
  useMemo,
  useCallback,
  useEffect,
} from "react";

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

const initialState = {
  user: JSON.parse(localStorage.getItem("user")),
};

function authReducer(state, action) {
  switch (action.type) {
    case "LOGIN":
      return { ...state, user: action.payload };
    case "LOGOUT":
      return { ...state, user: null };
    default:
      return state;
  }
}

export function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(authReducer, initialState);

  function login(user) {
    dispatch({ type: "LOGIN", payload: user });
  }

  function logout() {
    dispatch({ type: "LOGOUT" });
  }

  const contextValue = useMemo(() => {
    return { user: state.user, login, logout };
  }, [state]);

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
}
