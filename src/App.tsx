import { useEffect, useState } from "react";
import "./App.css";
import { Todo } from "./types";

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    fetch("http://localhost:4000/todos")
      .then((resp) => resp.json())
      .then((todosFromServer) => setTodos(todosFromServer));
  }, []);

   function toggleTask(item: Todo){
    const todosCopy=structuredClone(todos)
                let match=todosCopy.find(todo=>todo.id===item.id)
              match.finished=!item.finished
              setTodos(todosCopy)
   }

   function deleteTask(item: Todo){
    let filteredTodos=todos.filter(todo=> todo.id !== item.id)
    setTodos(filteredTodos)
   }


  return (
    <div className="App">
      <h1>List of todos:</h1>

      <main>
        <ul>
          {todos.map((item) => (
            <li className={item.finished ? 'finished' : 'not-finished'}
              key={item.id}>
              <h3 
               onClick={() => {

                fetch(`http://localhost:4000/todos/${item.id}`, {
                  method: "PATCH",
                  body: JSON.stringify({
                    finished: !item.finished,
                  }),
                  headers: {
                    "Content-type": `application/json; charset=UTF-8`,
                  },
                })
                .then((response) => response.json())
                toggleTask(item)
                
              }
            }>{item.content}</h3>
              
              <button onClick={()=>{
                fetch(`http://localhost:4000/todos/${item.id}`,{
                  method: 'DELETE',
                })
                .then(resp => resp.json())
              
                deleteTask(item)
              }}>
                delete</button>
            </li>
          ))}
        </ul>

        <form
          onSubmit={(event) => {
            event.preventDefault();
            fetch("http://localhost:4000/todos", {
              method: "Post",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                content: event.target.todo.value,
                finished: false,
              }),
            });
            let todo = {
              content: event.target.todo.value,
              finished: false,
            };

            setTodos([...todos, todo]);
            event.target.reset();
          }}
        >
          <input type="text" name="todo" placeholder="Add a todo..."></input>
          <button> submit </button>
        </form>
      </main>
    </div>
  );
}

export default App;
