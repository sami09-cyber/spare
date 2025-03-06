import {Component, OnInit} from '@angular/core';
import {EnrichedAccount} from "../../models/models";
import {ApiService} from "../../service/api.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrl: './account.component.css'
})
export class AccountComponent implements OnInit {
  accounts: EnrichedAccount[] = []
  loading = false
  error = ""

  constructor(private apiService: ApiService, private router: Router) {}

  ngOnInit(): void {
    this.loadAccounts()
  }

  loadAccounts(): void {
    this.loading = true
    this.error = ""

    const requisitionId = localStorage.getItem("requisition_id")
    if (!requisitionId) {
      this.error = "Aucune connexion bancaire trouvée"
      this.loading = false
      return
    }

    this.apiService.getAccounts(requisitionId).subscribe({
      next: (accounts) => {
        if (accounts.length === 0) {
          this.error = "Aucun compte bancaire trouvé"
          this.loading = false
          return
        }

        // Load details for each account
        const accountPromises = accounts.map((account) => {
          return new Promise<EnrichedAccount>((resolve, reject) => {
            this.apiService.getAccountDetails(account.id).subscribe({
              next: (details) => {
                resolve({
                  id: account.id,
                  name: details.account.name || "Compte",
                  iban: details.account.iban || "N/A",
                  balance: details.balances?.[0]?.balanceAmount?.amount || "0",
                  currency: details.balances?.[0]?.balanceAmount?.currency || "EUR",
                })
              },
              error: (err) => {
                console.error("Error fetching account details:", err)
                reject(err)
              },
            })
          })
        })

        Promise.all(accountPromises)
          .then((enrichedAccounts) => {
            this.accounts = enrichedAccounts
            this.loading = false
          })
          .catch((err) => {
            this.error = "Erreur lors de la récupération des détails des comptes"
            this.loading = false
          })
      },
      error: (err) => {
        this.error = "Erreur lors de la récupération des comptes"
        this.loading = false
        console.error(err)
      },
    })
  }

  viewTransactions(accountId: string) {
    this.router.navigate(["/transactions", accountId])
  }

  reconnectBank() {
    this.router.navigate(["/"])
  }
}
