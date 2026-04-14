import { cn } from '@demo/lib/cn';
import { VARIANT_STYLES } from './constants';
import type { ButtonProps } from './types';

export function Button({
  variant = 'primary',
  fullWidth = false,
  className,
  ...rest
}: ButtonProps) {
  return (
    <button
      type="button"
      {...rest}
      className={cn(VARIANT_STYLES[variant], fullWidth && 'w-full', className)}
    />
  );
}
