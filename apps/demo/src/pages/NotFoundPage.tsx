import { Button } from '@demo/components/ui/Button/Button';
import { useDroneAnimation } from '@demo/hooks/useDroneAnimation';
import Lottie from 'lottie-react';
import { useNavigate } from 'react-router-dom';

export function NotFoundPage() {
  const navigate = useNavigate();
  const animationData = useDroneAnimation();

  return (
    <div className="flex flex-col items-center justify-center py-10 md:py-16 text-center">
      <div className="size-60 md:size-100">
        {animationData && <Lottie animationData={animationData} loop className="size-full" />}
      </div>
      <h1 className="mt-4 text-6xl font-bold text-gray-900 md:text-8xl">404</h1>
      <p className="mt-2 text-lg text-gray-500">This drone flew away. Page not found.</p>
      <div className="mt-6">
        <Button onClick={() => navigate('/')}>Back to Catalog</Button>
      </div>
    </div>
  );
}
