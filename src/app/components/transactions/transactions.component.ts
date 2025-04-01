import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Account, Transaction, TransactionResponse} from "../../models/models";
import {ApiPlaidService} from "../../service/api-plaid.service";

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrl: './transactions.component.css'
})
export class TransactionsComponent implements OnInit {
  isLoading: boolean = false;
  search: string = '';
  filter: number = 5
  selectedAccount: string = 'all';
  startDate: string = '2023-01-01';
  endDate: string = '2023-12-31';
  sortField: string = 'date';
  sortDirection: string = 'asc';
  accounts: Account[] = [];
  transactions: Transaction[] = [];
  transactionsSaving: Transaction[] = [];
  total_transactions: number = 0
  @Output() balanceEmise = new EventEmitter<any>();

  constructor(private apiPlaidService: ApiPlaidService) { }

  ngOnInit(): void {
    this.loadTransactions();
  }

  sortBy(field: 'date' | 'amount'): void {
    this.sortDirection = (this.sortField === field) ? (this.sortDirection === 'asc' ? 'desc' : 'asc') : 'asc';
    this.sortField = field;

    const compare = (a: any, b: any): number => {
      const valA = field === 'date' ? new Date(a.date).getTime() : a.amount;
      const valB = field === 'date' ? new Date(b.date).getTime() : b.amount;
      return this.sortDirection === 'asc' ? valA - valB : valB - valA;
    };

    this.transactions = [...this.transactions].sort(compare);
  }

  getAccountName(accountId: string): string {
    const account = this.accounts.find(acc => acc.account_id === accountId);
    return account ? account.name : 'Unknown';
  }

  onAccountChange(accountId: string) {
    if(accountId != 'all') {
      this.transactions = this.transactionsSaving.filter(account => account.account_id == accountId)
    } else {
      this.transactions = this.transactionsSaving
    }
  }

  onSearch(name: string) {
    console.log(name)
    if(name.trim() != '') {
      const lowerCaseName = name.toLowerCase();
      this.transactions = this.transactionsSaving.filter(transaction => transaction.name.toLowerCase().includes(lowerCaseName) || transaction.date.toLowerCase().includes(lowerCaseName))
    } else {
      this.transactions = this.transactionsSaving
    }
  }

  onAccountFilter(max: number) {
    console.log("Number: ", max)
    if(max > 0) {
      this.transactions = this.transactionsSaving.slice(0, max);
    }
  }

  loadTransactions(): void {
    this.isLoading = true;
    this.apiPlaidService.getTransactions(this.startDate, this.endDate).subscribe({
        next: (response: TransactionResponse) => {
          console.log('Transaction: ', response);
          this.transactions = response.transactions
          this.transactionsSaving = response.transactions
          this.accounts = response.accounts
          this.total_transactions = response.total_transactions
          this.onAccountFilter(this.filter)
          this.sendBalance()
          this.isLoading = false;
        },
        error: (error) => {
          console.error('Erreur lors de la récupération des transactions :', error);
          this.isLoading = false;
        }
      });
  }

  sendBalance() {
    const balance = this.transactionsSaving.reduce((acc, transaction) => acc + transaction.amount, 0);
    this.balanceEmise.emit(balance);
  }
}
