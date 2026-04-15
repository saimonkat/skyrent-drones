import { ErrorBoundary } from '@demo/components/ErrorBoundary/ErrorBoundary';
import { Layout } from '@demo/components/layout/Layout';
import { VerificationGuard } from '@demo/components/verification/VerificationGuard/VerificationGuard';
import { CatalogPage } from '@demo/pages/CatalogPage';
import { CheckoutPage } from '@demo/pages/CheckoutPage';
import { NotFoundPage } from '@demo/pages/NotFoundPage';
import { Route, Routes } from 'react-router-dom';

export function App() {
  return (
    <ErrorBoundary>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<CatalogPage />} />
          <Route
            path="/checkout"
            element={
              <VerificationGuard>
                <CheckoutPage />
              </VerificationGuard>
            }
          />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </ErrorBoundary>
  );
}
