import clsx from 'clsx';

import CheckIcon from '@sdk/assets/check.svg?react';

import styles from './StepIndicator.module.css';
import type { StepIndicatorProps } from './types';

export function StepIndicator({ currentStep, labels }: StepIndicatorProps) {
  return (
    <nav className={styles.container} aria-label="Verification steps">
      {labels.map((label, index) => {
        const isCompleted = index < currentStep;
        const isActive = index === currentStep;

        return (
          <div key={label} className={styles.stepWrapper}>
            {index > 0 && (
              <div className={clsx(styles.line, index <= currentStep && styles.lineCompleted)} />
            )}
            <div className={styles.step} aria-current={isActive ? 'step' : undefined}>
              <div
                className={clsx(
                  styles.dot,
                  isCompleted && styles.dotCompleted,
                  isActive && styles.dotActive,
                )}
              >
                {isCompleted ? (
                  <CheckIcon className={styles.checkIcon} aria-hidden="true" />
                ) : (
                  <span className={styles.dotNumber}>{index + 1}</span>
                )}
              </div>
              <span
                className={clsx(
                  styles.label,
                  isCompleted && styles.labelCompleted,
                  isActive && styles.labelActive,
                )}
              >
                {label}
              </span>
            </div>
          </div>
        );
      })}
    </nav>
  );
}
