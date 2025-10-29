import React, { useEffect, useState } from 'react';
import axios from 'axios';

const BASE_URL = "http://localhost:5000/api";

function Cart() {
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);

  // 🟢 Fetch cart from backend
  const fetchCart = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/cart`);
      setCart(res.data.items || []);
      setTotal(res.data.total || 0);
    } catch (err) {
      console.error("Error fetching cart:", err);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  // 🟢 Remove item from cart
  const removeItem = async (id) => {
    try {
      await axios.delete(`${BASE_URL}/cart/${id}`);
      fetchCart();
    } catch (err) {
      console.error("Error removing item:", err);
    }
  };

  return (
    <div style={{ padding: "1rem" }}>
      <h2>Your Cart</h2>
      {cart.length === 0 ? (
        <p>🛒 Cart is empty</p>
      ) : (
        <>
          <ul>
            {cart.map(item => (
              <li key={item._id}>
                {item.productId.name} (x{item.qty})
                <button
                  onClick={() => removeItem(item._id)}
                  style={{
                    marginLeft: "10px",
                    backgroundColor: "#f44336",
                    color: "white",
                    border: "none",
                    padding: "5px 10px",
                    borderRadius: "5px",
                    cursor: "pointer"
                  }}
                >
                  ❌ Remove
                </button>
              </li>
            ))}
          </ul>
          <h3>Total: ₹{total}</h3>
        </>
      )}
    </div>
  );
}

export default Cart;
