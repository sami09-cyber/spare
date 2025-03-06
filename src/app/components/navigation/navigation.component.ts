import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {AuthenticationService} from "../../service/authentication.service";
import {Subscription} from "rxjs";
import {User} from "@angular/fire/auth";

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.css'
})
export class NavigationComponent {
  dropdownOpen = false;
  userSubscription: Subscription;
  user: User | null = null

  constructor(private authenticationService: AuthenticationService, private router: Router) {
    this.userSubscription = this.authenticationService.getCurrentUser().subscribe((currentUser: User | null) => {
      this.user = currentUser;
      console.log('User Subscription Yes', currentUser);
    });
  }

  toggleDropdown() {
    console.log("Current User", this.user);
    this.dropdownOpen = !this.dropdownOpen;
  }

  onSignOut() {
    console.log('Déconnexion...');
    this.dropdownOpen = false;
    this.authenticationService.signOut().then(r => console.log(r));
    this.router.navigate(['/login']);
  }

}
