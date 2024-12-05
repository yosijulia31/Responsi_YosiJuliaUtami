import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(): boolean {
    const isAuthenticated = localStorage.getItem('isAuthenticated'); // Mengecek autentikasi di localStorage
    if (isAuthenticated) {
      return true;
    } else {
      this.router.navigate(['/login']); // Jika belum login, arahkan ke halaman login
      return false;
    }
  }
}
