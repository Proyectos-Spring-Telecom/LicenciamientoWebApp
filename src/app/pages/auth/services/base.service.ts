import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { ErrorMessage } from '../../../_entities/ErrorMessage';

@Injectable({
  providedIn: 'root'
})
export default class BaseService {

  constructor() { }
  protected handleError(error: Response | any) {
    const errorMessage: ErrorMessage = new ErrorMessage();
    errorMessage.httpStatus = error.status;
    console.log(error);
    return throwError(errorMessage);
  }
}
