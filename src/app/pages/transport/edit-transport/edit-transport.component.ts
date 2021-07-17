import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { GetProvincesService } from 'src/app/core/services/get-provinces.service';
import { TransportService } from 'src/app/core/services/transport.service';

@Component({
  selector: 'app-edit-transport',
  templateUrl: './edit-transport.component.html',
  styleUrls: ['./edit-transport.component.scss']
})
export class EditTransportComponent implements OnInit {
 
  transporte: any [] = [];
  agency: string;
  transportForm: FormGroup;  
  transporteArray: any;
  transporteArrayM: any;
  constructor(private transportService: TransportService,
              private fb:FormBuilder ) { 

                this.transportForm = this.fb.group({  
                  agency: this.agency,  
                  quantities: this.fb.array([]) ,  
                });  
              }

  ngOnInit(): void {
    this.transportService.getTransport().then(res =>{
      this.transporte = res;           
    });
  }
  
  quantities() : FormArray {  
    return this.transportForm.get("quantities") as FormArray  
  }  
     
  newQuantity(): FormGroup {  
    return this.fb.group({  
      municipio: '',  
      precio: '',
    })  
  }  
     
  addQuantity() {  
    this.quantities().push(this.newQuantity());  
  }  
     
  removeQuantity(i:number) {  
    this.quantities().removeAt(i);  
    
  } 

  onChangeAgency(){
    this.transportService.getTransportForAgency(this.agency).then(res=>{
      this.transporteArray = res;  
      console.log(this.transporteArray);
      this.transporteArrayM=this.transporteArray[0].attributes;
      console.log(this.transporteArrayM.transporte);  
      this.quantities().clear();
       this.transporteArrayM.transporte.forEach((element:any) => {
        console.log(element);        
        this.quantities().push(this.fb.group(element));  
       });
      
    })
  }
  keys() : Array<string> {
    return Object.keys(this.transporteArray);
  }
  onSubmit() {  
    console.log(this.transportForm.value['quantities']); 
    console.log(this.transporteArray[0].id);    
    this.transportService. updateTransport(this.transporteArray[0].id, this.transportForm.value['quantities']);    
  } 
 

}
