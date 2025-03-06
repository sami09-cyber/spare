import {Component, OnInit} from '@angular/core';
import {Institution} from "../../models/models";
import {FormControl} from "@angular/forms";
import {ApiService} from "../../service/api.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-bank',
  templateUrl: './bank.component.html',
  styleUrl: './bank.component.css'
})
export class BankComponent implements OnInit {
  institutions: Institution[] = []
  loading = false
  error = ""
  country: string = 'FR'
  // countryControl = new FormControl("FR")
  selectedInstitution: Institution | null = null

  constructor(private apiService: ApiService, private router: Router) {}

  ngOnInit(): void {
    this.loadInstitutions()
  }

  loadInstitutions(): void {
    this.loading = true
    this.error = ""

    this.apiService.authenticate().subscribe({
      next: () => {
        this.apiService.getInstitutions(this.country || "FR").subscribe({
          next: (institutions) => {
            this.institutions = institutions
            this.loading = false
          },
          error: (err) => {
            this.error = "Impossible de charger la liste des banques"
            this.loading = false
            console.error(err)
          },
        })
      },
      error: (err) => {
        this.error = "Erreur d'authentification"
        this.loading = false
        console.error(err)
      },
    })
  }

  onCountryChange(): void {
    this.loadInstitutions()
  }

  selectInstitution(institution: Institution): void {
    this.selectedInstitution = institution
  }

  connectToBank(): void {
    if (!this.selectedInstitution) return

    this.loading = true
    const redirectUrl = window.location.origin + "/callback"
    const reference = "user_" + Date.now()

    this.apiService.createRequisition(this.selectedInstitution.id, redirectUrl, reference).subscribe({
      next: (response) => {
        // Store requisition ID in localStorage for later use
        localStorage.setItem("requisition_id", response.id)
        // Redirect to bank's authentication page
        window.location.href = response.link
      },
      error: (err) => {
        this.error = "Erreur lors de la connexion à la banque"
        this.loading = false
        console.error(err)
      },
    })
  }
}
