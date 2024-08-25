export function doNothing(placeholder?: unknown) {
  if (placeholder) {
    // doNothing
  }
  // doNothing
}

export function verifyIfIsClient() {
  if (typeof window === 'undefined') return false;
  return true;
}
