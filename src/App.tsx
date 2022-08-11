import { useEffect, useState } from 'react'
import './App.css'
import { Todo } from './types'


function App() {
const [todos, setTodos]=useState<Todo[]>([])

useEffect(()=>{
  fetch('http://localhost:4000/todos')
  .then(resp=>resp.json())
  .then(todosFromServer=> setTodos(todosFromServer))
}, [])

  return (
    <div className="App">
      <header>
      <h1>List of todos:</h1>
      </header>
     <main>
     <ul>
      {todos.map(item=>(
        <li>
          <h3>{item.content}</h3>
        </li>
      ))}
     </ul>
     </main>
    </div>
  )
}

export default App
