import React, { useState, useEffect } from 'react';
import axios from 'axios';

const BASE_URL = "http://localhost:5000/api";

function Checkout() {
  const [cartItems, setCartItems] = useState([]);
  const [receipt, setReceipt] = useState(null);

  // 🟢 Fetch cart before checkout
  const fetchCart = async () => {
    const res = await axios.get(`${BASE_URL}/cart`);
    setCartItems(res.data.items || []);
  };

  useEffect(() => {
    fetchCart();
  }, []);

  // 🟢 Send cartItems to backend
  const handleCheckout = async () => {
    if (cartItems.length === 0) {
      alert("Your cart is empty!");
      return;
    }

    const res = await axios.post(`${BASE_URL}/cart/checkout`, { cartItems });
    setReceipt(res.data);
    fetchCart(); // clear frontend cart after checkout
  };

  return (
    <div style={{ padding: "1rem" }}>
      <h2>Checkout</h2>
      <button
        onClick={handleCheckout}
        style={{
          backgroundColor: "#007bff",
          color: "#fff",
          border: "none",
          padding: "10px 20px",
          borderRadius: "8px",
          cursor: "pointer"
        }}
      >
        Complete Order
      </button>

      {receipt && (
        <div style={{ marginTop: "1rem", border: "1px solid #ccc", padding: "1rem", borderRadius: "8px" }}>
          <h4>🧾 Receipt</h4>
          <p><b>Total:</b> ₹{receipt.total}</p>
          <p><b>Time:</b> {new Date(receipt.timestamp).toLocaleString()}</p>
          <p style={{ color: "green" }}>{receipt.message}</p>
        </div>
      )}
    </div>
  );
}

export default Checkout;
