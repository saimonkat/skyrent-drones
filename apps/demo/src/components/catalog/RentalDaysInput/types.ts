export interface RentalDaysInputProps {
  value: number;
  onChange: (days: number) => void;
  min?: number;
  max?: number;
}
