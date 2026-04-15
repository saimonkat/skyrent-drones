import { CartSummary } from '@demo/components/cart/CartSummary/CartSummary';
import { useFocusTrap } from '@demo/hooks/useFocusTrap';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import type { CartDrawerProps } from './types';

function CartDrawerContent({ onClose }: { onClose: () => void }) {
  const trapRef = useFocusTrap<HTMLDivElement>();

  return (
    <motion.div
      ref={trapRef}
      className="relative w-full max-w-xl overflow-y-auto bg-gray-50 p-6 shadow-xl"
      initial={{ x: '100%' }}
      animate={{ x: 0 }}
      exit={{ x: '100%' }}
      transition={{ type: 'spring', damping: 25, stiffness: 300 }}
    >
      <CartSummary onClose={onClose} />
    </motion.div>
  );
}

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
        <div
          className="fixed inset-0 z-50 flex justify-end"
          /* biome-ignore lint/a11y/useSemanticElements: role dialog */
          role="dialog"
          aria-modal="true"
          aria-label="Shopping cart"
          data-qa="cart-drawer"
        >
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
          <CartDrawerContent onClose={onClose} />
        </div>
      )}
    </AnimatePresence>,
    document.body,
  );
}
