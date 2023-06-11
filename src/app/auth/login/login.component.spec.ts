import { TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService} from '../auth.service';
import { of, throwError } from 'rxjs';
import { AuthResponse } from 'src/app/shared/models/authResponse-model';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let formBuilder: FormBuilder;
  let router: Router;
  let authService: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FormBuilder, Router, AuthService],
    });

    formBuilder = TestBed.inject(FormBuilder);
    router = TestBed.inject(Router);
    authService = TestBed.inject(AuthService);

    const form: FormGroup = formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });

    component = new LoginComponent(formBuilder, router, authService);
    component.loginForm = form;
  });

  it('should create login component', () => {
    expect(component).toBeTruthy();
  });

  it('should toggle password visibility', () => {
    component.showPassword = false;
    component.togglePasswordVisibility();
    expect(component.showPassword).toBeTruthy();

    component.showPassword = true;
    component.togglePasswordVisibility();
    expect(component.showPassword).toBeFalsy();
  });

  it('should submit login form and navigate to home on success', () => {
    spyOn(authService, 'login').and.returnValue(of({ ok: true } as AuthResponse));
    spyOn(router, 'navigateByUrl');

    component.onSubmit();

    expect(authService.login).toHaveBeenCalled();
    expect(router.navigateByUrl).toHaveBeenCalledWith('/home');
  });

  it('should handle login error', () => {
    spyOn(authService, 'login').and.returnValue(throwError('error'));
    spyOn(router, 'navigateByUrl');
    spyOn(console, 'error');
    spyOn(window, 'alert');

    component.onSubmit();

    expect(authService.login).toHaveBeenCalled();
    expect(console.error).toHaveBeenCalledWith('Error en el inicio de sesión', 'error');
    expect(window.alert).toHaveBeenCalledWith('Error en el inicio de sesión');
    expect(router.navigateByUrl).toHaveBeenCalledWith('/home');
  });

  it('should not submit login form if it is invalid', () => {
    component.loginForm.controls['email'].setValue('');
    spyOn(authService, 'login');
    spyOn(router, 'navigateByUrl');

    component.onSubmit();

    expect(authService.login).not.toHaveBeenCalled();
    expect(router.navigateByUrl).not.toHaveBeenCalled();
  });
});
