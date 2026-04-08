import { Route, Routes } from 'react-router-dom';
import { Layout } from './components/layout/Layout';
import { CatalogPage } from './pages/CatalogPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { VerifyPage } from './pages/VerifyPage';

export function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<CatalogPage />} />
        <Route path="/verify" element={<VerifyPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
      </Route>
    </Routes>
  );
}
