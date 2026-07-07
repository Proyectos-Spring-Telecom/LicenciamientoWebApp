import { fotos } from '../../../_entities/local-comercial/detalle-local-comercial';

export type DocumentoTab = 'sapac' | 'catastral' | 'licenciamiento' | 'proteccion';

export interface DocumentoLocalConfig {
  controlName: string;
  titulo: string;
  idTipoFoto: number;
  buttonClass: string;
  tab: DocumentoTab;
  uploadTitle: string;
  icon: string;
  accept: string;
  badgeDefault: string;
}

const DOCUMENTO_DEFAULTS = {
  accept: 'image/*,.pdf',
  badgeDefault: 'PNG · JPG · WEBP · PDF · Máx. 3 MB',
};

export const DOCUMENTOS_LOCAL: DocumentoLocalConfig[] = [
  { controlName: 'ReciboSapac', titulo: 'Recibo Sapac', idTipoFoto: 3, buttonClass: 'success', tab: 'sapac', uploadTitle: 'Sube tu imagen', icon: 'image', ...DOCUMENTO_DEFAULTS },
  { controlName: 'CaratulaMedidor', titulo: 'Carátula Medidor', idTipoFoto: 4, buttonClass: 'primary', tab: 'sapac', uploadTitle: 'Sube tu imagen', icon: 'image', ...DOCUMENTO_DEFAULTS },
  { controlName: 'CuadroMedidor', titulo: 'Cuadro Medidor', idTipoFoto: 5, buttonClass: 'warning', tab: 'sapac', uploadTitle: 'Sube tu imagen', icon: 'image', ...DOCUMENTO_DEFAULTS },
  { controlName: 'ReciboPredial', titulo: 'Recibo Predial', idTipoFoto: 2, buttonClass: 'success', tab: 'catastral', uploadTitle: 'Sube tu imagen', icon: 'image', ...DOCUMENTO_DEFAULTS },
  { controlName: 'LicenciaFuncionamiento', titulo: 'Licencia de Funcionamiento', idTipoFoto: 1, buttonClass: 'success', tab: 'licenciamiento', uploadTitle: 'Sube archivo', icon: 'description', ...DOCUMENTO_DEFAULTS },
  { controlName: 'FachadaEstablecimiento', titulo: 'Fachada del Establecimiento', idTipoFoto: 6, buttonClass: 'primary', tab: 'licenciamiento', uploadTitle: 'Sube tu imagen', icon: 'image', ...DOCUMENTO_DEFAULTS },
  { controlName: 'Bodega', titulo: 'Bodega', idTipoFoto: 8, buttonClass: 'warning', tab: 'licenciamiento', uploadTitle: 'Sube tu imagen', icon: 'image', ...DOCUMENTO_DEFAULTS },
  { controlName: 'EstacionamientoIMG', titulo: 'Estacionamiento', idTipoFoto: 7, buttonClass: 'danger', tab: 'licenciamiento', uploadTitle: 'Sube tu imagen', icon: 'image', ...DOCUMENTO_DEFAULTS },
  { controlName: 'VistoBueno', titulo: 'Visto Bueno', idTipoFoto: 9, buttonClass: 'success', tab: 'proteccion', uploadTitle: 'Sube archivo', icon: 'description', ...DOCUMENTO_DEFAULTS },
];

export const DOCUMENTOS_SAPAC = DOCUMENTOS_LOCAL.filter((d) => d.tab === 'sapac');
export const DOCUMENTOS_CATASTRAL = DOCUMENTOS_LOCAL.filter((d) => d.tab === 'catastral');
export const DOCUMENTOS_LICENCIAMIENTO = DOCUMENTOS_LOCAL.filter((d) => d.tab === 'licenciamiento');
export const DOCUMENTOS_PROTECCION = DOCUMENTOS_LOCAL.filter((d) => d.tab === 'proteccion');

const CONTROL_BY_TIPO_FOTO = DOCUMENTOS_LOCAL.reduce((acc, doc) => {
  acc[doc.idTipoFoto] = doc.controlName;
  return acc;
}, {} as Record<number, string>);

export const OTRO_ID_CATALOGO = ' ';

export function resolverIdCatalogoDesdeApi(
  id: unknown,
  nombre?: string | null,
  otroId: unknown = OTRO_ID_CATALOGO
): unknown {
  const tieneId = id !== null && id !== undefined && id !== '' && id !== otroId;
  if (tieneId) {
    return id;
  }
  return nombre?.trim() ? otroId : (id ?? null);
}

export function esRutaArchivoValida(ruta?: string | null): boolean {
  if (!ruta || typeof ruta !== 'string') {
    return false;
  }
  const value = ruta.trim();
  return !!value && value !== 'null' && value !== 'undefined';
}

export function mapFotosToUrls(fotosLista: fotos[]): Record<string, string> {
  const urls: Record<string, string> = {};
  (fotosLista || []).forEach((foto) => {
    const controlName = CONTROL_BY_TIPO_FOTO[foto.idTipoFoto];
    if (controlName && esRutaArchivoValida(foto.ruta)) {
      urls[controlName] = foto.ruta.trim();
    }
  });
  return urls;
}

export function resolverValorDocumentoFormData(
  valorControl: unknown,
  urlExistente?: string | null,
  conservarUrlRemota = false
): File | string {
  if (valorControl instanceof File) {
    return valorControl;
  }
  if (conservarUrlRemota && urlExistente) {
    const url = urlExistente.trim();
    if (url && !url.startsWith('blob:')) {
      return url;
    }
  }
  if (valorControl === null || valorControl === undefined) {
    return '';
  }
  return String(valorControl);
}

export function tieneDocumentoAdjunto(
  valorControl: unknown,
  urlExistente?: string | null
): boolean {
  if (valorControl instanceof File) {
    return true;
  }

  if (typeof valorControl === 'string') {
    const valor = valorControl.trim();
    if (valor && valor !== 'null' && valor !== 'undefined' && !valor.startsWith('blob:')) {
      return true;
    }
  }

  const url = urlExistente?.trim();
  return !!url && !url.startsWith('blob:');
}

export function tieneCoordenadasValidas(lat: unknown, lng: unknown): boolean {
  const latitud = lat === null || lat === undefined ? '' : String(lat).trim();
  const longitud = lng === null || lng === undefined ? '' : String(lng).trim();
  return latitud !== '' && longitud !== '';
}

export function construirHtmlCamposObligatorios(campos: string[]): string {
  const items = campos.map((campo) => `<li><b>${campo}</b></li>`).join('');
  return `<div style="margin:0 0 8px;">Es necesario completar los siguientes campos:</div><ul style="text-align:left;margin:0 auto;padding-left:1.25rem;display:inline-block;">${items}</ul>`;
}

export function formatApiDateTime(value: unknown): string {
  if (value == null || value === '') {
    return '';
  }

  const selectedDate = value instanceof Date ? value : new Date(String(value));
  if (isNaN(selectedDate.getTime())) {
    return '';
  }

  const now = new Date();
  const combined = new Date(
    selectedDate.getFullYear(),
    selectedDate.getMonth(),
    selectedDate.getDate(),
    now.getHours(),
    now.getMinutes(),
    now.getSeconds()
  );

  const pad = (n: number) => String(n).padStart(2, '0');
  return `${combined.getFullYear()}-${pad(combined.getMonth() + 1)}-${pad(combined.getDate())} ${pad(combined.getHours())}:${pad(combined.getMinutes())}:${pad(combined.getSeconds())}`;
}
