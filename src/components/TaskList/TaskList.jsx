import "./TaskList.css";
const TaskList = ({ list = [], hideCompleted, onChange, onDelete }) => {
  const filterList = () => {
    if (hideCompleted) {
      return list.filter((task) => !task.checked);
    }
    return list;
  };
  return (
    <>
      {list.length ? (
        filterList().map((task) => {
          const { id, title } = task;
          return (
            <div className="todos" key={id}>
              <input
                type="checkbox"
                checked={task.checked}
                onChange={(event) => onChange(id, event.target.checked)}
                className="todo_item_checkbox"
              />
              <p className={`todo_item_text ${task.checked ? "checked" : ""}`}>
                {title}
              </p>
              <button className="delete_task" onClick={() => onDelete(id)}>
                x
              </button>
            </div>
          );
        })
      ) : (
        <div className="paragraph">
          <p className="paragraph_1">
            Your life is a blank page. You write on it.
          </p>
          <p className="paragraph_2">So start by adding your tasks here.</p>
        </div>
      )}
    </>
  );
};

export default TaskList;
