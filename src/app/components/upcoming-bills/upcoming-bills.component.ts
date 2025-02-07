import { Component } from '@angular/core';
import {Bill} from "../models";

@Component({
  selector: 'app-upcoming-bills',
  templateUrl: './upcoming-bills.component.html',
  styleUrl: './upcoming-bills.component.css'
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
