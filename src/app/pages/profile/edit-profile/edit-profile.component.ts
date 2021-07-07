import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/core/models/user';;
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service'
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/auth';
import { UtilService } from 'src/app/core/services/util.service';
import { AngularFireStorage } from '@angular/fire/storage';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit {
  user: Observable<any>;     
  filePath:String
  isProgressVisible: boolean;
  signupForm: FormGroup;
  firebaseErrorMessage: string; 
  img: string | ArrayBuffer =
  "https://bulma.io/images/placeholders/480x480.png";
  displayName: String;
    email: String;
    password: String;
    prefix: String;
    role: String;
    address: String;
    phone: String;
    country: String;
    photosrc: String;
  file: File;

  constructor( private authService: AuthService, 
               private router: Router, 
               private afAuth: AngularFireAuth, 
               private utilService: UtilService,
               private firestore: AngularFirestore,
               private afStorage: AngularFireStorage ) {
      this.isProgressVisible = false;
      this.firebaseErrorMessage = '';
  }

  ngOnInit(): void {
      
    this.afAuth.authState.subscribe(user => {
        console.log('Dashboard: user', user);
        if (user) {
            let emailLower = user.email.toLowerCase();
            this.user = this.firestore.collection('users').doc(emailLower).valueChanges();  
            console.log('User data');
            this.user.subscribe(user=>{
                this.displayName= user.displayName;               
                this.email= user.email;
                this.password= user.password;
                this.prefix= user.prefix;
                this.role= user.role;
                this.address= user.address;
                this.phone= user.phone;
                this.country= user.country;  
            }); 
            
            // -- This is for edit-profile
           /* this.afStorage.storage.ref('users/'+user.uid+'/profile.jpg').getDownloadURL().then(imgUrl =>{
                this.img = imgUrl;
                console.log('ImgURL');
                console.log(this.img);
                
                
            });  */        
        }
      });
      console.log("asdfasd");
      console.log(this.displayName);
      
      this.signupForm = new FormGroup({     
          'displayName': new FormControl(this.displayName, Validators.required),
          'email': new FormControl(this.email, [Validators.required, Validators.email]),
          'photo': new FormControl(''),
          'password': new FormControl(this.password, Validators.required),
          'prefix': new FormControl(this.prefix, Validators.required),
          'role': new FormControl(this.role, Validators.required),
          'address': new FormControl(this.address),
          'phone': new FormControl(this.phone),
          'country': new FormControl(this.country),
      });
      
  }
    
  
    photo(event: any) {
        this.filePath = event.target.files[0];
        console.log("Path");
        console.log(this.photosrc);
        this.file = event.target.files[0];
    
          const reader = new FileReader();
          reader.readAsDataURL(event.target.files[0]);
    
          reader.onload = event => {
            this.img = reader.result;
          };
        
    }
 

    signup() {
        if (this.signupForm.invalid)                            // if there's an error in the form, don't submit it
            return;
        this.isProgressVisible = true;
        this.authService.signupUser(this.signupForm.value, this.filePath).then((result) => {
            if (result == null)                                 // null is success, false means there was an error
                this.router.navigate(['/']);
            else if (result.isValid == false)
                this.firebaseErrorMessage = result.message;
            this.isProgressVisible = false;                     // no matter what, when the auth service returns, we hide the progress indicator
        }).catch(() => {
            this.isProgressVisible = false;
        });
    }

}
