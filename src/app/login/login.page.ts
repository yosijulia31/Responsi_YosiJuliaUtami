import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  username: string = '';
  password: string = '';

  constructor(private router: Router, private alertController: AlertController) {}

  async login() {
    if (this.username === 'admin' && this.password === '1234') {
      // Set status login
      localStorage.setItem('isAuthenticated', 'true');
      this.router.navigateByUrl('/mahasiswa');
    } else {
      const alert = await this.alertController.create({
        header: 'Login Gagal',
        message: 'Username atau password salah.',
        buttons: ['OK'],
      });
      await alert.present();
    }
  }      
}