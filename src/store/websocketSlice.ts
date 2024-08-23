import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface WebSocketState {
  subscribedProducts: string[];
  level2Data: Record<string, any>; // Adjust this type as needed
  matchData: any[]; // Adjust this type as needed
  systemStatus: string;
}

const initialState: WebSocketState = {
  subscribedProducts: [],
  level2Data: {},
  matchData: [],
  systemStatus: "disconnected",
};

const websocketSlice = createSlice({
  name: "websocket",
  initialState,
  reducers: {
    subscribeToProduct(state, action: PayloadAction<string>) {
      if (!state.subscribedProducts.includes(action.payload)) {
        state.subscribedProducts.push(action.payload);
      }
    },
    unsubscribeFromProduct(state, action: PayloadAction<string>) {
      state.subscribedProducts = state.subscribedProducts.filter(
        (product) => product !== action.payload
      );
    },
    updateLevel2Data(
      state,
      action: PayloadAction<{ product: string; bids: any; asks: any }>
    ) {
      state.level2Data[action.payload.product] = {
        bids: action.payload.bids,
        asks: action.payload.asks,
      };
    },
    addMatch(
      state,
      action: PayloadAction<{
        timestamp: string;
        product: string;
        size: string;
        price: string;
        side: string;
      }>
    ) {
      state.matchData.push(action.payload);
    },
    setSystemStatus(state, action: PayloadAction<string>) {
      state.systemStatus = action.payload;
    },
  },
});

export const {
  subscribeToProduct,
  unsubscribeFromProduct,
  updateLevel2Data,
  addMatch,
  setSystemStatus,
} = websocketSlice.actions;
export default websocketSlice.reducer;
