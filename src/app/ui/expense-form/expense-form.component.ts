import { Component } from '@angular/core';

@Component({
  selector: 'app-expense-form',
  templateUrl: './expense-form.component.html',
  styleUrl: './expense-form.component.css'
})
export class ExpenseFormComponent {
  expense = {
    description: '',
    amount: 0,
    category: '',
  };

  categories = ['Food', 'Transport', 'Entertainment', 'Health', 'Education'];

  onSubmit() {
    console.log('Expense submitted:', this.expense);
    // Add your submission logic here
  }
}
