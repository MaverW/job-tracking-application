import { Injectable } from '@angular/core';
import { getAuth } from 'firebase/auth';
import { addDoc, collection, getFirestore } from 'firebase/firestore';
import { app } from 'src/firebaseConfig';

@Injectable({
  providedIn: 'root',
})

export class Report {

  private db = getFirestore(app);
  private auth = getAuth(app);

  async addDailyReport(data : any)
  {
    const user = this.auth.currentUser;

    if(!user)
    {
      throw new Error('Kullanıcı giriş yapmamış ! ');
    }

    return await addDoc(collection(this.db, 'dailyReports'),{
      userId : user.uid,
      montajSayisi : data.montajSayisi,
      arizaSayisi : data.arizaSayisi,
      kullanilanMalzemeler: data.kullanilanMalzemeler,
      not: data.not,
      date : new Date().toISOString().split('T')[0],
      createdAt : new Date()
    });
  }
}
