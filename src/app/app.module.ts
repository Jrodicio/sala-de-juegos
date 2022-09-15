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
import { AngularFireModule } from '@angular/fire/compat';

import { AuthService } from './providers/auth.service';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { NotFoundComponent } from './Vistas/not-found/not-found.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    QuienSoyComponent,
    FooterComponent,
    HeaderComponent,
    RegistroComponent,
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireAuthModule,
    AngularFireModule.initializeApp(environment.firebase),
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
