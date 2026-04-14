import { cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';

import { IdentityVerificationFlow } from './IdentityVerificationFlow';

const mockStream = {
  getTracks: () => [{ stop: vi.fn() }],
} as unknown as MediaStream;

function setupCameraMocks() {
  Object.defineProperty(navigator, 'mediaDevices', {
    value: { getUserMedia: vi.fn().mockResolvedValue(mockStream) },
    writable: true,
    configurable: true,
  });

  Object.defineProperty(navigator, 'permissions', {
    value: { query: vi.fn().mockResolvedValue({ state: 'granted' }) },
    writable: true,
    configurable: true,
  });

  HTMLCanvasElement.prototype.getContext = vi.fn().mockReturnValue({
    drawImage: vi.fn(),
  });

  HTMLCanvasElement.prototype.toDataURL = vi.fn().mockReturnValue('data:image/jpeg;base64,mock');

  vi.spyOn(HTMLVideoElement.prototype, 'readyState', 'get').mockReturnValue(4);
  vi.spyOn(HTMLVideoElement.prototype, 'videoWidth', 'get').mockReturnValue(640);
  vi.spyOn(HTMLVideoElement.prototype, 'videoHeight', 'get').mockReturnValue(480);
}

afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
});

describe('IdentityVerificationFlow', () => {
  it('calls onComplete with verified result on full flow', async () => {
    setupCameraMocks();
    vi.spyOn(Math, 'random').mockReturnValue(0.5);

    const onComplete = vi.fn();
    render(<IdentityVerificationFlow onComplete={onComplete} />);

    await waitFor(() => {
      expect(screen.getByLabelText('Capture photo')).toBeDefined();
    });

    fireEvent.click(screen.getByLabelText('Capture photo'));
    fireEvent.click(screen.getByText('Confirm'));

    await waitFor(() => {
      expect(screen.getByLabelText('Phone number')).toBeDefined();
    });

    fireEvent.change(screen.getByLabelText('Phone number'), {
      target: { value: '2125551234' },
    });
    fireEvent.click(screen.getByText('Continue'));

    await waitFor(() => {
      expect(screen.getByLabelText('Street Address')).toBeDefined();
    });

    fireEvent.change(screen.getByLabelText('Street Address'), {
      target: { value: '123 Main St' },
    });
    fireEvent.change(screen.getByLabelText('City'), {
      target: { value: 'San Francisco' },
    });
    fireEvent.change(screen.getByLabelText(/State/), {
      target: { value: 'California' },
    });
    fireEvent.change(screen.getByLabelText('Country'), {
      target: { value: 'United States' },
    });
    fireEvent.change(screen.getByLabelText('Postal Code'), {
      target: { value: '94102' },
    });
    fireEvent.click(screen.getByText('Verify'));

    await waitFor(() => {
      expect(onComplete).toHaveBeenCalledWith(
        expect.objectContaining({
          status: 'verified',
          score: expect.any(Number),
          selfieUrl: 'data:image/jpeg;base64,mock',
          phone: expect.any(String),
          address: expect.objectContaining({
            street: '123 Main St',
            city: 'San Francisco',
          }),
        }),
      );
    });
  });

  it('calls onFail when score < 50', async () => {
    setupCameraMocks();
    vi.spyOn(Math, 'random').mockReturnValue(0.1);

    const onFail = vi.fn();
    render(<IdentityVerificationFlow onFail={onFail} />);

    await waitFor(() => {
      expect(screen.getByLabelText('Capture photo')).toBeDefined();
    });

    fireEvent.click(screen.getByLabelText('Capture photo'));
    fireEvent.click(screen.getByText('Confirm'));

    await waitFor(() => {
      expect(screen.getByLabelText('Phone number')).toBeDefined();
    });

    fireEvent.change(screen.getByLabelText('Phone number'), {
      target: { value: '2125551234' },
    });
    fireEvent.click(screen.getByText('Continue'));

    await waitFor(() => {
      expect(screen.getByLabelText('Street Address')).toBeDefined();
    });

    fireEvent.change(screen.getByLabelText('Street Address'), {
      target: { value: '123 Main St' },
    });
    fireEvent.change(screen.getByLabelText('City'), {
      target: { value: 'San Francisco' },
    });
    fireEvent.change(screen.getByLabelText(/State/), {
      target: { value: 'California' },
    });
    fireEvent.change(screen.getByLabelText('Country'), {
      target: { value: 'United States' },
    });
    fireEvent.change(screen.getByLabelText('Postal Code'), {
      target: { value: '94102' },
    });
    fireEvent.click(screen.getByText('Verify'));

    await waitFor(() => {
      expect(onFail).toHaveBeenCalledWith(
        expect.objectContaining({
          status: 'failed',
        }),
      );
    });
  });
});
