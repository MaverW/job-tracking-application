import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: false,
})
export class RegisterPage implements OnInit {

  username = '';
  usersurname = '';
  email = '';
  password = '';
  passwordAgain = '';

  constructor(
    private authService:AuthService,
    private router:Router,
  ) { }

  ngOnInit() {
  }

  register()
  {
    this.authService.register(this.email, this.password, this.username).then(userCredental => {
      console.log('Kaydınız başarı ile oluşturuldu !');
      this.router.navigateByUrl('/home');
    })
    .catch(error => {
      console.log('Hata !', error.message);
    })
  }

  routeLogin()
  {
    this.router.navigateByUrl('/login')
  }
}
