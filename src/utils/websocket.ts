import { store } from "../store";
import {
  addMatch,
  setSystemStatus,
  updateLevel2Data,
} from "../store/websocketSlice";
import { Level2Update, Match } from "../types/websocket";

let websocket: WebSocket | null = null;
const maxRetries = 5;
let retryCount = 0;

const connectWebSocket = () => {
  if (websocket) {
    websocket.close(); // Close any existing connection
  }

  websocket = new WebSocket("wss://ws-feed.prime.coinbase.com"); // Updated WebSocket URL

  websocket.onopen = () => {
    store.dispatch(setSystemStatus("connected"));
    console.log("WebSocket connection established");

    retryCount = 0; // Reset retry count on successful connection
  };

  websocket.onmessage = (event) => {
    const data = JSON.parse(event.data);
    console.log("WebSocket message received:", data);

    switch (data.type) {
      case "l2update": {
        const level2Update: Level2Update = data;
        const { product_id, changes } = level2Update;

        const bids = changes.filter(([side]) => side === "buy");
        const asks = changes.filter(([side]) => side === "sell");

        store.dispatch(updateLevel2Data({ product: product_id, bids, asks }));
        break;
      }
      case "match": {
        const match: Match = data;
        store.dispatch(
          addMatch({
            timestamp: match.time,
            product: match.product_id,
            size: match.size,
            price: match.price,
            side: match.side,
          })
        );
        break;
      }
      case "subscriptions": {
        // Handle subscription confirmation if necessary
        console.log("Subscription confirmed:", data);
        break;
      }
      // Handle any other message types as needed
      default:
        console.warn("Unhandled WebSocket message type:", data.type);
    }
  };

  websocket.onclose = (event) => {
    store.dispatch(setSystemStatus("disconnected"));
    console.log("WebSocket connection closed:", event.code, event.reason);

    if (retryCount < maxRetries) {
      retryCount++;
      console.log(
        `Retrying WebSocket connection (${retryCount}/${maxRetries})`
      );
      setTimeout(connectWebSocket, 1000 * retryCount); // Exponential backoff
    } else {
      console.error("Max retries reached. Could not reconnect to WebSocket.");
    }
  };

  websocket.onerror = (event: Event) => {
    console.error("WebSocket error:", event);
    if (event instanceof ErrorEvent) {
      console.error("Error message:", event.message);
    }
    store.dispatch(setSystemStatus("disconnected"));
  };
};

export default connectWebSocket;
