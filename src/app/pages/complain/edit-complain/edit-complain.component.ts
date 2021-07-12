import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Complain } from 'src/app/core/models/complain';
import { ComplainService } from 'src/app/core/services/complain.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-complain',
  templateUrl: './edit-complain.component.html',
  styleUrls: ['./edit-complain.component.scss']
})
export class EditComplainComponent implements OnInit {
  complain: Complain = new Complain();
  complainId: string;

  constructor(
    private complainService: ComplainService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.complain = history.state.complain;
    this.complainId = history.state.complainId;
    console.log(this.complain);
    console.log(this.complainId);
    
    
  }

  onSubmit(form: NgForm){
    if(form.valid){
      this.complainService.updateComplain(this.complain, this.complainId);
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Queja actualizada',
        showConfirmButton: false,
        timer: 1500
      })
      this.router.navigate(['/list-complain']);
    }else{
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Complete todos los campos obligatorios!',        
      })
    } 
  }

  

}
