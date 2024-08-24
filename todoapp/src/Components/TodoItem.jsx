import styles from "./Todoitem.module.css";

export default function TodoItem({ item, todos, setTodos }) {
  function handleDelete(item) {
    console.log("Delete The Click for item", item);
    setTodos(todos.filter((todo) => todo !== item));
  }
  function handleClick(name){
    setTodos( todos.map((todo)=> todo.name === name ? {...todo,done: !todo.done}: todo));

  }
  const cartName = item.done ? styles.completed : "";
  return (
    <div className={styles.item}>
      <div className={styles.itemName}>
        <span className={cartName} onClick={()=> handleClick(item.name)} >{item.name}</span>
        <span>
          <button
            onClick={() => handleDelete(item)}
            className={styles.deleteButton}
          >
            x
          </button>
        </span>
      </div>
      <hr className={styles.line} />
    </div>
  );
}
