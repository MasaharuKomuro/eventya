import { Injectable } from '@angular/core';

@Injectable()
export class RegistryService {

  constructor() { }

  public status = {
    'NEW'         : 0,
    'DRAFT'       : 1,
    'PENDING'     : 2,
    'FUTURE'      : 3,
    'LIVE'        : 4,
    'LIVEDRAFT'   : 5,
    'LIVEPENDING' : 6,
    'LIVEFUTURE'  : 7,
    'PRIVATE'     : 8,
    'DELETED'     : 9,
    'DELETE'      : 9,
  }

}
