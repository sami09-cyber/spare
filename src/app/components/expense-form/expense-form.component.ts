import { Component } from '@angular/core';
import {AuthenticationService} from "../../service/authentication.service";
import {Router} from "@angular/router";
import {User} from "@angular/fire/auth";

@Component({
  selector: 'app-expense-form',
  templateUrl: './expense-form.component.html',
  styleUrl: './expense-form.component.css'
})
export class ExpenseFormComponent {
  categories = ['Food', 'Transport', 'Entertainment', 'Health', 'Education', 'Housing', 'Other'];
  expense = {
    title: '',
    amount: 0,
    category: '',
    dueDate: '',
    urgent: false,
    important: false
  };

  constructor(private authenticationService: AuthenticationService) {}

  onSubmit() {
    console.log('Expense submitted:', this.expense);
    this.addData("expense", this.expense);
  }

  addData(collectionName: string, data: any) {
    this.authenticationService.addData(collectionName, data).then(r => console.log('Data added successfully! ', r));
  }
}
