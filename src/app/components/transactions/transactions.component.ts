import {Component, OnInit} from '@angular/core';
import {
  Account,
  Balance,
  ExchangeTokenResponse,
  LinkResponse,
  Transaction,
  TransactionResponse
} from "../../models/models";
import {ApiPlaidService} from "../../service/api-plaid.service";

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrl: './transactions.component.css'
})
export class TransactionsComponent implements OnInit {
  isLoading: boolean = false;
  search: string = '';
  selectedAccount: string = 'all';
  startDate: string = '2023-01-01';
  endDate: string = '2023-12-31';
  sortField: string = 'date';
  sortDirection: string = 'asc';
  accounts: Account[] = [];
  transactions: Transaction[] = [];
  total_transactions: number = 0

  constructor(private apiPlaidService: ApiPlaidService) { }

  ngOnInit(): void {
    this.loadTransactions();
  }

  // get filteredTransactions(): Transaction[] {
  //   // let filtered = [...this.transactions];
  //   //
  //   // if (this.search.trim()) {
  //   //   filtered = filtered.filter(transaction =>
  //   //     transaction.name.toLowerCase().includes(this.search.toLowerCase())
  //   //   );
  //   // }
  //   //
  //   // if (this.selectedAccount && this.selectedAccount !== 'all') {
  //   //   filtered = filtered.filter(transaction => transaction.account_id === this.selectedAccount);
  //   // }
  //   //
  //   // if (this.startDate) {
  //   //   filtered = filtered.filter(transaction => new Date(transaction.date) >= new Date(this.startDate));
  //   // }
  //   //
  //   // if (this.endDate) {
  //   //   filtered = filtered.filter(transaction => new Date(transaction.date) <= new Date(this.endDate));
  //   // }
  //   //
  //   // filtered.sort((a, b) => {
  //   //   let compare = 0;
  //   //
  //   //   if (this.sortField === 'date') {
  //   //     compare = new Date(a.date).getTime() - new Date(b.date).getTime();
  //   //   } else if (this.sortField === 'name') {
  //   //     compare = a.name.localeCompare(b.name);
  //   //   } else if (this.sortField === 'amount') {
  //   //     compare = a.amount - b.amount;
  //   //   }
  //   //
  //   //   return this.sortDirection === 'asc' ? compare : -compare;
  //   // });
  //   //
  //   // return filtered;
  //   console.log("Test")
  // }

  sortBy(field: string): void {
    if (this.sortField === field) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortField = field;
      this.sortDirection = 'asc';
    }
  }

  getAccountName(accountId: string): string {
    const account = this.accounts.find(acc => acc.account_id === accountId);
    return account ? account.name : 'Inconnu';
  }

  loadTransactions(): void {
    this.isLoading = true;
    this.apiPlaidService.getTransactions(this.startDate, this.endDate)
      .subscribe({
        next: (response: TransactionResponse) => {
          console.log('Transaction: ', response);
          this.transactions = response.transactions;
          this.accounts = response.accounts
          this.total_transactions = response.total_transactions
          this.isLoading = false;
        },
        error: (error) => {
          console.error('Erreur lors de la récupération des transactions :', error);
          this.isLoading = false;
        }
      });
  }
}
