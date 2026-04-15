import { Layout } from '@demo/components/layout/Layout';
import { CatalogPage } from '@demo/pages/CatalogPage';
import { CheckoutPage } from '@demo/pages/CheckoutPage';
import { NotFoundPage } from '@demo/pages/NotFoundPage';
import { VerifyPage } from '@demo/pages/VerifyPage';
import { Route, Routes } from 'react-router-dom';

export function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<CatalogPage />} />
        <Route path="/verify" element={<VerifyPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}
