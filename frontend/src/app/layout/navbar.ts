import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({selector:'app-navbar',standalone:true,
    imports:[RouterLink,RouterLinkActive],templateUrl:'./navbar.html'})

export class NavbarComponent{ 
    constructor(readonly auth:AuthService,private router:Router){} logout(){this.auth.logout();this.router.navigate(['/login']);} }
