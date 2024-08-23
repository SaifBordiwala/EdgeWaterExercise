export interface Level2Update {
  type: string;
  product_id: string;
  changes: [string, string, string][]; // [side, price, size]
}

export interface Match {
  type: string;
  time: string;
  product_id: string;
  size: string;
  price: string;
  side: string; // "buy" or "sell"
}
