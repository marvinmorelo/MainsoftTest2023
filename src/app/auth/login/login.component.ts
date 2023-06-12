import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm: FormGroup;
  showPassword: boolean = false;


  constructor(private formBuilder: FormBuilder, private router:Router, private loginService:AuthService) { 
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.buildLoginForm();
  }
  
  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }
  
  buildLoginForm(): void {
    this.loginForm = this.formBuilder.group({
      username: ["", [Validators.required]],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const credentials = {
        username: this.loginForm.value.username,
        password: this.loginForm.value.password
      };

      this.loginService.login(credentials.username, credentials.password).subscribe(
        (response) => {
          console.log('Inicio de sesión exitoso', response);
          this.router.navigateByUrl('/home')
        },
        (error) => {
          alert('Error en el inicio de sesión'+error)
        }
      );
    }

  }
}
