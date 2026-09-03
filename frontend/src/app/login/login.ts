import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
@Component({selector:'app-login',standalone:true,imports:[ReactiveFormsModule],templateUrl:'./login.html'})
export class LoginComponent {
  loading=false; error='';
  form=this.fb.nonNullable.group({username:['',Validators.required],password:['',[Validators.required,Validators.minLength(6)]],confirmPassword:['',Validators.required]});
  constructor(private fb:FormBuilder,private auth:AuthService,private router:Router){this.form.addValidators((c:AbstractControl)=>c.get('password')?.value===c.get('confirmPassword')?.value?null:{passwordMismatch:true});}
  login(){this.error='';if(this.form.invalid){this.form.markAllAsTouched();return;}this.loading=true;const {username,password}=this.form.getRawValue();this.auth.login(username,password).subscribe({next:()=>{this.loading=false;this.router.navigate(['/home']);},error:()=>{this.loading=false;this.error='Invalid username or password.';}});}
}
