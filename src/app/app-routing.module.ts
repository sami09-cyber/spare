import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {authGuard} from "./auth.guard";
import {LoginComponent} from "./components/login/login.component";
import {SignupComponent} from "./components/signup/signup.component";
import {FeatureComponent} from "./components/feature/feature.component";
import {HomeComponent} from "./components/home/home.component";
import {ForgotPasswordComponent} from "./components/forgot-password/forgot-password.component";
import {SpareComponent} from "./components/spare/spare.component";
import {canActivate, redirectUnauthorizedTo} from "@angular/fire/auth-guard";

const redirectUnauthorizedToAuth = () => redirectUnauthorizedTo(['auth']);

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'spare', component: SpareComponent, ...canActivate(redirectUnauthorizedToAuth) },
  { path: 'features', component: FeatureComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'forgotPassword', component: ForgotPasswordComponent },
  { path: '**', redirectTo: 'home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
