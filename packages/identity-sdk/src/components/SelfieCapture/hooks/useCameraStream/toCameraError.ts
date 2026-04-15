import { ERROR_MESSAGES } from '../../constants';
import type { CameraError } from './types';

export function toCameraError(err: unknown): CameraError {
  if (err instanceof DOMException && err.name in ERROR_MESSAGES) {
    return { type: err.name as CameraError['type'], message: err.message };
  }
  return { type: 'UnknownError', message: String(err) };
}
