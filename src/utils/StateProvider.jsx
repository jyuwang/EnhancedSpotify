import { createContext, useContext, useReducer } from "react";

export const StateContext = createContext();

export const StateProvider = ({children, initialTasks, tasksReducer}) => (
    <StateContext.Provider value={useReducer(tasksReducer, initialTasks)}>
        {children}
    </StateContext.Provider>
);

export const useStateProvider = () => useContext(StateContext);