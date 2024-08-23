import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store";

const PriceView: React.FC = () => {
  const level2Data = useSelector(
    (state: RootState) => state.websocket.level2Data
  );

  return (
    <div>
      <h2>Price View</h2>
      {Object.keys(level2Data).map((product) => (
        <div key={product}>
          <h3>{product}</h3>
          <div>Bids: {JSON.stringify(level2Data[product].bids)}</div>
          <div>Asks: {JSON.stringify(level2Data[product].asks)}</div>
        </div>
      ))}
    </div>
  );
};

export default PriceView;
