import { Routes } from '@angular/router';
import { LoginComponent } from './login/login';
import { HomeComponent } from './home/home';
import { TemplateDrivenComponent } from './template-driven/template-driven';
import { ModelDrivenComponent } from './model-driven/model-driven';
import { EmployeeListComponent } from './employee-list/employee-list';
import { authGuard } from './guards/auth.guard';
export const routes:Routes=[
 {path:'',redirectTo:'login',pathMatch:'full'},
 {path:'login',component:LoginComponent},
 {path:'home',component:HomeComponent,canActivate:[authGuard]},
 {path:'template-driven',component:TemplateDrivenComponent,canActivate:[authGuard]},
 {path:'model-driven',component:ModelDrivenComponent,canActivate:[authGuard]},
 {path:'employee-list',component:EmployeeListComponent,canActivate:[authGuard]},
 {path:'**',redirectTo:'login'}
];
