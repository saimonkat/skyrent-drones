import type { CameraError } from './hooks/useCameraStream/types';

export const ERROR_MESSAGES: Record<CameraError['type'], string> = {
  NotAllowedError: 'Camera access denied. Please allow camera access in your browser settings.',
  NotFoundError: 'No camera found on this device.',
  NotReadableError: 'Camera is in use by another application.',
  OverconstrainedError: 'Camera does not meet the required constraints.',
  InsecureContextError: 'Camera requires a secure connection (HTTPS).',
  UnknownError: 'An unexpected error occurred while accessing the camera.',
};
