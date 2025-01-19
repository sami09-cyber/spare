import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-balance',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="bg-white p-6 rounded-lg shadow-sm">
      <h2 class="text-lg font-semibold mb-2">Current Balance</h2>
      <p class="text-3xl font-bold">{{ balance | number:'1.2-2' }}</p>
    </div>
  `
})
export class BalanceComponent {
  balance = 1000.00;
}
