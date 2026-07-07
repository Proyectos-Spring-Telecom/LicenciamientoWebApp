export class User{
    // [x: string]: any;
    id: string
    token: string;
    refreshToken: string;
    nombre: string;
    apellidoPaterno: string;
    apellidoMaterno: string;
    nombreCompleto: string;
    permisos: any[];
    idCliente: number;
    pic: string;
    logo: any;
    nombreGrupo: any;
    nombreRol: any;
}