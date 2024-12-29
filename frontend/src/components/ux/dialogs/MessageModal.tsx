import { useContext, useEffect, useState } from 'react';
import classes from '../Ui.module.css'
import MessageContext from '../../../store/MessageContext';
import { Dialog } from '@mui/material';
import { MessageMode } from '../../../constants/MessageMode';
import { ProgressBar } from '../ProgressBar';

const TIMER: number = 3000;

export default function MessageModal() {
  const messageCtx = useContext(MessageContext);

  useEffect(() => {
    if (messageCtx.message !== undefined) {
      const timer = setTimeout(() => {
        messageCtx.hideMessage();
        if (messageCtx.confirmCallback) {
          messageCtx.confirmCallback(false);
        }
      }, TIMER);
      return () => {
        clearTimeout(timer);
      };
    }
  }, [messageCtx.message, messageCtx.confirmCallback]);

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
    case MessageMode.INFO:
      modalContent = (
        <div className={classes.content}>
          {messageCtx.message}
          <div className={classes.actions}>
            <button className={classes.blueButton} onClick={handleCancel}>Ok</button>
          </div>
        </div>
      );
      break;
    case MessageMode.ERROR:
      modalContent = (
        <div className={classes.content} style={{ backgroundColor: "rgb(219, 76, 76)" }}>
          {messageCtx.message}
          <div className={classes.actions}>
            <button className={classes.blueButton} onClick={handleCancel}>Ok</button>
          </div>
        </div>
      );
      break;
    case MessageMode.CONFIRM:
      modalContent = (
        <>
        <div className={classes.content}>
          {messageCtx.message}
        </div>
          <div className={classes.actions}>
            <button className={classes.greenButton} onClick={handleConfirm}>Confirm</button>
            <button className={classes.redButton} onClick={handleCancel}>Cancel</button>
          </div>
        </>
      );
      break;
    default:
      modalContent = (
        <></>
      );
  }

  return (
    <Dialog maxWidth={"sm"} open={messageCtx.message!==undefined}>
      {modalContent}
      <ProgressBar timer={TIMER} />
    </Dialog>
  );
}