import { cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { SelfieCapture } from './SelfieCapture';

const mockGetUserMedia = vi.fn();
const mockTrackStop = vi.fn();

function createMockStream(): MediaStream {
  return {
    getTracks: () => [{ stop: mockTrackStop }],
  } as unknown as MediaStream;
}

beforeEach(() => {
  mockGetUserMedia.mockReset();
  mockTrackStop.mockReset();

  Object.defineProperty(navigator, 'mediaDevices', {
    value: { getUserMedia: mockGetUserMedia },
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
});

afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
});

describe('SelfieCapture', () => {
  it('renders camera view when stream is granted', async () => {
    mockGetUserMedia.mockResolvedValue(createMockStream());

    render(<SelfieCapture />);

    await waitFor(() => {
      expect(screen.getByRole('button', { name: /capture photo/i })).toBeDefined();
    });
  });

  it('does not render camera view when stream is denied', async () => {
    mockGetUserMedia.mockRejectedValue(new DOMException('denied', 'NotAllowedError'));

    render(<SelfieCapture />);

    await waitFor(() => {
      expect(screen.getByText(/camera access denied/i)).toBeDefined();
    });

    expect(screen.queryByRole('button', { name: /capture photo/i })).toBeNull();
  });

  it('shows denied error for NotAllowedError', async () => {
    mockGetUserMedia.mockRejectedValue(new DOMException('denied', 'NotAllowedError'));

    render(<SelfieCapture />);

    await waitFor(() => {
      expect(screen.getByText(/camera access denied/i)).toBeDefined();
    });
  });

  it('shows not found error for NotFoundError', async () => {
    mockGetUserMedia.mockRejectedValue(new DOMException('not found', 'NotFoundError'));

    render(<SelfieCapture />);

    await waitFor(() => {
      expect(screen.getByText(/no camera found/i)).toBeDefined();
    });
  });

  it('shows Try Again button for NotAllowedError', async () => {
    mockGetUserMedia.mockRejectedValue(new DOMException('denied', 'NotAllowedError'));

    render(<SelfieCapture />);

    await waitFor(() => {
      expect(screen.getByRole('button', { name: /try again/i })).toBeDefined();
    });
  });

  it('hides Try Again button for InsecureContextError', async () => {
    Object.defineProperty(navigator, 'mediaDevices', {
      value: undefined,
      writable: true,
      configurable: true,
    });

    render(<SelfieCapture />);

    await waitFor(() => {
      expect(screen.getByText(/secure connection/i)).toBeDefined();
    });

    expect(screen.queryByRole('button', { name: /try again/i })).toBeNull();
  });

  it('switches to preview mode on capture', async () => {
    mockGetUserMedia.mockResolvedValue(createMockStream());

    render(<SelfieCapture />);

    await waitFor(() => {
      expect(screen.getByRole('button', { name: /capture photo/i })).toBeDefined();
    });

    fireEvent.click(screen.getByRole('button', { name: /capture photo/i }));

    expect(screen.getByRole('button', { name: /retake/i })).toBeDefined();
    expect(screen.getByRole('button', { name: /confirm/i })).toBeDefined();
  });

  it('returns to camera mode on retake', async () => {
    mockGetUserMedia.mockResolvedValue(createMockStream());

    render(<SelfieCapture />);

    await waitFor(() => {
      expect(screen.getByRole('button', { name: /capture photo/i })).toBeDefined();
    });

    fireEvent.click(screen.getByRole('button', { name: /capture photo/i }));
    fireEvent.click(screen.getByRole('button', { name: /retake/i }));

    await waitFor(() => {
      expect(screen.getByRole('button', { name: /capture photo/i })).toBeDefined();
    });
  });

  it('calls onCapture with base64 on confirm', async () => {
    mockGetUserMedia.mockResolvedValue(createMockStream());
    const onCapture = vi.fn();

    render(<SelfieCapture onCapture={onCapture} />);

    await waitFor(() => {
      expect(screen.getByRole('button', { name: /capture photo/i })).toBeDefined();
    });

    fireEvent.click(screen.getByRole('button', { name: /capture photo/i }));
    fireEvent.click(screen.getByRole('button', { name: /confirm/i }));

    expect(onCapture).toHaveBeenCalledWith({
      selfieUrl: 'data:image/jpeg;base64,mock',
    });
  });

  it('recovers to camera view after Try Again', async () => {
    mockGetUserMedia.mockRejectedValueOnce(new DOMException('denied', 'NotAllowedError'));

    render(<SelfieCapture />);

    await waitFor(() => {
      expect(screen.getByText(/camera access denied/i)).toBeDefined();
    });

    mockGetUserMedia.mockResolvedValueOnce(createMockStream());
    fireEvent.click(screen.getByRole('button', { name: /try again/i }));

    await waitFor(() => {
      expect(screen.getByRole('button', { name: /capture photo/i })).toBeDefined();
    });
  });

  it('stops stream tracks on unmount', async () => {
    mockGetUserMedia.mockResolvedValue(createMockStream());

    const { unmount } = render(<SelfieCapture />);

    await waitFor(() => {
      expect(screen.getByRole('button', { name: /capture photo/i })).toBeDefined();
    });

    unmount();

    expect(mockTrackStop).toHaveBeenCalled();
  });
});
