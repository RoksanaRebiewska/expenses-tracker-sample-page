import classes from './Modal.module.scss';

const Modal = ({ onConfirm, onClose }) => {
  return (
    <>
      <div className={classes.backdrop} onClick={onClose}></div>
      <div className={classes.modal}>
        <p>Are you sure you want to delete?</p>
        <button onClick={onConfirm}>Delete</button>
        <button onClick={onClose}>Close</button>
      </div>
    </>
  );
};

export default Modal;
