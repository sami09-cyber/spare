import { Component } from '@angular/core';

@Component({
  selector: 'app-spare',
  templateUrl: './spare.component.html',
  styleUrl: './spare.component.css'
})
export class SpareComponent {
  balance: number = 0;

  updateBalance(newBalance: number): void {
    this.balance = newBalance;
  }
}

