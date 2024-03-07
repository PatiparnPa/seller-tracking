// StatusSwitch.tsx
import React from "react";
interface StatusSwitchProps {
  initialStatus: string;
  onStatusChange: (newStatus: string) => void;
}

const StatusSwitch: React.FC<StatusSwitchProps> = ({ initialStatus, onStatusChange }) => {
  const toggleStatus = () => {
    const newStatus = initialStatus === "Open" ? "Closed" : "Open";
    onStatusChange(newStatus);
  };

  return (
    <div className="status-switch" onClick={toggleStatus}>
      <div className={`status-slider ${initialStatus}`}>
        <span className="status-text">{initialStatus}</span>
      </div>
      <span className="switch-label"></span>
    </div>
  );
};

export default StatusSwitch;