import { HttpClient, HttpHeaders, JsonpClientBackend } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SmsService {
  private url = 'https://www.excellentsms.net/index.php/api/sms';
  api_key: string = '4GwYjaZygd6zPXINus1987clqdy7VrYoUpmk0f8790';  
  sms: string= "Esto es prueba8";
  remitente: string= '14040000000';

  
    

  constructor(private http: HttpClient) { 
    
    
  }

  sendSMS(number: string): Observable<any>{
   const data: any = {
      api_key : this.api_key,
      numero : 53+number,
      sms : this.sms,
      remitente : this.remitente
    };
      
      const data_string: string = JSON.stringify(data);
      console.log(data_string);
      console.log(data_string.length.toString());
      
      const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Content-Length': data_string.length.toString()
    });
    return this.http.post(this.url, data_string, {headers: headers});
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
