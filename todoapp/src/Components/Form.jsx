import { useState } from "react";
import styles from "./Form.module.css";

export default function Form({ todos, setTodos }) {
  // const [todo, setTodo] = useState("");
  //   const [todos, setTodos] = useState([]);

  const [todo, setTodo] = useState({name:"", done: false});

  function handleSubmit(e) {
    e.preventDefault();
    setTodos([...todos, todo]);
    setTodo({name:"", done: false});
  }
  return (
    <form className={styles.modernForm} onSubmit={handleSubmit}>
      <div className={styles.modernContainer}>
        <input
          className={styles.modernInput}
          onChange={(e) => setTodo({name:e.target.value,done:false})}
          type="text"
          value={todo.name}
          placeholder="Enter ToDo .."
        />
        <button className={styles.modernButton} type="submit">Add</button>
      </div>
    </form>
  );
}
