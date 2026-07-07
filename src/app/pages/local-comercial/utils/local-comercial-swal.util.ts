import Swal from 'sweetalert2';

export function mostrarCargandoLocalComercial(mensaje: string): void {
  Swal.fire({
    title: 'Cargando...',
    html: mensaje,
    allowOutsideClick: false,
    allowEscapeKey: false,
    showConfirmButton: false,
    didOpen: () => {
      Swal.showLoading();
    },
  });
}

export function ocultarCargandoLocalComercial(callback?: () => void): void {
  setTimeout(() => {
    if (Swal.isVisible()) {
      Swal.close();
    }
    callback?.();
  }, 500);
}
