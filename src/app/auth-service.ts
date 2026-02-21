import { Injectable } from '@angular/core';
import { app } from 'src/firebaseConfig';
import { getAuth } from 'firebase/auth';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { signOut } from 'firebase/auth';
import { onAuthStateChanged } from 'firebase/auth';
import { User } from 'firebase/auth';
import { getFirestore, doc, setDoc, addDoc, collection, serverTimestamp } from "firebase/firestore";
import { JobStatus } from './job-status.enum';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  private auth = getAuth(app);
  private db = getFirestore(app);

  async register(email : string, password : string, name : string)
  {
    const userCredential = await createUserWithEmailAndPassword(this.auth, email, password);
  
    const user = userCredential.user;
    
    await setDoc(doc(this.db, 'users', user.uid),
    {
      uid : user.uid,
      email : user.email,
      name : name,
      role : 'user',
      createdAt : new Date()
    })

    return user;
  }

  async addJob(jobName: string, address: string, contactInfo: string, note: string, assignedTo: string)
  {
    await addDoc(collection(this.db, 'jobs'), {
      jobName: jobName,
      address: address,
      contactInfo: contactInfo,
      note: note,
      assignedTo: assignedTo,
      status: JobStatus.Pending,
      createdAt: serverTimestamp()
    });
  }

  login(email : string, password : string)
  {
    return signInWithEmailAndPassword(this.auth, email, password)
  }

  logout()
  {
    return signOut(this.auth);
  }

  async getCurrentUser()
  {
    const auth = getAuth();
    return auth.currentUser;
  }

  
  
}
