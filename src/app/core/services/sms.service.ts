import { HttpClient, HttpHeaders, JsonpClientBackend } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import * as Parse from 'parse'
@Injectable({
  providedIn: 'root'
})
export class SmsService {

  private url = 'https://www.excellentsms.net/index.php/api/sms';
  api_key: string;  
  sms: string= "Esto es prueba8";
  remitente: string= '14040000000';
  data_string: string;
  headers: any;
    

  constructor(private http: HttpClient) { 
    
    
  }
  getApiKey(): Promise <any> {   
      const Sms = Parse.Object.extend('sms');
      const query = new Parse.Query(Sms);  
      return query.find() 
  }
  sendSMS(number: string){
    this.getApiKey().then(res=>{
      this.api_key = res[0].attributes.apikey;
      const data: any = {
        api_key : this.api_key,
        numero : 53+number,
        sms : this.sms,
        remitente : this.remitente
      };
        
        this.data_string = JSON.stringify(data);
        console.log(this.data_string);
        console.log(this.data_string.length.toString());
        
        this.headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Content-Length': this.data_string.length.toString()
      });
      this.http.post(this.url, this.data_string, {headers: this.headers}).subscribe(resp =>{
        console.log(res);
        
      });
    })   
  }
  send(){

  }
  // sendSMS(){
  //   var url = "https://www.excellentsms.net/index.php/api/sms";
  //   var xhr = new XMLHttpRequest();
  //   xhr.open("POST", url);
  //   xhr.setRequestHeader("Content-Type", "application/json");
  //   xhr.setRequestHeader("Content-Length", "141");
  //   xhr.onreadystatechange = function () {
  //     if (xhr.readyState === 4) {
  //         console.log(xhr.status);
  //         console.log(xhr.responseText);
  //     }};
  //   var data = `{"api_key" : "Q4LqOEmZBg96CHlous1987OReA6Pvc35ULNzEx8514",
  //   "numero" : "5358247617",
  //   "sms" : "Esto es prueba5",
  //   "remitente" : "1525445255544"}`;

  //   xhr.send(data);
  // }
}
