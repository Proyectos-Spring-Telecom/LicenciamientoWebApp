import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

const SWAL_BACKDROP_COLOR = 'rgba(0, 0, 0, 0.45)';
const SWAL_POPUP_BACKGROUND = '#1c252e';
const SWAL_POPUP_COLOR = '#e6f1ff';

function applySwalBackdrop(): void {
  const container = Swal.getContainer();
  if (container) {
    container.style.background = SWAL_BACKDROP_COLOR;
    container.style.backgroundColor = SWAL_BACKDROP_COLOR;
  }

  document.querySelectorAll('body > [aria-hidden="true"]:not(.swal2-container)').forEach((element) => {
    element.removeAttribute('aria-hidden');
  });
}

const swalWithDefaults = Swal.mixin({
  backdrop: SWAL_BACKDROP_COLOR,
  background: SWAL_POPUP_BACKGROUND,
  color: SWAL_POPUP_COLOR,
  heightAuto: false,
  didOpen: () => applySwalBackdrop(),
});

const originalFire = swalWithDefaults.fire.bind(swalWithDefaults);

function normalizeOptions(options: Record<string, unknown>): Record<string, unknown> {
  const normalized = { ...options };

  if (typeof normalized.backdrop === 'string') {
    normalized.backdrop = SWAL_BACKDROP_COLOR;
  } else if (normalized.backdrop !== false) {
    normalized.backdrop = SWAL_BACKDROP_COLOR;
  }

  const userDidOpen = normalized.didOpen as ((popup: HTMLElement) => void) | undefined;
  normalized.didOpen = (popup: HTMLElement) => {
    applySwalBackdrop();
    userDidOpen?.(popup);
  };

  return normalized;
}

Swal.fire = ((options?: unknown, ...rest: unknown[]) => {
  if (options && typeof options === 'object') {
    return originalFire(normalizeOptions(options as Record<string, unknown>), ...rest);
  }

  return originalFire(options, ...rest);
}) as typeof Swal.fire;
