import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BalanceComponent } from './components/balance/balance.component';
import { ExpenseFormComponent } from './components/expense-form/expense-form.component';
import { UpcomingBillsComponent } from './components/upcoming-bills/upcoming-bills.component';
import { CalendarComponent } from './components/calendar/calendar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    BalanceComponent,
    ExpenseFormComponent,
    UpcomingBillsComponent,
    CalendarComponent
  ],
  template: `
    <div class="container mx-auto max-w-6xl px-4 py-8">
      <h1 class="text-2xl font-bold text-center mb-8">Money Manager</h1>
      
      <div class="grid grid-cols-1 md:grid-cols-[1fr_300px] gap-4">
        <div class="space-y-4">
          <app-balance></app-balance>
          <app-expense-form></app-expense-form>
          <app-upcoming-bills></app-upcoming-bills>
        </div>
        <app-calendar></app-calendar>
      </div>
    </div>
  `,
  styles: [`
    :host {
      display: block;
      min-height: 100vh;
      background-color: #f8f9fa;
    }
  `]
})
export class AppComponent {
  title = 'Money Manager';
}