import clsx from 'clsx';
import { forwardRef } from 'react';

import styles from './Input.module.css';
import type { InputProps } from './types';

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ error, className, ...rest }, ref) => {
    return (
      <input ref={ref} className={clsx(styles.input, error && styles.error, className)} {...rest} />
    );
  },
);
