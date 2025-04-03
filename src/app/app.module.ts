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
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { SpareComponent } from './components/spare/spare.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { HeroComponent } from './components/hero/hero.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { FooterComponent } from './components/footer/footer.component';
import {HttpClientModule} from "@angular/common/http";
import { ChatbotComponent } from './components/chatbot/chatbot.component';
import { TransactionsComponent } from './components/transactions/transactions.component';

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
    FeatureComponent,
    ForgotPasswordComponent,
    SpareComponent,
    NavigationComponent,
    HeroComponent,
    DashboardComponent,
    FooterComponent,
    ChatbotComponent,
    TransactionsComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
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
