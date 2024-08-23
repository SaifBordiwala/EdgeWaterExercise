import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import {
  subscribeToProduct,
  unsubscribeFromProduct,
} from "../store/websocketSlice";

const products = ["BTC-USD", "ETH-USD", "XRP-USD", "LTC-USD"];

const SubscribeUnsubscribe: React.FC = () => {
  const dispatch = useDispatch();
  const subscribedProducts = useSelector(
    (state: RootState) => state.websocket.subscribedProducts
  );

  const handleSubscribe = (product: string) => {
    dispatch(subscribeToProduct(product)); // This should work
  };

  const handleUnsubscribe = (product: string) => {
    dispatch(unsubscribeFromProduct(product)); // This should work too
  };

  return (
    <div>
      <h2>Subscribe/Unsubscribe</h2>
      {products.map((product) => (
        <div key={product}>
          <button
            onClick={() => handleSubscribe(product)}
            disabled={subscribedProducts.includes(product)}
          >
            Subscribe to {product}
          </button>
          <button
            onClick={() => handleUnsubscribe(product)}
            disabled={!subscribedProducts.includes(product)}
          >
            Unsubscribe from {product}
          </button>
          <span>
            Status:{" "}
            {subscribedProducts.includes(product)
              ? "Subscribed"
              : "Unsubscribed"}
          </span>
        </div>
      ))}
    </div>
  );
};

export default SubscribeUnsubscribe;
