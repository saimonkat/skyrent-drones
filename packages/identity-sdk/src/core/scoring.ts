export function generateVerificationScore(): number {
  if (Math.random() < 0.3) {
    return Math.floor(Math.random() * 50);
  }
  return Math.floor(Math.random() * 51) + 50;
}
