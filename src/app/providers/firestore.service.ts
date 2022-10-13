import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc, collectionData, doc, setDoc, getDoc } from '@angular/fire/firestore';
import { Fecha } from '../Entidades/fecha';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  constructor(private firestore: Firestore) {

  }

  addDataLogTS(collectionName: string, data: any){
    const dataRef = collection(this.firestore, collectionName);
    const fecha = new Fecha(new Date);

    return addDoc(dataRef,{data: data, ts: fecha.toNumber()});
  }

  addData(collectionName: string, data: any){
    const dataRef = collection(this.firestore, collectionName);
    return addDoc(dataRef,data);
  }

  setDocument(collectionName: string, documentId: string, data: any){
    const docRef = doc(this.firestore, collectionName+"/"+documentId);
    return setDoc(docRef, data);
  }

  getDocuments(collectionName: string){
    const dataRef = collection(this.firestore, collectionName);
    return collectionData(dataRef, {idField: 'id'});
  }

  getDocument(collectionName: string, documentId: string){
    const docRef = doc(this.firestore, collectionName+"/"+documentId);
    return getDoc(docRef);
  }

  getUsuarioByUID(uid: string){
    return this.getDocument('users', uid);
  }
}
