import { useState } from "react";
import "./TaskInput.css";

const TaskInput = ({ value = "", onChange, onAdd }) => {
  const [error, setError] = useState(false);

  const inputHandler = (input) => {
    if (input.length >= 54) {
      setError(true);
    } else {
      setError(false);
    }
    onChange(input);
  };

  const buttonHandler = () => {
    if (error) {
      return;
    }
    onAdd();
  };

  return (
    <div className="task">
      <span className="task_text">Task</span>
      <div className="task_input">
        <input
          className={`main_input ${error ? "error" : ""}`}
          type="text"
          placeholder="Write here"
          value={value}
          onChange={(e) => inputHandler(e.target.value)}
        />
        <button type="button" onClick={buttonHandler}>
          Add
        </button>
        {error && (
          <div className="error">
            Task content can contain max 54 charachters{" "}
          </div>
        )}
      </div>
    </div>
  );
};

export default TaskInput;
