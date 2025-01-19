import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-expense-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="bg-white p-6 rounded-lg shadow-sm">
      <h2 class="text-lg font-semibold mb-4">Add Future Expense</h2>
      <form (ngSubmit)="onSubmit()" class="space-y-4">
        <div>
          <label class="block text-sm mb-1">Description</label>
          <input 
            type="text" 
            [(ngModel)]="expense.description" 
            name="description"
            class="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
        </div>

        <div>
          <label class="block text-sm mb-1">Amount</label>
          <input 
            type="number" 
            [(ngModel)]="expense.amount" 
            name="amount"
            class="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
        </div>

        <div>
          <label class="block text-sm mb-1">Category</label>
          <input 
            type="text" 
            [(ngModel)]="expense.category" 
            name="category"
            class="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
        </div>

        <div>
          <label class="block text-sm mb-1">Due Date</label>
          <input 
            type="date" 
            [(ngModel)]="expense.dueDate" 
            name="dueDate"
            class="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
        </div>

        <div class="flex gap-4">
          <label class="flex items-center">
            <input 
              type="checkbox" 
              [(ngModel)]="expense.urgent" 
              name="urgent"
              class="mr-2"
            >
            Urgent
          </label>
          <label class="flex items-center">
            <input 
              type="checkbox" 
              [(ngModel)]="expense.important" 
              name="important"
              class="mr-2"
            >
            Important
          </label>
        </div>

        <button 
          type="submit"
          class="w-full bg-black text-white p-2 rounded hover:bg-gray-800"
        >
          Add Expense
        </button>
      </form>
    </div>
  `
})
export class ExpenseFormComponent {
  expense = {
    description: '',
    amount: 0,
    category: '',
    dueDate: '',
    urgent: false,
    important: false
  };

  onSubmit() {
    console.log('Expense submitted:', this.expense);
    // Add your submission logic here
  }
}