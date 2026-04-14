export type CameraStatus = 'idle' | 'requesting' | 'active' | 'captured' | 'denied' | 'error';

export interface CameraError {
  type:
    | 'NotAllowedError'
    | 'NotFoundError'
    | 'NotReadableError'
    | 'OverconstrainedError'
    | 'InsecureContextError'
    | 'UnknownError';
  message: string;
}

export interface UseCameraStreamReturn {
  videoRef: React.RefObject<HTMLVideoElement | null>;
  stream: MediaStream | null;
  error: CameraError | null;
  status: CameraStatus;
  start: () => Promise<void>;
  stop: () => void;
  capture: () => string | null;
}
