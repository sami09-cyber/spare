import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import {FormsModule} from "@angular/forms";
import {BalanceComponent} from "./components/balance/balance.component";
import {CalendarComponent} from "./components/calendar/calendar.component";
import {ExpenseFormComponent} from "./components/expense-form/expense-form.component";
import {UpcomingBillsComponent} from "./components/upcoming-bills/upcoming-bills.component";
import {LoginComponent} from "./components/login/login.component";
import {SignupComponent} from "./components/signup/signup.component";
import { HomeComponent } from './components/home/home.component';
import { FeatureComponent } from './components/feature/feature.component';

@NgModule({
  declarations: [
    AppComponent,
    BalanceComponent,
    CalendarComponent,
    ExpenseFormComponent,
    UpcomingBillsComponent,
    LoginComponent,
    SignupComponent,
    HomeComponent,
    FeatureComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    provideFirebaseApp(() => initializeApp({
      "projectId": "spare-89438",
      "appId": "1:338478839189:web:e8affe86803fe8873c329c",
      "storageBucket": "spare-89438.firebasestorage.app",
      "apiKey": "AIzaSyBgjHauiBVCwfHZMuar25Z7EXjQYhmX-Ns",
      "authDomain": "spare-89438.firebaseapp.com",
      "messagingSenderId": "338478839189",
      "measurementId": "G-N7Q2DYX5FK"
    })),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
