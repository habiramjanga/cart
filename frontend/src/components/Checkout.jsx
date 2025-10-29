import React, { useState } from 'react';
import axios from 'axios';

const BASE_URL = "http://127.0.0.1:8000/api";

function Checkout() {
  const [receipt, setReceipt] = useState(null);

  const handleCheckout = async () => {
    const res = await axios.post(`${BASE_URL}/checkout/`, {});
    setReceipt(res.data);
  };

  return (
    <div>
      <h2>Checkout</h2>
      <button onClick={handleCheckout}>Complete Order</button>
      {receipt && (
        <div style={{ marginTop: "1rem", border: "1px solid #ccc", padding: "1rem" }}>
          <h4>🧾 Receipt</h4>
          <p>Total: ₹{receipt.total}</p>
          <p>Time: {receipt.timestamp}</p>
          <p>{receipt.message}</p>
        </div>
      )}
    </div>
  );
}

export default Checkout;
