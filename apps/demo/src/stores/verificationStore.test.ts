import type { IdentityVerificationResult } from '@skyrent/identity-sdk';
import { beforeEach, describe, expect, it } from 'vitest';
import { selectIsVerified, useVerificationStore } from './verificationStore';

const verifiedResult: IdentityVerificationResult = {
  selfieUrl: 'data:image/jpeg;base64,test',
  phone: '+14155552671',
  address: {
    street: '123 Main St',
    city: 'San Francisco',
    state: 'California',
    country: 'United States',
    postalCode: '94102',
  },
  score: 85,
  status: 'verified',
};

const failedResult: IdentityVerificationResult = {
  selfieUrl: 'data:image/jpeg;base64,test',
  phone: '+14155552671',
  address: {
    street: '123 Main St',
    city: 'San Francisco',
    state: 'California',
    country: 'United States',
    postalCode: '94102',
  },
  score: 23,
  status: 'failed',
};

describe('verificationStore', () => {
  beforeEach(() => {
    useVerificationStore.setState({ result: null });
  });

  describe('setResult', () => {
    it('stores verification result', () => {
      useVerificationStore.getState().setResult(verifiedResult);

      expect(useVerificationStore.getState().result).toEqual(verifiedResult);
    });

    it('overwrites previous result', () => {
      useVerificationStore.getState().setResult(failedResult);
      useVerificationStore.getState().setResult(verifiedResult);

      expect(useVerificationStore.getState().result?.status).toBe('verified');
    });
  });

  describe('clearVerification', () => {
    it('resets result to null', () => {
      useVerificationStore.getState().setResult(verifiedResult);

      useVerificationStore.getState().clearVerification();

      expect(useVerificationStore.getState().result).toBeNull();
    });
  });

  describe('selectIsVerified', () => {
    it('returns false when no result', () => {
      expect(selectIsVerified(useVerificationStore.getState())).toBe(false);
    });

    it('returns true for verified result', () => {
      useVerificationStore.getState().setResult(verifiedResult);

      expect(selectIsVerified(useVerificationStore.getState())).toBe(true);
    });

    it('returns false for failed result', () => {
      useVerificationStore.getState().setResult(failedResult);

      expect(selectIsVerified(useVerificationStore.getState())).toBe(false);
    });
  });
});
