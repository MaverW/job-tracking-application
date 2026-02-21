import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: false,
})
export class LoginPage implements OnInit {

  email = '';
  password = '';

  constructor(
    private authService:AuthService,
    private router:Router,
  ) { }

  ngOnInit() {
  }

  login()
  {
    this.authService.login(this.email, this.password).then(userCredential => {
      console.log('Giriş Başarılı !', userCredential.user.email);
      this.router.navigateByUrl('/home');
    })
    .catch(error => {
      console.log('Hata', error.message);
    });
  }

  routeRegister()
  {
    this.router.navigateByUrl('/register');
  }
}
