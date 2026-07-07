import {
    Injectable,
  } from '@angular/core';
  
  export class LanguageData {
    language: string;
  
    percent: number;
    
    tipo: number;
  }
  
  const languages: LanguageData[] = [{
    language: 'Ahorro',
    percent: 56.1,
    tipo: 3
  }, {
    language: 'Potencia',
    percent: 4.0,
    tipo: 1
  }, {
    language: 'Atenuación',
    percent: 4.3,
    tipo: 2
  },
];
  
  @Injectable()
  export class Service {
    getLanguagesData(): LanguageData[] {
      return languages;
    }
  }