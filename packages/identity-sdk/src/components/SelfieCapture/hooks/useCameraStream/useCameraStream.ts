import { useCallback, useEffect, useRef, useState } from 'react';

import { queryPermission } from './queryPermission';
import { toCameraError } from './toCameraError';
import type { CameraError, CameraStatus, UseCameraStreamReturn } from './types';

export function useCameraStream(): UseCameraStreamReturn {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [status, setStatus] = useState<CameraStatus>('idle');
  const [error, setError] = useState<CameraError | null>(null);

  const stop = useCallback(() => {
    if (stream) {
      for (const track of stream.getTracks()) {
        track.stop();
      }
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
    setStream(null);
  }, [stream]);

  const start = useCallback(async () => {
    setError(null);
    setStatus('idle');

    if (!navigator.mediaDevices?.getUserMedia) {
      setStatus('error');
      setError({
        type: 'InsecureContextError',
        message: 'Camera requires a secure connection (HTTPS).',
      });
      return;
    }

    const permission = await queryPermission();

    if (permission === 'denied') {
      setStatus('denied');
      setError({ type: 'NotAllowedError', message: 'Camera access denied.' });
      return;
    }

    if (permission === 'prompt') {
      setStatus('requesting');
    }

    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'user' },
      });
      setStream(mediaStream);

      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }

      setStatus('active');
    } catch (err) {
      const cameraError = toCameraError(err);
      setError(cameraError);
      setStatus(cameraError.type === 'NotAllowedError' ? 'denied' : 'error');
    }
  }, []);

  const capture = useCallback((): string | null => {
    const video = videoRef.current;
    if (!video || video.readyState < 2) {
      return null;
    }

    const canvas = document.createElement('canvas');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    const ctx = canvas.getContext('2d');
    if (!ctx) {
      return null;
    }

    ctx.drawImage(video, 0, 0);
    setStatus('captured');
    return canvas.toDataURL('image/jpeg', 0.8);
  }, []);

  useEffect(() => {
    if (videoRef.current && stream) {
      videoRef.current.srcObject = stream;
    }

    return () => {
      if (stream) {
        for (const track of stream.getTracks()) {
          track.stop();
        }
      }
    };
  }, [stream]);

  useEffect(() => {
    const handleVisibility = () => {
      if (document.hidden) {
        stop();
      } else {
        start();
      }
    };

    document.addEventListener('visibilitychange', handleVisibility);
    return () => document.removeEventListener('visibilitychange', handleVisibility);
  }, [stop, start]);

  return { videoRef, stream, error, status, start, stop, capture };
}
