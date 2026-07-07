import { Injectable } from '@angular/core';

export class Customer {
  ID: number;

  CompanyName: string;

  Address?: string;

  Addressone?: string;

  City: string;

  State: string;

  Zipcode: number;

  Phone: string;

  Fax: string;

  Website: string;
}

const сustomers: Customer[] = [{
  ID: 1,
  CompanyName: 'https://kdeworld.com/wp-content/uploads/2019/06/alumbrado-publico.jpg',
  Address: 'Apagada',
  City: 'alberto_4@gmail.com',
  State: '2022-05-04 - 1:59 PM',
  Zipcode: 72716,
  Phone: '00003',
  Fax: 'Ventor Internacional S.A. de C.V',
  Website: 'http://www.nowebsitesupermart.com',
}, {
  ID: 2,
  CompanyName: 'https://www.asocapitales.co/nueva/wp-content/uploads/2020/12/Sistema-control-iluminacion-4-750x350.jpg',
  Addressone: 'Encendida',
  City: 'agonzales@hotmail.com',
  State: '2022-05-03 - 1:56 PM',
  Zipcode: 55403,
  Phone: '000015',
  Fax: 'Corporativo Cruz S.A. de C.V',
  Website: 'http://www.nowebsitemusic.com',
}, {
  ID: 3,
  CompanyName: 'https://www.indisect.com/wp-content/uploads/2020/08/Alumbrado-Publico-Solar-una-alternativa-Ecologica-1200x600.jpg',
  Addressone: 'Encendida',
  City: 'diana.cortes@gmail.com',
  State: '2022-05-01 - 1:15 PM',
  Zipcode: 98027,
  Phone: '00009',
  Fax: 'Parque Publico Cuernavaca',
  Website: 'http://www.nowebsitetomsclub.com',
}, 
// {
//   ID: 4,
//   CompanyName: 'https://www.ansa.it/webimages/img_620x438/2021/7/7/2e1222048b0c38200b4263775a6a701e.jpg',
//   Address: '3333 Beverly Rd',
//   City: 'Hoffman Estates',
//   State: 'Illinois',
//   Zipcode: 60179,
//   Phone: '(847) 286-2500',
//   Fax: '4/23/1998',
//   Website: 'http://www.nowebsiteemart.com',
// }, {
//   ID: 5,
//   CompanyName: 'https://www.lamborghini.com/sites/it-en/files/DAM/lamborghini/news/2020/07_17_svj_xago/svj_xago_cover.jpg',
//   Address: '200 Wilmot Rd',
//   City: 'Deerfield',
//   State: 'Illinois',
//   Zipcode: 60015,
//   Phone: '(847) 940-2500',
//   Fax: '3/6/2009',
//   Website: 'http://www.nowebsitewalters.com',
// }, {
//   ID: 6,
//   CompanyName: 'https://www.motor16.com/wp-content/uploads/2022/02/17887_b5xqLzt7EF2Bc-p.jpg',
//   Address: '400 Commerce S',
//   City: 'Fort Worth',
//   State: 'Texas',
//   Zipcode: 76102,
//   Phone: '(817) 820-0741',
//   Fax: '8/11/2009',
//   Website: 'http://www.nowebsiteshack.com',
// }, {
//   ID: 7,
//   CompanyName: 'https://smlycdn.akamaized.net/data/product2/2/270c07d173d600f05671e3022ae02b2ddd12251e_l.jpg',
//   Address: '2200 Kensington Court',
//   City: 'Oak Brook',
//   State: 'Illinois',
//   Zipcode: 60523,
//   Phone: '(800) 955-2929',
//   Fax: '3/24/2008',
//   Website: 'http://www.nowebsitecircuittown.com',
// }, {
//   ID: 8,
//   CompanyName: 'http://1.bp.blogspot.com/-0bYyBK1Gszk/VMa-tJkjGqI/AAAAAAAASUM/YO4eXG2low8/s1600/ferrari-f12-berlinetta-tour-de-france-64-01.jpg',
//   Address: '7601 Penn Avenue South',
//   City: 'Richfield',
//   State: 'Minnesota',
//   Zipcode: 55423,
//   Phone: '(612) 291-1000',
//   Fax: '4/22/2009',
//   Website: 'http://www.nowebsitepremierbuy.com',
// }, {
//   ID: 9,
//   CompanyName: 'https://ag-spots-2020.o.auroraobjects.eu/2020/02/21/ferrari-f12berlinetta-c252921022020100903_1.jpg',
//   Address: '263 Shuman Blvd',
//   City: 'Naperville',
//   State: 'Illinois',
//   Zipcode: 60563,
//   Phone: '(630) 438-7800',
//   Fax: '4/22/2009',
//   Website: 'http://www.nowebsiteelectrixmax.com',
// }, {
//   ID: 10,
//   CompanyName: 'https://img.remediosdigitales.com/fb2a8c/9ysE3CGxrWA/1366_2000.jpg',
//   Address: '1201 Elm Street',
//   City: 'Dallas',
//   State: 'Texas',
//   Zipcode: 75270,
//   Phone: '(214) 854-3000',
//   Fax: '11/8/2002',
//   Website: 'http://www.nowebsitevideoemporium.com',
// }, {
//   ID: 11,
//   CompanyName: 'https://motor.elpais.com/wp-content/uploads/2019/07/0b86954c-addarmor-audi-rs7-23.jpg',
//   Address: '1000 Lowes Blvd',
//   City: 'Mooresville',
//   State: 'North Carolina',
//   Zipcode: 28117,
//   Phone: '(800) 445-6937',
//   Fax: '1/15/1995',
//   Website: 'http://www.nowebsitescreenshop.com',
// }, {
//   ID: 12,
//   CompanyName: 'https://i.pinimg.com/originals/d2/cb/a4/d2cba41a4c15bf24e61cae96c5d224f2.jpg',
//   Address: '1 Infinite Loop',
//   City: 'Cupertino',
//   State: 'California',
//   Zipcode: 95014,
//   Phone: '(408) 996-1010',
//   Fax: '4/14/2012',
//   Website: 'http://www.nowebsitebraeburn.com',
// }
];

@Injectable()
export class Service {
  getCustomers() {
    return сustomers;
  }
}
