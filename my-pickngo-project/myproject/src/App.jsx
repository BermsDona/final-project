import { Routes, Route, BrowserRouter } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import UserDashboard from "./components/UserDashboard";
import Branches from "./components/Branches";
import ProductList from "./components/ProductList";
import Cart from "./components/Cart";
import PurchaseHistory from "./components/PurchaseHistory";
import AdminDashboard from "./components/AdminDashboard";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route index element={<Login />} />
          <Route path="/reg" element={<Register />} />
          <Route path="/dashboard" element={<UserDashboard />} />
          <Route path="/branches" element={<Branches />} />
          <Route path="/products" element={<ProductList />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/history" element={<PurchaseHistory />} />
          <Route path="/admin" element={<AdminDashboard />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
