import { Component, OnInit } from '@angular/core';
import { Complain } from 'src/app/core/models/complain';
import { ComplainService } from 'src/app/core/services/complain.service';
import Swal from 'sweetalert2';
import { NgForm } from '@angular/forms';
import { UserService } from 'src/app/core/services/user.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-add-complain',
  templateUrl: './add-complain.component.html',
  styleUrls: ['./add-complain.component.scss']
})
export class AddComplainComponent implements OnInit {
  complain: Complain = new Complain();
  user: string;


  constructor(
    private userService: UserService,
    private complainService: ComplainService,
    private router: Router) { }

  ngOnInit(): void {
    this.user = this.userService.getUser;
    console.log(this.user);
    
  }

  onSubmit(form: NgForm){
    console.log(this.user);
    
    if(form.valid){
      this.complainService.createComplain(this.complain, this.user)
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Queja registrada',
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
