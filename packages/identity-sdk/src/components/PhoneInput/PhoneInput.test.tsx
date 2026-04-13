import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';

import { PhoneInput } from './PhoneInput';

afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
});

describe('PhoneInput', () => {
  it('renders country select and phone input', () => {
    render(<PhoneInput />);

    expect(screen.getByLabelText(/country code/i)).toBeDefined();
    expect(screen.getByLabelText(/phone number/i)).toBeDefined();
    expect(screen.getByRole('button', { name: /continue/i })).toBeDefined();
  });

  it('calls onSubmit with E.164 format for valid US number', () => {
    const onSubmit = vi.fn();
    render(<PhoneInput onSubmit={onSubmit} defaultCountry="US" />);

    fireEvent.change(screen.getByLabelText(/phone number/i), {
      target: { value: '2025551234' },
    });

    fireEvent.click(screen.getByRole('button', { name: /continue/i }));

    expect(onSubmit).toHaveBeenCalledWith({ phone: '+12025551234' });
  });

  it('shows error for invalid number on submit', () => {
    const onSubmit = vi.fn();
    render(<PhoneInput onSubmit={onSubmit} defaultCountry="US" />);

    fireEvent.change(screen.getByLabelText(/phone number/i), {
      target: { value: '123' },
    });

    fireEvent.click(screen.getByRole('button', { name: /continue/i }));

    expect(screen.getByText(/invalid phone number/i)).toBeDefined();
    expect(onSubmit).not.toHaveBeenCalled();
  });

  it('shows error for empty number on submit', () => {
    const onSubmit = vi.fn();
    render(<PhoneInput onSubmit={onSubmit} defaultCountry="US" />);

    fireEvent.click(screen.getByRole('button', { name: /continue/i }));

    expect(screen.getByText(/phone number is required/i)).toBeDefined();
    expect(onSubmit).not.toHaveBeenCalled();
  });

  it('clears error when user types after failed submit', () => {
    render(<PhoneInput defaultCountry="US" />);

    fireEvent.click(screen.getByRole('button', { name: /continue/i }));

    expect(screen.getByText(/phone number is required/i)).toBeDefined();

    fireEvent.change(screen.getByLabelText(/phone number/i), {
      target: { value: '2' },
    });

    expect(screen.queryByText(/phone number is required/i)).toBeNull();
  });

  it('parses pasted international number with country code', () => {
    const onSubmit = vi.fn();
    render(<PhoneInput onSubmit={onSubmit} defaultCountry="US" />);

    const input = screen.getByLabelText(/phone number/i);

    fireEvent.paste(input, {
      clipboardData: { getData: () => '+7 993 925-50-10' },
    });

    fireEvent.click(screen.getByRole('button', { name: /continue/i }));

    expect(onSubmit).toHaveBeenCalledWith({ phone: '+79939255010' });
  });

  it('strips formatting from pasted number without +', () => {
    render(<PhoneInput defaultCountry="US" />);

    const input = screen.getByLabelText(/phone number/i);

    fireEvent.paste(input, {
      clipboardData: { getData: () => '(202) 555-1234' },
    });

    expect((input as HTMLInputElement).value).toBe('2025551234');
  });

  it('strips leading zeros from pasted number', () => {
    render(<PhoneInput defaultCountry="NL" />);

    const input = screen.getByLabelText(/phone number/i);

    fireEvent.paste(input, {
      clipboardData: { getData: () => '0 65 818 34 87' },
    });

    expect((input as HTMLInputElement).value).toBe('658183487');
  });
});
