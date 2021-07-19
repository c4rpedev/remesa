import { Injectable } from '@angular/core';
import * as Parse from 'parse';

@Injectable({
  providedIn: 'root'
})
export class SucursalService {

  constructor() { }

  getSucursal(): Promise <any> {   
    const Sucursal = Parse.Object.extend('sucursales');
    const query = new Parse.Query(Sucursal);    
    return query.find();   
  }

}
