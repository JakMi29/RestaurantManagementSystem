import { useState, useEffect } from 'react';
import classes from './Ui.module.css'

interface ProgressBarProps {
  timer: number;
}

export const ProgressBar = ({ timer }: ProgressBarProps) => {
  const [remainingTime, setRemainingTime] = useState<number>(timer);

  useEffect(() => {
    const interval = setInterval(() => {
      setRemainingTime((prevTime) => prevTime - 10);
    }, 10);

    return () => {
      clearInterval(interval);
    };
  }, [timer]);

  return <progress value={remainingTime} max={timer} className={classes.progress} />;
}