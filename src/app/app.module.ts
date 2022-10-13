import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './Vistas/login/login.component';
import { HomeComponent } from './Vistas/home/home.component';
import { QuienSoyComponent } from './Vistas/quien-soy/quien-soy.component';
import { FooterComponent } from './Vistas/footer/footer.component';
import { HeaderComponent } from './Vistas/header/header.component';
import { RegistroComponent } from './Vistas/registro/registro.component';
import { environment } from '../environments/environment';

import { NotFoundComponent } from './Vistas/not-found/not-found.component';
import { DatosJugadorComponent } from './Vistas/datos-jugador/datos-jugador.component';

import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { provideAuth,getAuth } from '@angular/fire/auth';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';
import { provideStorage,getStorage } from '@angular/fire/storage';
import { ChatComponent } from './Vistas/chat/chat.component';
import { HttpClientModule } from '@angular/common/http';
import { EncuestaComponent } from './Vistas/encuesta/encuesta.component';
import { RespuestasEncuestaComponent } from './Vistas/respuestas-encuesta/respuestas-encuesta.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    QuienSoyComponent,
    FooterComponent,
    HeaderComponent,
    RegistroComponent,
    NotFoundComponent,
    DatosJugadorComponent,
    ChatComponent,
    EncuestaComponent,
    RespuestasEncuestaComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    provideStorage(() => getStorage()),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
