export interface SelfieCaptureResult {
  selfieUrl: string;
}

export interface SelfieCaptureProps {
  onCapture?: (result: SelfieCaptureResult) => void;
  className?: string;
  width?: number;
  height?: number;
}
