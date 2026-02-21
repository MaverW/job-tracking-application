import { AuthService } from './../auth-service';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, Validators, ReactiveFormsModule } from '@angular/forms';
import { IonicModule, ModalController, ToastController } from '@ionic/angular';
import { collection, getDocs, getFirestore, query, where } from 'firebase/firestore';

@Component({
  selector: 'app-job-form',
  templateUrl: './job-form.component.html',
  styleUrls: ['./job-form.component.scss'],
  standalone: true,
  imports : [IonicModule, FormsModule, ReactiveFormsModule, CommonModule],
})
export class JobFormComponent implements OnInit {
  jobName : string = '';
  address : string = '';
  contactInfo : string = '';
  note : string = '';

  users: { id: string, name: string, role: string }[] = [];
  selectedUser: string = '';

  constructor(
    private modalController: ModalController,
    private fb: FormBuilder,
    private authService:AuthService, 
    private toastController:ToastController
  ) {  }

 formatPhone(event: any) {
  let value = event.target.value.replace(/\D/g, ''); // sadece rakam

  // Baştaki 0'ı kaldır (biz kendimiz ekleyeceğiz)
  if (value.startsWith("0")) {
    value = value.substring(1);
  }

  // En fazla 10 rakam
  if (value.length > 10) {
    value = value.substring(0, 10);
  }

  let formatted = '';

  if (value.length > 0) {
    formatted = '0 (' + value.substring(0, 3);
  }

  if (value.length >= 3) {
    formatted += ') ' + value.substring(3, 6);
  }

  if (value.length >= 6) {
    formatted += ' ' + value.substring(6, 8);
  }

  if (value.length >= 8) {
    formatted += ' ' + value.substring(8, 10);
  }

  this.contactInfo = formatted;
}

  ngOnInit() {
    this.loadUsers();
  }

  async loadUsers() {
    const db = getFirestore();
    const userRef = collection(db, 'users');
    const q = query(userRef, where('role', '==', 'user'));
    const snapShot = await getDocs(q);

    this.users = snapShot.docs.map(doc => ({
      id: doc.id,
      ...(doc.data() as any)
    }));
  }

  async submit() {
    try
    {
      await this.authService.addJob(this.jobName, this.address, this.contactInfo, this.note, this.selectedUser);

      await this.showToast('İş başarıyla eklendi ✅', 'success');
      this.close();
    }
    catch (error) {
      console.error(error);
      await this.showToast('Bir hata oluştu ❌', 'danger');
      console.log('Hata', error);
    }
  }

  close() {
    this.modalController.dismiss();
  }

  async showToast(message: string, color: 'success' | 'danger' | 'warning' = 'success') {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      position: 'bottom',
      color: color,
      icon: color === 'success' ? 'checkmark-circle' : 'alert-circle'
    });

    await toast.present();
  }


}