import { useContext, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import MessageContext from '../../store/MessageContext';
import classes from './MessageModal.module.css';
import ProgressBar from '../ProgressBar';

const TIMER = 3000;

export default function MessageModal() {
  const dialog = useRef();
  const messageCtx = useContext(MessageContext);
  
  useEffect(() => {
    const modal = dialog.current;
    if (messageCtx.message !== '') {
      modal.showModal();
    } else {
      modal.close();
    }
    return () => {
      modal.close();
    };
  }, [messageCtx.message]);

  useEffect(() => {
    if (messageCtx.message !== '') {
      const timer = setTimeout(() => {
        messageCtx.hideMessage();
        messageCtx.confirmCallback(false);
      }, TIMER);
      return () => {
        clearTimeout(timer);
      };
    }
  }, [messageCtx, messageCtx.message]);

  const handleConfirm = () => {
    if (messageCtx.confirmCallback) {
      messageCtx.confirmCallback(true);
    }
  };

  const handleCancel = () => {
    messageCtx.hideMessage();
    if (messageCtx.confirmCallback) {
      messageCtx.confirmCallback(false);
    }
  };

  let modalContent = null;
  switch (messageCtx.mode) {
    case 'info':
      modalContent = (
        <div className={classes.content}>
          {messageCtx.message}
          <div className={classes.actions}>
            <button className={classes.okButton} onClick={handleCancel}>Ok</button>
          </div>
        </div>
      );
      break;
      case 'error':
        modalContent = (
          <div className={classes.content} style={{backgroundColor:"rgb(219, 76, 76)"}}>
            {messageCtx.message}
            <div className={classes.actions}>
              <button className={classes.okButton} onClick={handleCancel}>Ok</button>
            </div>
          </div>
        );
        break;
    case 'confirmation':
      modalContent = (
        <div className={classes.content}>
          {messageCtx.message}
          <div className={classes.actions}>
            <button className={classes.confirmButton} onClick={handleConfirm}>Confirm</button>
            <button className={classes.cancelButton} onClick={handleCancel}>Cancel</button>
          </div>
        </div>
      );
      break;
    default:
      modalContent = (
        <div className={classes.content}>
          {messageCtx.message}
          <div className={classes.actions}>
            <button className={classes.cancelButton} onClick={handleCancel}>Cancel</button>
          </div>
        </div>
      );
  }

  return createPortal(
    <dialog ref={dialog} className="modal-dialog">
      {modalContent}
        <ProgressBar key={messageCtx.message} timer={TIMER} className={classes.progress} />
    </dialog>,
    document.getElementById('message-modal')
  );
}