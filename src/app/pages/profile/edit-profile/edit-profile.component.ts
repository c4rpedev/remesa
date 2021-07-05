import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/core/models/user';;
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service'
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/auth';


@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit {
  user: User = new User();

  isProgressVisible: boolean;
  signupForm: FormGroup;
  firebaseErrorMessage: string;

  constructor(private authService: AuthService, private router: Router, private afAuth: AngularFireAuth) {
      this.isProgressVisible = false;
      this.firebaseErrorMessage = '';
  }

  ngOnInit(): void {
      if (this.authService.userLoggedIn) {                       // if the user's logged in, navigate them to the dashboard (NOTE: don't use afAuth.currentUser -- it's never null)
          this.router.navigate(['/dashboard']);
      }

      this.signupForm = new FormGroup({
          'displayName': new FormControl('', Validators.required),
          'email': new FormControl('', [Validators.required, Validators.email]),
          'password': new FormControl('', Validators.required),
          'prefix': new FormControl('', Validators.required),
          'role': new FormControl('', Validators.required),
          'address': new FormControl('', Validators.required),
          'phone': new FormControl('', Validators.required),
          'country': new FormControl('', Validators.required),
      });
  }

  signup() {
      if (this.signupForm.invalid)                            // if there's an error in the form, don't submit it
          return;

      this.isProgressVisible = true;
      this.authService.signupUser(this.signupForm.value).then((result) => {
          if (result == null)                                 // null is success, false means there was an error
              this.router.navigate(['/dashboard']);
          else if (result.isValid == false)
              this.firebaseErrorMessage = result.message;

          this.isProgressVisible = false;                     // no matter what, when the auth service returns, we hide the progress indicator
      }).catch(() => {
          this.isProgressVisible = false;
      });
  }

}
