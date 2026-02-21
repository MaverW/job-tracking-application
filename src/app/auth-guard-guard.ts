import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { app } from '../firebaseConfig';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(): Promise<boolean> {
    return new Promise((resolve) => {

      const auth = getAuth(app);

      onAuthStateChanged(auth, (user) => {

        if (user) {
          resolve(true);
        } else {
          this.router.navigate(['/login']);
          resolve(false); 
        }

      });

    });
  }
}