import { Component } from '@angular/core';
import {Bill} from "../../models";

@Component({
  selector: 'app-upcoming-bills',
  templateUrl: './upcoming-bills.component.html',
  styleUrl: './upcoming-bills.component.css'
})
export class UpcomingBillsComponent {
  billsMocks: Bill[] = [
    {
      title: 'Rent',
      amount: 1000,
      category: 'Housing',
    },
    {
      title: 'Electricity',
      amount: 50,
      category: 'Utilities',
    }
  ];

  markPaid(bill: Bill) {
    this.billsMocks = this.billsMocks.filter(b => b !== bill);
  }
}
