import TodoList from "./components/TodoList";
import SearchTodoForm from "./components/SearchTodoForm";
import AddTodoModal from "./components/AddTodoModal";
import { useModalContext } from "./context/ModalContext";
import TaskMetrics from "./components/Metrics";

function App() {
  const { setOpen, setId } = useModalContext();

  const handleAdd = () => {
    setId("");
    setOpen(true);
  };

  return (
    <main className="py-10 h-screen space-y-5 text-center">
      <h1 className="text-3xl font-bold text-center">To-do App</h1>
      <div className=" bg-slate-100 rounded-lg p-5 space-y-5 m-8">
        <SearchTodoForm />
      </div>
      <div className="p-4">
        <button className="bg-black text-white px-4 py-2" onClick={handleAdd}>
          Add Todo
        </button>
        <AddTodoModal />
      </div>
      <div>
        <TodoList />
      </div>
    </main>
  );
}

export default App;
