import React from 'react';
import { Alert } from 'react-bootstrap';

const TimeDisplay = ({ lastAdded }) => {
  if (!lastAdded) {
    return (
      <Alert variant="info" className="text-center shadow-sm">
        <i className="bi bi-clock-history me-2"></i>
        Belum ada ide yang ditambahkan atau diperbarui.
      </Alert>
    );
  }

  const timeString = lastAdded.toLocaleTimeString('id-ID', {
    hour: '2-digit',
    minute: '2-digit',
  });
  const dateString = lastAdded.toLocaleDateString('id-ID', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <Alert variant="success" className="text-center shadow-sm">
      <i className="bi bi-check-circle-fill me-2"></i>
      Ide terakhir diperbarui pada: {dateString}, pukul {timeString}
    </Alert>
  );
};

export default TimeDisplay;