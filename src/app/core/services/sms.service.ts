import { HttpClient, HttpHeaders, JsonpClientBackend } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SmsService {
  private url = 'https://www.excellentsms.net/index.php/api/sms';
  api_key: string = 'dole2PT5aSwXZnY9us19879X6ArxO7ENdJQv1l5969';
  numero: string='5358247617';
  sms: string= "sms de prueba para enviar desde la api";
  remitente: string= '14040000000';
  data: any = {
    api_key : this.api_key,
    numero : this.numero,
    sms : this.sms,
    remitente : this.remitente
  };
    
    data_string: string = JSON.stringify(this.data);
  
    

  constructor(private http: HttpClient) { 
    console.log(this.data_string);
    
  }

  sendSMS(){
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Content-Length': this.data_string.length.toString()
    });
    return this.http.post(this.url, this.data_string, {headers});
  }
}
