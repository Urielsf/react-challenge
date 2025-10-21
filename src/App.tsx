import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ProductsPage } from "./Pages/ProductsPage/ProductsPage";
import { CartPage } from "./Pages/CartPage/CartPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ProductsPage />} />
        <Route path="/cart" element={<CartPage />} />
      </Routes>
    </BrowserRouter>
  );
}
