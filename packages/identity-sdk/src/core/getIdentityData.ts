import type { IdentityData, IdentityVerificationResult } from '@sdk/types';
import { generateVerificationScore } from './scoring';

export function getIdentityData(data: IdentityData): IdentityVerificationResult {
  const score = generateVerificationScore();

  return {
    selfieUrl: data.selfieUrl,
    phone: data.phone,
    address: data.address,
    score,
    status: score >= 50 ? 'verified' : 'failed',
  };
}
