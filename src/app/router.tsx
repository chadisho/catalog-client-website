import { Routes, Route } from 'react-router-dom';
import HomePage from '../features/home/pages';
import CatalogPage from '../features/catalog/pages';
import ProductPage from '../features/product/pages';
import ShopPage from '../features/shop/pages';

export function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/catalog/chc-/" element={<CatalogPage />} />
      <Route path="/product/chp-/" element={<ProductPage />} />
      <Route path="/shop/" element={<ShopPage />} />
    </Routes>
  );
}