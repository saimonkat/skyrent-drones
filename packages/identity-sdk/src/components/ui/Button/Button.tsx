import clsx from 'clsx';

import styles from './Button.module.css';
import type { ButtonProps } from './types';

export function Button({ variant = 'primary', className, children, ...rest }: ButtonProps) {
  return (
    <button type="button" className={clsx(styles[variant], className)} {...rest}>
      {children}
    </button>
  );
}
