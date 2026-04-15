import { IdentityVerificationFlow } from '@skyrent/identity-sdk';
import type { IdentityVerificationResult } from '@skyrent/identity-sdk';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect } from 'react';
import { createPortal } from 'react-dom';

import { useVerificationStore } from '@demo/stores/verificationStore';
import type { VerificationModalProps } from './types';

export function VerificationModal({ open, onClose }: VerificationModalProps) {
  useEffect(() => {
    if (!open) {
      return;
    }
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [open, onClose]);

  const setResult = useVerificationStore((state) => state.setResult);

  const handleComplete = (result: IdentityVerificationResult) => {
    setResult(result);
    onClose();
  };

  const handleFail = (result: IdentityVerificationResult) => {
    setResult(result);
    onClose();
  };

  return createPortal(
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-100 flex items-center justify-center">
          <motion.div
            className="absolute inset-0 bg-black/40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            onKeyDown={(event) => {
              if (event.key === 'Enter' || event.key === ' ') {
                onClose();
              }
            }}
            role="button"
            tabIndex={-1}
            aria-label="Close verification"
          />
          <motion.div
            className="relative z-10 w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-2xl bg-white p-6 shadow-2xl mx-4"
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          >
            <button
              type="button"
              onClick={onClose}
              className="absolute right-4 top-4 z-10 text-gray-400 transition-colors hover:text-gray-600"
              aria-label="Close"
            >
              ✕
            </button>
            <IdentityVerificationFlow onComplete={handleComplete} onFail={handleFail} />
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body,
  );
}
