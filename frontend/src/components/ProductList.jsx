import React, { useEffect, useState } from "react";
import axios from "axios";

const BASE_URL = "http://localhost:5000/api";

function ProductList() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);

  // 🟢 Load products
  useEffect(() => {
    axios
      .get(`${BASE_URL}/products`)
      .then((res) => setProducts(res.data))
      .catch((err) => console.error(err));

    fetchCart();
  }, []);

  // 🟢 Fetch current cart from backend
  const fetchCart = async () => {
    const res = await axios.get(`${BASE_URL}/cart`);
    setCart(res.data.items || []);
  };

  // 🟢 Add item to cart (or increase qty)
  const addToCart = async (productId) => {
    await axios.post(`${BASE_URL}/cart`, { productId, qty: 1 });
    fetchCart();
  };

  // 🟢 Decrease qty (if qty=1 → remove item)
  const decreaseQty = async (productId) => {
    const item = cart.find((c) => c.productId._id === productId);
    if (item.qty === 1) {
      await axios.delete(`${BASE_URL}/cart/${item._id}`);
    } else {
      await axios.post(`${BASE_URL}/cart`, { productId, qty: -1 }); // reuse same route to decrement
    }
    fetchCart();
  };

  // 🟢 Find qty for a given product
  const getQty = (productId) => {
    const item = cart.find((c) => c.productId._id === productId);
    return item ? item.qty : 0;
  };

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
        gap: "1rem",
        padding: "1rem",
      }}
    >
      {products.map((p) => {
        const qty = getQty(p._id);
        return (
          <div
            key={p._id}
            style={{
              border: "1px solid #ccc",
              padding: "1rem",
              borderRadius: "10px",
              textAlign: "center",
              boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
            }}
          >
            <h3>{p.name}</h3>
            <p>Price: ₹{p.price}</p>

            {qty === 0 ? (
              <button
                onClick={() => addToCart(p._id)}
                style={{
                  padding: "6px 12px",
                  borderRadius: "8px",
                  backgroundColor: "#007bff",
                  color: "#fff",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                Add to Cart
              </button>
            ) : (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "10px",
                }}
              >
                <button
                  onClick={() => decreaseQty(p._id)}
                  style={{
                    width: "32px",
                    height: "32px",
                    borderRadius: "50%",
                    border: "none",
                    backgroundColor: "#f44336",
                    color: "white",
                    cursor: "pointer",
                  }}
                >
                  −
                </button>
                <span>{qty}</span>
                <button
                  onClick={() => addToCart(p._id)}
                  style={{
                    width: "32px",
                    height: "32px",
                    borderRadius: "50%",
                    border: "none",
                    backgroundColor: "#4caf50",
                    color: "white",
                    cursor: "pointer",
                  }}
                >
                  +
                </button>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

export default ProductList;
