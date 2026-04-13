import { cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';

import { AddressForm } from './AddressForm';

afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
});

describe('AddressForm', () => {
  it('renders all 5 fields and submit button', () => {
    render(<AddressForm />);

    expect(screen.getByLabelText(/street address/i)).toBeDefined();
    expect(screen.getByLabelText(/city/i)).toBeDefined();
    expect(screen.getByLabelText(/state/i)).toBeDefined();
    expect(screen.getByLabelText(/country/i)).toBeDefined();
    expect(screen.getByLabelText(/postal code/i)).toBeDefined();
    expect(screen.getByRole('button', { name: /continue/i })).toBeDefined();
  });

  it('shows validation errors on submit with empty fields', async () => {
    const onSubmit = vi.fn();
    render(<AddressForm onSubmit={onSubmit} />);

    fireEvent.click(screen.getByRole('button', { name: /continue/i }));

    await waitFor(() => {
      expect(screen.getByText(/street address is required/i)).toBeDefined();
    });

    expect(screen.getByText(/city is required/i)).toBeDefined();
    expect(screen.getByText(/state\/province is required/i)).toBeDefined();
    expect(screen.getByText(/country is required/i)).toBeDefined();
    expect(screen.getByText(/postal code is required/i)).toBeDefined();
    expect(onSubmit).not.toHaveBeenCalled();
  });

  it('calls onSubmit with address data when all fields are filled', async () => {
    const onSubmit = vi.fn();
    render(<AddressForm onSubmit={onSubmit} />);

    fireEvent.change(screen.getByLabelText(/street address/i), {
      target: { value: '123 Main Street' },
    });
    fireEvent.change(screen.getByLabelText(/city/i), {
      target: { value: 'San Francisco' },
    });
    fireEvent.change(screen.getByLabelText(/state/i), {
      target: { value: 'California' },
    });
    fireEvent.change(screen.getByLabelText(/country/i), {
      target: { value: 'United States' },
    });
    fireEvent.change(screen.getByLabelText(/postal code/i), {
      target: { value: '94102' },
    });

    fireEvent.click(screen.getByRole('button', { name: /continue/i }));

    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalledWith({
        address: {
          street: '123 Main Street',
          city: 'San Francisco',
          state: 'California',
          country: 'United States',
          postalCode: '94102',
        },
      });
    });
  });

  it('populates fields from defaultValues', () => {
    render(
      <AddressForm
        defaultValues={{
          street: '456 Oak Ave',
          city: 'Los Angeles',
          state: 'California',
          country: 'United States',
          postalCode: '90001',
        }}
      />,
    );

    expect((screen.getByLabelText(/street address/i) as HTMLInputElement).value).toBe(
      '456 Oak Ave',
    );
    expect((screen.getByLabelText(/city/i) as HTMLInputElement).value).toBe('Los Angeles');
    expect((screen.getByLabelText(/state/i) as HTMLInputElement).value).toBe('California');
    expect((screen.getByLabelText(/country/i) as HTMLInputElement).value).toBe('United States');
    expect((screen.getByLabelText(/postal code/i) as HTMLInputElement).value).toBe('90001');
  });
});
