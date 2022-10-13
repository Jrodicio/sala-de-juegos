import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { AuthService } from '../../providers/auth.service';
import { FirestoreService } from '../../providers/firestore.service';
import { User } from '@angular/fire/auth';

@Component({
  selector: 'app-encuesta',
  templateUrl: './encuesta.component.html',
  styleUrls: ['./encuesta.component.css']
})
export class EncuestaComponent implements OnInit {
  public encuestaForm: FormGroup;
  public jugador: User | null;
  public toastClass: string = 'hidden';

  constructor(
    private authService: AuthService,
    private firestore: FirestoreService,
    private formBuilder: FormBuilder,
  ) {
    this.jugador = null;

    this.authService.estaLogueado((user) =>{
      if(user){
        this.jugador = user;
      }
      else{
        this.jugador = null;
      }
    });

    this.encuestaForm = this.formBuilder.group({
      nombre: new FormControl('', Validators.compose([
        Validators.minLength(1),
        Validators.required
      ])),
      apellido: new FormControl('', Validators.compose([
        Validators.minLength(1),
        Validators.required
      ])),
      edad: new FormControl(18, Validators.compose([
        Validators.min(18),
        Validators.max(99),
        Validators.required
      ])),
      telefono: new FormControl('', Validators.compose([
        Validators.minLength(6),
        Validators.maxLength(10),
        Validators.pattern('^[0-9]*$'),
        Validators.required
      ])),

      sexo: new FormControl('', Validators.required),
      nacionalidad: new FormControl('',  Validators.required),
      nivelDiversion: new FormControl(0,  Validators.required),
      comentario: new FormControl('',  Validators.required),
      recoAhorcado: new FormControl(false, Validators.compose([
        this.recomendacionValida,
        this.sinRecomendacionesValidar
      ])),
      recoPreguntados: new FormControl(false, Validators.compose([
        this.recomendacionValida,
        this.sinRecomendacionesValidar
      ])),
      recoMayorMenor: new FormControl(false, Validators.compose([
        this.recomendacionValida,
        this.sinRecomendacionesValidar
      ])),
      recoEscapeDinosaurio: new FormControl(false, Validators.compose([
        this.recomendacionValida,
        this.sinRecomendacionesValidar
      ])),
      recoNinguno: new FormControl(true, Validators.compose([
        this.ningunaRecoValida,
        this.sinRecomendacionesValidar
      ])),
    }, {validator: this.formUpdateValidity});
  }

  ngOnInit(): void {
  }


  recomendacionValida(control: AbstractControl){
    if(control.parent?.get('recoNinguno')?.value && control.value){
      return {'recomendacionInvalid': true}
    }
    else{
      return null;
    }
  }

  ningunaRecoValida(control: AbstractControl){
    if(control.value && (control.parent?.get('recoAhorcado')?.value || control.parent?.get('recoPreguntados')?.value || control.parent?.get('recoMayorMenor')?.value || control.parent?.get('recoEscapeDinosaurio')?.value)){
      return {'recomendacionInvalid': true};
    }
    else{
      return null;
    }
  }

  sinRecomendacionesValidar(control: AbstractControl){
    if(!control.parent?.get('recoNinguno')?.value && !control.parent?.get('recoAhorcado')?.value && !control.parent?.get('recoPreguntados')?.value && !control.parent?.get('recoMayorMenor')?.value && !control.parent?.get('recoEscapeDinosaurio')?.value){
      return {'recomendacionInvalid': true};
    }
    else{
      return null
    }
  }

  formUpdateValidity(control: AbstractControl){
    control.get('recoNinguno')?.updateValueAndValidity({onlySelf: true});
    control.get('recoAhorcado')?.updateValueAndValidity({onlySelf: true});
    control.get('recoPreguntados')?.updateValueAndValidity({onlySelf: true});
    control.get('recoMayorMenor')?.updateValueAndValidity({onlySelf: true});
    control.get('recoEscapeDinosaurio')?.updateValueAndValidity({onlySelf: true});

  }

  validarForm(control: AbstractControl){
    control.updateValueAndValidity({emitEvent: false});
    if(control.valid){
      return null;
    }
    else{
      return {'isInvalid': true};
    }
  }


  cargarRespuesta(){
    this.encuestaForm.disable();
    const respuesta = {
      jugador: this.jugador?.uid,
      nombre: this.encuestaForm.controls['nombre'].value,
      apellido: this.encuestaForm.controls['apellido'].value,
      edad: this.encuestaForm.controls['edad'].value,
      telefono: this.encuestaForm.controls['telefono'].value,
      sexo: this.encuestaForm.controls['sexo'].value,
      nacionalidad: this.encuestaForm.controls['nacionalidad'].value,
      nivelDiversion: this.encuestaForm.controls['nivelDiversion'].value,
      recoAhorcado: this.encuestaForm.controls['recoAhorcado'].value,
      recoPreguntados: this.encuestaForm.controls['recoPreguntados'].value,
      recoMayorMenor: this.encuestaForm.controls['recoMayorMenor'].value,
      recoEscapeDinosaurio: this.encuestaForm.controls['recoEscapeDinosaurio'].value,
      recoNinguno: this.encuestaForm.controls['recoNinguno'].value,
      comentario: this.encuestaForm.controls['comentario'].value,
    }

    this.firestore.addDataLogTS('encuestas', respuesta)
    .then(()=>{
      this.toastClass = 'show';
      setTimeout(()=>{
        this.resetear();
        this.toastClass = 'hidden';
        this.encuestaForm.enable();
      }, 1500);
    })
    .catch(()=>console.log("Respuesta NO cargada"))
  }

  resetear(){
    this.encuestaForm.reset({
      edad: 18,
      nivelDiversion: 0,
      recoNinguno: true,
    });
  }

}
