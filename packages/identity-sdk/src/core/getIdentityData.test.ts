import { afterEach, describe, expect, it, vi } from 'vitest';

import type { IdentityData } from '@sdk/types';
import { getIdentityData } from './getIdentityData';

const mockData: IdentityData = {
  selfieUrl: 'data:image/jpeg;base64,mockSelfie',
  phone: '+14155552671',
  address: {
    street: '123 Main Street',
    city: 'San Francisco',
    state: 'California',
    country: 'United States',
    postalCode: '94102',
  },
};

afterEach(() => {
  vi.restoreAllMocks();
});

describe('getIdentityData', () => {
  it('returns IdentityVerificationResult with all fields', () => {
    const result = getIdentityData(mockData);

    expect(result).toHaveProperty('selfieUrl');
    expect(result).toHaveProperty('phone');
    expect(result).toHaveProperty('address');
    expect(result).toHaveProperty('score');
    expect(result).toHaveProperty('status');
  });

  it('passes through input data unchanged', () => {
    const result = getIdentityData(mockData);

    expect(result.selfieUrl).toBe(mockData.selfieUrl);
    expect(result.phone).toBe(mockData.phone);
    expect(result.address).toEqual(mockData.address);
  });

  it('returns "failed" status when score < 50', () => {
    vi.spyOn(Math, 'random').mockReturnValueOnce(0.1).mockReturnValueOnce(0.5);

    const result = getIdentityData(mockData);

    expect(result.status).toBe('failed');
  });

  it('returns "verified" status when score >= 50', () => {
    vi.spyOn(Math, 'random').mockReturnValueOnce(0.5).mockReturnValueOnce(0.5);

    const result = getIdentityData(mockData);

    expect(result.status).toBe('verified');
  });
});
