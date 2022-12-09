import { useState } from "react";
import TaskInput from "./components/TaskInput/TaskInput";
import TaskList from "./components/TaskList/TaskList";
import "./App.css";
import Modal from "./components/Modal/Modal";

const getList = () => {
  const list = localStorage.getItem("list");
  if (!list) {
    localStorage.setItem("list", JSON.stringify([]));
  }
  return JSON.parse(localStorage.getItem("list"));
};

const saveList = (list) => {
  localStorage.setItem("list", JSON.stringify(list));
};

function App() {
  const [value, setValue] = useState("");
  const [list, setList] = useState(getList());
  const [deletingId, setDeletingId] = useState();

  const [isChecked, setIsChecked] = useState(false);
  const [isOpenModal, setIsOpenModal] = useState(false);

  const onChangeFilter = (event) => setIsChecked(event.target.checked);
  const onComplete = (id, checked) => {
    const task = list.find((task) => task.id === id);
    task.checked = checked;
    setList([...list]);
    saveList([...list]);
  };

  const addTask = () => {
    const newTask = {
      id: new Date().getTime().toString(),
      title: value,
      checked: false,
    };
    setValue("");
    setList([...list, newTask]);
    saveList([...list, newTask]);
  };

  const deleteTask = () => {
    const newList = list.filter((task) => task.id !== deletingId);
    setList(newList);
    saveList(newList);
    setIsOpenModal(false);
    setDeletingId(null);
  };

  const openModal = (id) => {
    setIsOpenModal(true);
    setDeletingId(id);
  };

  const closeModal = () => {
    setIsOpenModal(false);
    setDeletingId(null);
  };

  return (
    <div className="App container">
      <Modal open={isOpenModal} close={closeModal} remove={deleteTask} />
      <div className="row">
        <div
          className="hide_completed"
          style={{ visibility: list.length > 0 ? "visible" : "hidden" }}
        >
          <input
            type="checkbox"
            onChange={onChangeFilter}
            checked={isChecked}
            className="completed"
          />
          Hide completed
        </div>

        <TaskInput value={value} onChange={setValue} onAdd={addTask} />
        <TaskList
          list={list}
          hideCompleted={isChecked}
          onChange={onComplete}
          onDelete={openModal}
        />
      </div>
    </div>
  );
}

export default App;
