import { Component, OnInit } from '@angular/core';
import { ApiService } from '../service/api.service';
import { AlertController } from '@ionic/angular'; // Import AlertController
import { Router } from '@angular/router'; // Import Router

@Component({
  selector: 'app-toy',
  templateUrl: './toy.page.html',
  styleUrls: ['./toy.page.scss'],
})
export class ToyPage implements OnInit {
  dataToy: any;
  modalTambah: boolean = false;
  modalEdit: boolean = false;
  id: string = '';
  mainan: string = '';
  story: string = '';

  constructor(
    private api: ApiService, 
    private alertController: AlertController, // Tambahkan AlertController
    private router: Router // Tambahkan Router
  ) {}

  ngOnInit() {
    this.getToy();
  }

  getToy() {
    this.api.tampil('tampil.php').subscribe({
      next: (res: any) => {
        console.log('sukses', res);
        this.dataToy = res;
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  }

  resetModal() {
    this.id = '';
    this.mainan = '';
    this.story = '';
  }

  openModalTambah() {
    this.modalTambah = true;
    this.resetModal();
  }

  openModalEdit(item: any) {
    this.modalEdit = true;
    this.id = item.id;
    this.mainan = item.mainan;
    this.story = item.story;
  }

  cancel() {
    this.modalTambah = false;
    this.modalEdit = false;
    this.resetModal();
  }

  tambahToy() {
    if (this.mainan !== '' && this.story !== '') {
      let data = {
        mainan: this.mainan,
        story: this.story,
      };
      this.api.tambah(data, 'tambah.php').subscribe({
        next: () => {
          this.resetModal();
          this.getToy();
          this.modalTambah = false;
        },
        error: () => {
          console.log('gagal tambah mainan');
        },
      });
    } else {
      console.log('gagal tambah mainan karena masih ada data yg kosong');
    }
  }

  // Metode konfirmasi hapus
  async konfirmasiHapus(id: any) {
    const alert = await this.alertController.create({
      header: 'Konfirmasi',
      message: 'Apakah data mainan ingin dihapus?',
      buttons: [
        {
          text: 'Tidak',
          role: 'cancel',
          handler: () => {
            console.log('Penghapusan dibatalkan');
          }
        },
        {
          text: 'Ya',
          handler: () => {
            this.hapusToy(id); // Panggil metode hapusToy jika pilih 'Ya'
          }
        }
      ]
    });

    await alert.present();
  }

  private hapusToy(id: any) {
    this.api.hapus(id, 'hapus.php?id=').subscribe({
      next: () => {
        this.getToy();
      },
      error: () => {
        console.log('gagal');
      },
    });
  }

  editToy() {
    let data = {
      id: this.id,
      mainan: this.mainan,
      story: this.story,
    };
    this.api.edit(data, 'edit.php').subscribe({
      next: () => {
        this.resetModal();
        this.getToy();
        this.modalEdit = false;
      },
      error: () => {
        console.log('gagal edit mainan');
      },
    });
  }

  // Fungsi Logout
  logout() {
    localStorage.removeItem('isAuthenticated'); // Hapus autentikasi dari localStorage
    this.router.navigate(['/login']); // Arahkan ke halaman login
  }
}
