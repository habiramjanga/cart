import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import ProductList from './components/ProductList';
import Cart from './components/Cart';
import Checkout from './components/Checkout';

function App() {
  return (
    <Router>
      <div style={{ padding: "1rem" }}>
        <h1 style={{ textAlign: "center" }}>🛒 Vibe Commerce</h1>
        <nav style={{ display: "flex", gap: "1rem", justifyContent: "center", marginBottom: "1rem" }}>
          <Link to="/">Products</Link>
          <Link to="/cart">Cart</Link>
          <Link to="/checkout">Checkout</Link>
        </nav>

        <Routes>
          <Route path="/" element={<ProductList />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
