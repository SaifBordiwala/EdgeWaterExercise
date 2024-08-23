import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store";

const MatchView: React.FC = () => {
  const matchData = useSelector(
    (state: RootState) => state.websocket.matchData
  );

  return (
    <div>
      <h2>Match View</h2>
      {matchData.map((match, index) => (
        <div key={index}>
          <span>{match.timestamp}</span> - <span>{match.product}</span> -{" "}
          <span style={{ color: match.side === "buy" ? "green" : "red" }}>
            {match.price}
          </span>{" "}
          - <span>{match.size}</span>
        </div>
      ))}
    </div>
  );
};

export default MatchView;
