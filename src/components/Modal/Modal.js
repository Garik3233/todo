import "./Modal.css";

const Modal = ({ open, close, remove }) => {
  if (!open) return null;
  return (
    <div className="overlay">
      <div className="modal">
        <p>Are you sure you want to delete?</p>
        <div className="btns">
          <button onClick={remove}>Yes</button>
          <button onClick={close}>No</button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
