import React, { useState } from "react";
import "./Todo.css";

const Todo = () => {
  const [inputVlaue, setInputValue] = useState("");
  const [todo, setTodo] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState(null);
  const [editValue, setEditValue] = useState("");

  const addTodo = () => {
    if (inputVlaue !== "") {
      const newTodo = { id: new Date().getTime(), text: inputVlaue };

      setTodo([...todo, newTodo]);
      setInputValue("");
    }
  };

  const deleteTodo = (id) => {
    const updateTodo = todo.filter((todo) => todo.id !== id);
    setTodo(updateTodo);
  };

  const enterEdit = (id, text) => {
    setEditMode(true);
    setEditId(id);
    setEditValue(text);
  };

  const updateTodo = () => {
    const updateTodos = todo.map((todo) => {
      if (todo.id === editId) {
        return { ...todo, text: editValue };
      }
      return todo;
    });

    setTodo(updateTodos);
    setEditId(null);
    setEditValue("");
    setEditMode(false);
  };

  return (
    <div className="todo-container">
      <h2>To-Do</h2>
      <input
        type="text"
        value={inputVlaue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            addTodo();
          }
        }}
      />
      {editMode ? (
        <div>
          <input
            type="text"
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                updateTodo();
              }
            }}
          />
          <button onClick={updateTodo}>Update</button>
        </div>
      ) : (
        <button onClick={addTodo}>Add</button>
      )}

      <ul>
        {todo.map((todo) => (
          <li key={todo.id}>
            {todo.text}
            <div>
              <button onClick={() => deleteTodo(todo.id)}>Delete</button>
              <button onClick={() => enterEdit(todo.id, todo.text)}>Edit</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Todo;
