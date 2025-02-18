import TodoList from "./components/TodoList";
import { useState } from "react";
import AddTodoModal from "./components/AddTodoModal";

function App() {

  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <main className='py-10 h-screen space-y-5 text-center'>
      <h1 className="text-3xl font-bold text-center">To-do App</h1>
        <div className="p-4">
          <button className="bg-black text-white px-4 py-2" onClick={()=> setIsModalOpen(true)}>
            Add Todo
          </button>
          {isModalOpen && <AddTodoModal onClose={() => setIsModalOpen(false)} onAddTodo={function (): void {
          throw new Error("Function not implemented.");
        } }/>}
        </div>
        <div>
        <TodoList/>
        </div>
    </main>
  );
}

export default App;
