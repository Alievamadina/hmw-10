import { createContext, useReducer } from "react";
import { v4 } from "uuid";

export const TodoContext = createContext();

const initialState = {
  todos: [],
  currentTodo: "",
};

function todoReducer(state, action) {
  switch (action.type) {
    case "ADD_TODO":
      return {
        ...state,
        todos: [
          ...state.todos,
          { text: action.payload, completed: false, id: v4() },
        ],
      };
    case "SET_CURRENT_TODO":
      return { ...state, currentTodo: action.payload };
    case "CLEAR_TODOS":
      return { ...state, todos: [] };
    case "DELETE_TODO":
      return {
        ...state,
        todos: state.todos.filter((todo) => todo.id !== action.payload),
      };
    case "EDIT_TODO":
      return {
        ...state,
        todos: state.todos.map((todo) => {
          if (todo.id === action.payload.index) {
            return { ...todo, text: action.payload.text };
          }
          return todo;
        }),
      };
    case "TOGGLE_TODO":
      return {
        ...state,
        todos: state.todos.map((todo) => {
          if (todo.id === action.payload) {
            return { ...todo, completed: !todo.completed };
          }
          return todo;
        }),
      };
    default:
      return state;
  }
}

export const TodoProvider = ({ children }) => {
  const [state, dispatch] = useReducer(todoReducer, initialState);
  const { todos, currentTodo } = state;

  return (
    <TodoContext.Provider value={[state, dispatch, currentTodo]}>
      {children}
    </TodoContext.Provider>
  );
};
