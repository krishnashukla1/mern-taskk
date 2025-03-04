import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import Navbar from "./Navbar";
import Navbar from "./components/Navbar";
import ProductList from "./pages/ProductList";
import AddProduct from "./pages/AddProduct";
import EditProduct from "./pages/EditProduct";
import CategoriesPage from "./pages/CategoriesPage";
import BrandsPage from "./pages/BrandsPage";
// import Search from "./Search";

function App() {
  return (
    <div>
      <Navbar />
       {/* <Search/> */}
      <Routes>
        <Route path="/" element={<ProductList />} />
        <Route path="/add-product" element={<AddProduct />} />
        <Route path="/categories/:category" element={<CategoriesPage />} />
        <Route path="/edit-product/:id" element={<EditProduct />} />
        <Route path="/brands/:brand" element={<BrandsPage />} />
      </Routes>
      </div>
   
  );
}

export default App;


