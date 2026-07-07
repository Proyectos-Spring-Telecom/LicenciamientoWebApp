import { Injectable } from '@angular/core';

export class CountryInfo {
  state: string;

  oil: number;

  gas?: number;

  coal?: number;
}

const countriesInfo: CountryInfo[] = [{
  state: 'Lunes',
  oil: 4.95,
  gas: 2.85,
  coal: 45.56,
}, {
  state: 'Martes',
  oil: 12.94,
  gas: 17.66,
  coal: 4.13,
}, {
  state: 'Miércoles',
  oil: 8.51,
  gas: 19.87,
  coal: 15.84,
}, {
  state: 'Jueves',
  oil: 5.3,
  gas: 4.39,
}, {
  state: 'Viernes',
  oil: 4.08,
  gas: 5.4,
}, {
  state: 'Sábado',
  oil: 12.03,
},
];

@Injectable()
export class ServiceGrafica {
  getCountriesInfo(): CountryInfo[] {
    return countriesInfo;
  }
}