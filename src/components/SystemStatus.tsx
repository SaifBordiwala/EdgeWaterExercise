import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store";

const SystemStatus: React.FC = () => {
  const systemStatus = useSelector(
    (state: RootState) => state.websocket.systemStatus
  );

  return (
    <div>
      <h2>System Status</h2>
      <p>{systemStatus}</p>
    </div>
  );
};

export default SystemStatus;
