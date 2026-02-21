import { ModalController } from '@ionic/angular';
import { JobFormComponent } from './../job-form/job-form.component';
import { Report } from './../report';
import { Component } from '@angular/core';
import { PopoverController, ToastController } from '@ionic/angular'; 
import { AuthService } from '../auth-service';
import { Router } from '@angular/router';
import { collection, doc, getDoc, getDocs, getFirestore, onSnapshot, query, updateDoc, where } from 'firebase/firestore';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
})
export class HomePage {

  jobs : any[] = [];
  isPopoverOpen = false;
  montajSayisi = '';
  arizaSayisi = '';
  kullanilanMalzemeler = '';
  not = '';
  role : string | null = null;
  unSubscribe : any;

  constructor
  (
    private popoverController:PopoverController,
    private authService:AuthService,
    private router:Router,
    private report:Report,
    private toastController:ToastController,
    private modalCtrl : ModalController,
  ) {
    this.initAuthListener();
  }

  async markAsCompleted(job: any) {
    const db = getFirestore();
    const jobRef = doc(db, 'jobs', job.id);

    await updateDoc(jobRef, {
      status: 'completed'
    });
  }

  initAuthListener() {
    const auth = getAuth();

    onAuthStateChanged(auth, (user) => {
      if (user) {
        this.listenMyJobs(user.uid);
      }
    });

    onAuthStateChanged(auth, (user) => {
      if (user) {
        this.listenAllJobs();
      }
    });
  }

  ngOnInit() {
    this.loadUserRole();
  }

  listenAllJobs()
  {
    const db = getFirestore();

    const q = query(collection(db, 'jobs'));

    this.unSubscribe = onSnapshot(
      q,
      (snapshot) => {
        this.jobs = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
      },
      (error) => {
        console.error("Snapshot hata:", error.message);
      }
    );
  }

  listenMyJobs(uid: string) {
  const db = getFirestore();

  const q = query(
    collection(db, 'jobs'),
    where('assignedTo', '==', uid),
    where('status', '!=', 'completed')
  );

  this.unSubscribe = onSnapshot(
    q,
    (snapshot) => {
      this.jobs = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
    },
    (error) => {
      console.error("Snapshot hata:", error.message);
    }
  );
}

  async loadUserRole()
  {
    const user = await this.authService.getCurrentUser();

    if(!user) return;

    const db = getFirestore();
    const userRef = doc(db, 'users', user.uid);
    const userSnap = await getDoc(userRef);

    if(userSnap.exists())
    {
      this.role = userSnap.data()['role'];
    }
  }

  get isAdmin() : boolean 
  {
    return this.role === 'admin';
  }

  goToHome()
  {

  }

  goToStatistics()
  {

  }

  viewProfile()
  {

  }

  logout()
  {
    this.authService.logout();
    this.isPopoverOpen = false;
    this.role = null;

    if (this.unSubscribe) {
      this.unSubscribe();
    }
  }

  async presentPopover(event : Event)
  {
    this.isPopoverOpen = true;
  }

  submitReport()
  {
    this.report.addDailyReport({
      montajSayisi : this.montajSayisi,
      arizaSayisi : this.arizaSayisi,
      kullanilanMalzemeler : this.kullanilanMalzemeler,
      not : this.not
    })
    .then(() =>{
      alert('rapor kayıt edildi !');
    })
    .catch(err => {
      console.log('hata !', err.message);
    });
  }

  async openJobForm()
  {
    const modal = await this.modalCtrl.create({
      component : JobFormComponent
    });

    await modal.present();
    
    const {data} = await modal.onDidDismiss();

    if(data)
    {
      console.log('Gelen veri', data);
    }
  }
}
