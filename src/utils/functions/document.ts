export function verifyWindowIsAvailable() {
  if (typeof window === 'undefined') return false;
  return true;
}
