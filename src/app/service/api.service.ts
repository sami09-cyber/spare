import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {catchError, map, Observable, tap, throwError} from "rxjs";
import {Account, environment, Institution, NordigenToken, RequisitionResponse, Transaction} from "../models/models";

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  // constructor(private http: HttpClient) {}

  // private baseUrl = "https://pokeapi.co/api/v2";
  private baseUrl = "https://bankaccountdata.gocardless.com/api/v2/"
  private token: NordigenToken | null = null


  constructor(private http: HttpClient) {
    const savedToken = localStorage.getItem("nordigen_token")
    if (savedToken) {
      this.token = JSON.parse(savedToken)
    }
  }

  private getHeaders(): HttpHeaders {
    if (!this.token) {
      throw new Error("No authentication token available")
    }

    return new HttpHeaders({
      "Content-Type": "application/json",
      Authorization: `Bearer ${this.token.access}`,
    })
  }

  authenticate(): Observable<NordigenToken> {
    const body = {
      secret_id: environment.nordigenSecretId,
      secret_key: environment.nordigenSecretKey,
    }

    return this.http.post<NordigenToken>(`${this.baseUrl}/token/new/`, body).pipe(tap((token) => {
        this.token = token
        localStorage.setItem("nordigen_token", JSON.stringify(token))
        console.log('Token: ',token)
      }), catchError((error) => {
        console.error("Authentication error:", error)
        return throwError(() => new Error("Failed to authenticate with Nordigen API"))
      })
    )
  }

  getInstitutions(country: string): Observable<Institution[]> {
    return this.http
      .get<Institution[]>(`${this.baseUrl}/institutions/?country=${country}`, { headers: this.getHeaders() })
      .pipe(
        tap((response) => {
          console.log('Institution: ', response)
        }),
        catchError((error) => {
          console.error("Error fetching institutions:", error)
          return throwError(() => new Error("Failed to fetch institutions"))
        }),
      )
  }

  createRequisition(institutionId: string, redirect: string, reference: string): Observable<RequisitionResponse> {
    const body = {
      redirect: redirect,
      institution_id: institutionId,
      reference: reference,
      agreement: "",
      user_language: "FR",
    }

    return this.http
      .post<RequisitionResponse>(`${this.baseUrl}/requisitions/`, body, { headers: this.getHeaders() })
      .pipe(
        catchError((error) => {
          console.error("Error creating requisition:", error)
          return throwError(() => new Error("Failed to create requisition"))
        }),
      )
  }

  getAccounts(requisitionId: string): Observable<Account[]> {
    return this.http
      .get<{ accounts: string[] }>(`${this.baseUrl}/requisitions/${requisitionId}/`, { headers: this.getHeaders() })
      .pipe(
        map((response) => {
          return response.accounts.map((accountId) => {
            return {
              id: accountId,
              iban: "", // These will be populated when fetching account details
              institution_id: "",
              status: "",
            }
          })
        }),
        catchError((error) => {
          console.error("Error fetching accounts:", error)
          return throwError(() => new Error("Failed to fetch accounts"))
        }),
      )
  }

  getAccountDetails(accountId: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/accounts/${accountId}/details/`, { headers: this.getHeaders() }).pipe(
      catchError((error) => {
        console.error("Error fetching account details:", error)
        return throwError(() => new Error("Failed to fetch account details"))
      }),
    )
  }

  getTransactions(accountId: string): Observable<Transaction[]> {
    return this.http
      .get<any>(`${this.baseUrl}/accounts/${accountId}/transactions/`, { headers: this.getHeaders() })
      .pipe(
        map((response) => {
          const transactions = response.transactions.booked || []
          return transactions.map((tx: any) => ({
            id: tx.transactionId,
            amount: tx.transactionAmount.amount,
            bookingDate: tx.bookingDate,
            valueDate: tx.valueDate,
            creditorName: tx.creditorName,
            debtorName: tx.debtorName,
            remittanceInformationUnstructured: tx.remittanceInformationUnstructured,
          }))
        }),
        catchError((error) => {
          console.error("Error fetching transactions:", error)
          return throwError(() => new Error("Failed to fetch transactions"))
        }),
      )
  }






  // public getPokemon(id: number): Observable<Pokemon> {
  //   return this.http.get<Pokemon>(this.baseUrl+"/pokemon/"+id);
  // }
  //
  // public getPokemonList(limit: number = 10, offset: number = 0): Observable<any> {
  //   return this.http.get<any>(`${this.baseUrl}/pokemon?limit=${limit}&offset=${offset}`);
  // }
}
