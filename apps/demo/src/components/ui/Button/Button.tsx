import { cn } from '@demo/lib/cn';
import { SIZE_STYLES, VARIANT_STYLES } from './constants';
import type { ButtonProps } from './types';

export function Button({
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  className,
  ...rest
}: ButtonProps) {
  return (
    <button
      type="button"
      {...rest}
      className={cn(
        VARIANT_STYLES[variant],
        SIZE_STYLES[size],
        fullWidth && 'w-full',
        className,
      )}
    />
  );
}
