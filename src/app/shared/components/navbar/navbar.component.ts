import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IUser } from 'src/app/core/interfaces/iuser.interface';
import { faEnvelope, faBell, faUser } from '@fortawesome/free-solid-svg-icons';
import { UserCountService } from 'src/app/core/services/user-count.service';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { AngularFireStorage } from '@angular/fire/storage';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {  
  
  faEnvelope = faEnvelope;
  faBell = faBell;
  faUser = faUser;
  img: String;
  
  user: Observable<any>;              // Example: store the user's info here (Cloud Firestore: collection is 'users', docId is the user's email, lower case)

    constructor(private afAuth: AngularFireAuth, 
                private firestore: AngularFirestore, 
                private router: Router,
                private afStorage: AngularFireStorage) {
        this.user = null;
    }
    
  ngOnInit(): void {
    this.afAuth.authState.subscribe(user => {
      console.log('Dashboard: user', user);
      if (user) {
          let emailLower = user.email.toLowerCase();
          this.user = this.firestore.collection('users').doc(emailLower).valueChanges();
          this.afStorage.storage.ref('users/'+user.uid+'/profile.jpg').getDownloadURL().then(imgUrl =>{
              this.img = imgUrl;
          });
      }
    });
   }
  
 
  logout(): void {
    this.afAuth.signOut();
  }
  openSettings(){
    this.router.navigateByUrl('/edit-profile');
  }
  
}
