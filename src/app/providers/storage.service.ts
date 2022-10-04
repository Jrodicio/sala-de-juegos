import { Injectable } from '@angular/core';
import { Storage, ref, uploadBytes,  getDownloadURL ,deleteObject } from '@angular/fire/storage';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor( private storage: Storage ) { }

  subirImagenPerfil(file: File, fileName: string){
    const imgRef = ref(this.storage, `images/profiles/${fileName}`);
    return uploadBytes(imgRef, file);
  }

  getURLProfile(fileName: string){
    const imgRef = ref(this.storage, `images/profiles/${fileName}`);
    return getDownloadURL(imgRef);
  }

}
