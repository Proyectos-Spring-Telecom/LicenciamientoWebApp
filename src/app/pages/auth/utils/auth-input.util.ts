export function habilitarInputAuth(event: FocusEvent): void {
  const input = event.target as HTMLInputElement | null;
  input?.removeAttribute('readonly');
}
