import { Button } from '@demo/components/ui/Button/Button';
import { useDroneAnimation } from '@demo/hooks/useDroneAnimation';
import Lottie from 'lottie-react';
import type { CompletionScreenProps } from './types';

export function CompletionScreen({ orderRef, onBackToCatalog }: CompletionScreenProps) {
  const animationData = useDroneAnimation();

  return (
    <div
      className="flex flex-col items-center justify-center py-10 md:py-16 text-center"
      data-qa="completion-screen"
    >
      <div className="size-60 md:size-100">
        {animationData && <Lottie animationData={animationData} loop className="size-full" />}
      </div>
      <h2 className="mt-4 text-3xl font-bold text-gray-900">Rental Confirmed!</h2>
      <p className="mt-2 text-lg text-gray-500">Your drones will be ready for pickup.</p>
      <p className="mt-4 text-sm text-gray-400">
        Order reference: <span className="font-mono font-medium text-gray-600">{orderRef}</span>
      </p>
      <div className="mt-6">
        <Button onClick={onBackToCatalog}>Back to Catalog</Button>
      </div>
    </div>
  );
}
