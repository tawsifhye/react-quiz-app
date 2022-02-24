import { createContext, useReducer } from "react";


const initialState = {
    quizzes: []
}

const reducer = (state, action) => {
    if (action.type === 'LOAD_QUIZ') {
        return { ...state, quizzes: action.payload }
    }
}

export const DataContext = createContext();
export const DataProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    return (

        <DataContext.Provider value={{ dataContext: state, dispatch }}>
            {children}
        </DataContext.Provider>
    );
};
