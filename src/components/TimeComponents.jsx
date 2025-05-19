import { useState, useEffect } from 'react';
import { Alert } from 'react-bootstrap';

const TimeDisplay = ({ lastAdded }) => {
  const [elapsedTime, setElapsedTime] = useState("");

  useEffect(() => {
    if (!lastAdded) return;

    const calculateElapsed = () => {
      const secondsPassed = Math.floor((Date.now() - lastAdded.getTime()) / 1000);

      if (secondsPassed < 60) {
        setElapsedTime(`${secondsPassed} detik lalu`);
      } else if (secondsPassed < 3600) {
        const mins = Math.floor(secondsPassed / 60);
        setElapsedTime(`${mins} menit lalu`);
      } else {
        const hrs = Math.floor(secondsPassed / 3600);
        setElapsedTime(`${hrs} jam lalu`);
      }
    };

    calculateElapsed();
    const timer = setInterval(calculateElapsed, 1000);

    return () => clearInterval(timer);
  }, [lastAdded]);

  if (!lastAdded) return null;

  return (
    <Alert variant="info" className="d-flex gap-2 align-items-center shadow-sm rounded small py-2 px-3">
      <i className="bi bi-hourglass-split text-black fs-5"></i>
      <span>
        Terakhir diperbarui: <strong>{elapsedTime}</strong>
      </span>
    </Alert>
  );
};

export default TimeDisplay;
