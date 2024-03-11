"use client";
import React, { createContext, useReducer, ReactNode } from "react";

interface UserData {
  image: string;
  username: string;
  name: string;
  bio: string;
  interests: string[];
  error: Error;
}

interface ProfileEditProviderProps {
  children: ReactNode;
  userData: UserData;
}

interface Context extends UserData {
  dispatch: React.Dispatch<Action>;
}

type Error = {
  username?: string | null;
  firstname?: string | null;
  lastname?: string | null;
  bio?: string | null;
}

type Action =
  | { type: "UPDATE_IMAGE"; payload: string }
  | { type: "UPDATE_USERNAME"; payload: string }
  | { type: "UPDATE_NAME"; payload: string }
  | { type: "UPDATE_BIO"; payload: string }
  | { type: "UPDATE_INTERESTS"; payload: string[] }
  | { type: "UPDATE_ERROR"; payload: Error };

export const DataContext = createContext<Context>({
  image: "",
  username: "",
  name: "",
  bio: "",
  interests: [],
  error: {},
  dispatch: () => {},
});

const reducer = (state: UserData, action: Action) => {
  switch (action.type) {
    case "UPDATE_IMAGE":
      return {
        ...state,
        image: action.payload,
      };
    case "UPDATE_USERNAME":
      return {
        ...state,
        username: action.payload,
      };
    case "UPDATE_NAME":
      return {
        ...state,
        name: action.payload,
      };
    case "UPDATE_BIO":
      return {
        ...state,
        bio: action.payload,
      };
    case "UPDATE_INTERESTS":
      return {
        ...state,
        interests: action.payload,
      };
    case "UPDATE_ERROR":
      return {
        ...state,
        error: {
          ...state.error,
          ...action.payload,
        },
      };
    default:
      return state;
  }
}

const DataProvider = ({
  children,
  userData,
}: ProfileEditProviderProps) => {
  const initialState : UserData = {
    image: userData.image,
    username: userData.username,
    name: userData.name,
    bio: userData.bio,
    interests: userData.interests,
    error: userData.error,
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <DataContext.Provider
      value={{
        image: state.image,
        username: state.username,
        name: state.name,
        bio: state.bio,
        interests: state.interests,
        error: state.error,
        dispatch,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}

export default DataProvider;