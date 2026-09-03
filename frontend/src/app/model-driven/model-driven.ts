import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { NavbarComponent } from '../layout/navbar';
import { EmployeeService } from '../services/employee.service';
import { EmployeeTableComponent } from '../employee-table/employee-table';
import { Employee } from '../models/employee';

@Component({selector:'app-model-driven',standalone:true,imports:[ReactiveFormsModule,NavbarComponent,EmployeeTableComponent],templateUrl:'./model-driven.html'})
export class ModelDrivenComponent {
  departments=['IT','HR','Finance','Sales','Marketing','Operations']; genders=['Male','Female','Other']; refresh=0; saving=false;
  form=this.fb.nonNullable.group({name:['',[Validators.required,Validators.pattern(/^[A-Za-z ]+$/),Validators.minLength(2)]],email:['',[Validators.required,Validators.email]],phone:['',[Validators.required,Validators.pattern(/^[6-9]\d{9}$/)]],aadhar:['',[Validators.required,Validators.pattern(/^\d{12}$/)]],pan:['',[Validators.required,Validators.pattern(/^[A-Z]{5}\d{4}[A-Z]$/)]],age:[18,[Validators.required,Validators.min(18),Validators.max(60)]],department:['',Validators.required],salary:[0,[Validators.required,Validators.min(0)]],gender:['',Validators.required],joiningDate:['',Validators.required],activeEmployee:[true]});
  constructor(private fb:FormBuilder,private service:EmployeeService){}
  get f(){return this.form.controls;}
  submit(){if(this.form.invalid){this.form.markAllAsTouched();alert('Please fill all fields correctly.');return;}this.saving=true;this.service.save(this.form.getRawValue() as Employee).subscribe({next:()=>{alert('Employee saved successfully!');this.form.reset({name:'',email:'',phone:'',aadhar:'',pan:'',age:18,department:'',salary:0,gender:'',joiningDate:'',activeEmployee:true});this.refresh++;this.saving=false;},error:e=>{console.error(e);alert(e?.error?.message||'Save failed. Check Spring Boot and MySQL.');this.saving=false;}});}
}
