import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Complain } from 'src/app/core/models/complain';
import { ComplainService } from 'src/app/core/services/complain.service';
import { UserService } from 'src/app/core/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-complain',
  templateUrl: './edit-complain.component.html',
  styleUrls: ['./edit-complain.component.scss']
})
export class EditComplainComponent implements OnInit {
  complain: Complain = new Complain();
  complainId: string;
  user: string;
  admin: boolean;
  constructor(
    private complainService: ComplainService,
    private router: Router,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.complain = history.state.complain;
    this.complainId = history.state.complainId;
    this.user = history.state.user;  
    this.admin = this.userService.isAdmin(this.user);
    
    
  }
 

  isAdmin(): boolean{
    console.log(this.admin);
    
    return this.admin;
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
