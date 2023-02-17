import "./App.css";
import TodoForm from "./components/TodoForm/TodoForm";
import { TodoProvider } from "./store/TodoProvider";

function App() {
  return (
    <div className="App">
      <TodoProvider>
        <TodoForm />
      </TodoProvider>
    </div>
  );
}

export default App;
