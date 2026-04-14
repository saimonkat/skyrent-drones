import { CartSummary } from '@demo/components/cart/CartSummary/CartSummary';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import type { CartDrawerProps } from './types';

export function CartDrawer({ open, onClose }: CartDrawerProps) {
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

  return createPortal(
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-100 flex justify-end">
          <motion.div
            className="absolute inset-0 bg-black/30"
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
            aria-label="Close cart"
          />
          <motion.div
            className="relative w-full max-w-xl overflow-y-auto bg-gray-50 p-6 shadow-xl"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          >
            <CartSummary onClose={onClose} />
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body,
  );
}
