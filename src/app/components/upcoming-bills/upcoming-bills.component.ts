import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Bill {
  title: string;
  amount: number;
  category: string;
  dueDate: string;
  urgent: boolean;
  important: boolean;
}

@Component({
  selector: 'app-upcoming-bills',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="bg-white p-6 rounded-lg shadow-sm">
      <h2 class="text-lg font-semibold mb-4">Upcoming Bills</h2>
      <div class="space-y-4">
        <div *ngFor="let bill of bills" class="bg-gray-50 p-4 rounded">
          <div class="flex justify-between items-start mb-2">
            <div>
              <h3 class="font-semibold">{{ bill.title }}</h3>
              <p class="text-sm text-gray-600">{{ bill.amount | currency:'USD':'symbol' }} - {{ bill.category }}</p>
              <p class="text-sm text-gray-600">Due: {{ bill.dueDate }}</p>
              <div class="flex gap-2 mt-1">
                <span *ngIf="bill.urgent" class="px-2 py-0.5 text-xs bg-red-100 text-red-800 rounded">Urgent</span>
                <span *ngIf="bill.important" class="px-2 py-0.5 text-xs bg-blue-100 text-blue-800 rounded">Important</span>
              </div>
            </div>
            <button 
              class="bg-black text-white px-3 py-1 rounded text-sm hover:bg-gray-800"
              (click)="markPaid(bill)"
            >
              Mark Paid
            </button>
          </div>
        </div>
      </div>
    </div>
  `
})
export class UpcomingBillsComponent {
  bills: Bill[] = [
    {
      title: 'Rent',
      amount: 1000,
      category: 'Housing',
      dueDate: '6/1/2023',
      urgent: true,
      important: true
    },
    {
      title: 'Electricity',
      amount: 50,
      category: 'Utilities',
      dueDate: '6/15/2023',
      urgent: false,
      important: true
    }
  ];

  markPaid(bill: Bill) {
    this.bills = this.bills.filter(b => b !== bill);
  }
}
