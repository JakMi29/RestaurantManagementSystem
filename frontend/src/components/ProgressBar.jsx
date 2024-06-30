import { useState, useEffect } from 'react';

export default function ProgressBar({ timer }) {
  const [remainingTime, setRemainingTime] = useState(timer);

  useEffect(() => {
    const interval = setInterval(() => {
      setRemainingTime((prevTime) => {
        if (prevTime <= 0) {
          clearInterval(interval);
          return 0;
        }
        return prevTime - 10;
      });
    }, 10);

    return () => {
      clearInterval(interval);
    };
  }, [remainingTime, timer]);

  return <progress value={remainingTime} max={timer} className='progress'/>;
}