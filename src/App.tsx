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
              console.log(match)
              match.finished=!item.finished
   }


  return (
    <div className="App">
      <h1>List of todos:</h1>


      <main>
        <ul>
          {todos.map((item) => (
            <li
              key={item.id}
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
            }


              
            >
              <h3>{item.content}</h3>
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
