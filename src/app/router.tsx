import { Routes, Route } from 'react-router-dom';
import HomePage from '../features/home/pages';
import CatalogPage from '../features/catalog/pages';
import ProductPage from '../features/product/pages';
import ShopPage from '../features/shop/pages';

export function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/catalog/:catalogCode/*" element={<CatalogPage />} />
      <Route path="/product/:productCode/*" element={<ProductPage />} />
      <Route path="/shop/:shopUsername" element={<ShopPage />} />
    </Routes>
  );
}