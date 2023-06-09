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
      email: ['', [Validators.required, Validators.email]],
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
      email: ["", [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const credentials = {
        email: this.loginForm.value.email,
        password: this.loginForm.value.password
      };

      this.loginService.login(credentials.email, credentials.password).subscribe(
        (response) => {
          // Aquí manejo la respuesta exitosa del inicio de sesión
          console.log('Inicio de sesión exitoso', response);
          this.router.navigateByUrl('/company/new')
        },
        (error) => {
          // Aquí manejo el error en caso de que falle el inicio de sesión
          console.error('Error en el inicio de sesión', error);
          alert('Error en el inicio de sesión')
          this.router.navigateByUrl('/company/new')
        }
      );
    }

  }
}
