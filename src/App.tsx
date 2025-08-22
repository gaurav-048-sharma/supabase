import React, { useState } from 'react'
import './App.css'
import { supabase } from './supabase-client';



function App() {

  const [newTask, setNewTask] = useState({title: "", description: ""});

  const handleSubmit = async (e:any) => {
    e.preventDefault();
    // Add your submit logic here
    //console.log("New Task:", newTask);
    const {error}= await supabase.from("tasks").insert(newTask).single();

    if(error) {
      console.error("Error inserting data:", error.message);
    }

    setNewTask({title: "", description: ""});
  }
  return (
    <div className="App">
      <h1>Task Manager</h1>
      <form onSubmit={handleSubmit}>
        <input
          value={newTask.title}
          onChange={(e) => setNewTask(prev => ({...prev, title: e.target.value}))}
          placeholder="Task Title"
        />

        <textarea
          value={newTask.description}
          onChange={(e) => setNewTask(prev => ({...prev, description: e.target.value}))}
          placeholder="Task Description">

        </textarea>
        <button>Add</button>
      </form>
      {/* <ul>
        {tasks.map(task =>
          <li key={task.id}>
            {editingId === task.id ? (
              <>
                <input
                  value={editText}
                  onChange={e => setEditText(e.target.value)}
                />
                <button onClick={() => saveEdit(task.id)}>Save</button>
                <button onClick={() => setEditingId(null)}>Cancel</button>
              </>
            ) : (
              <>
                {task.text}
                <button onClick={() => startEdit(task)}>Edit</button>
                <button onClick={() => deleteTask(task.id)}>Delete</button>
              </>
            )}
          </li>
        )}
      </ul> */}
    </div>
  )
}

export default App