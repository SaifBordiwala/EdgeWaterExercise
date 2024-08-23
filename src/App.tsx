import React, { useEffect } from "react";
import { Provider } from "react-redux";
import { store } from "./store";
import SubscribeUnsubscribe from "./components/SubscribeUnsubscribe";
import PriceView from "./components/PriceView";
import MatchView from "./components/MatchView";
import SystemStatus from "./components/SystemStatus";
import connectWebSocket from "./utils/websocket";

const App: React.FC = () => {
  useEffect(() => {
    connectWebSocket();
  }, []);

  return (
    <Provider store={store}>
      <div>
        <h1>Coinbase WebSocket App</h1>
        <SubscribeUnsubscribe />
        <PriceView />
        <MatchView />
        <SystemStatus />
      </div>
    </Provider>
  );
};

export default App;
