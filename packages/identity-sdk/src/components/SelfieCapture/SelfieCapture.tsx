import clsx from 'clsx';
import { useEffect, useState } from 'react';

import FaceMaskIcon from '@sdk/assets/face-mask.svg?react';
import SpinnerIcon from '@sdk/assets/spinner.svg?react';
import { Button } from '@sdk/components/ui/Button/Button';
import styles from './SelfieCapture.module.css';
import { ERROR_MESSAGES } from './constants';
import { useCameraStream } from './hooks/useCameraStream/useCameraStream';
import type { SelfieCaptureProps, SelfieCaptureResult } from './types';

export function SelfieCapture({
  onCapture,
  className,
  width = 400,
  height = 500,
}: SelfieCaptureProps) {
  const { videoRef, status, error, start, stop, capture } = useCameraStream();
  const [capturedImage, setCapturedImage] = useState<string | null>(null);

  useEffect(() => {
    start();
  }, [start]);

  const handleCapture = () => {
    const image = capture();
    if (image) {
      setCapturedImage(image);
      stop();
    }
  };

  const handleRetake = () => {
    setCapturedImage(null);
    start();
  };

  const handleConfirm = () => {
    if (!capturedImage) {
      return;
    }

    const result: SelfieCaptureResult = { selfieUrl: capturedImage };
    onCapture?.(result);
  };

  if (status === 'requesting') {
    return (
      <div className={clsx(styles.container, className)} style={{ width, height }}>
        <div className={styles.statusMessage}>
          <SpinnerIcon className={styles.spinner} />
          <p>Please allow camera access</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={clsx(styles.container, className)} style={{ width, height }}>
        <div className={clsx(styles.statusMessage, styles.error)}>
          <p>{ERROR_MESSAGES[error.type] ?? ERROR_MESSAGES.UnknownError}</p>
          {error.type !== 'InsecureContextError' && <Button onClick={start}>Try Again</Button>}
        </div>
      </div>
    );
  }

  if (capturedImage) {
    return (
      <div className={clsx(styles.container, className)} style={{ width, height }}>
        <img src={capturedImage} alt="Captured selfie" className={styles.preview} />
        <div className={styles.actions}>
          <Button variant="secondary" onClick={handleRetake}>
            Retake
          </Button>
          <Button onClick={handleConfirm}>Confirm</Button>
        </div>
      </div>
    );
  }

  return (
    <div className={clsx(styles.container, className)} style={{ width, height }}>
      <video ref={videoRef} autoPlay playsInline muted className={styles.video} />
      <div className={styles.maskOverlay}>
        <FaceMaskIcon className={styles.maskSvg} preserveAspectRatio="xMidYMid slice" />
        <p className={styles.maskHint}>Position your face within the frame</p>
      </div>
      <button
        type="button"
        className={styles.captureButton}
        onClick={handleCapture}
        aria-label="Capture photo"
      >
        <span className={styles.captureButtonInner} />
      </button>
    </div>
  );
}
