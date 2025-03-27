import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {BehaviorSubject, catchError, Observable, of, switchMap, tap} from "rxjs";
import {Account, BalanceResponse, environment, TransactionResponse} from "../models/models";

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = "https://sandbox.plaid.com/"
  private accessToken = new BehaviorSubject<string | null>(null)
  private accounts = new BehaviorSubject<Account[]>([])


  constructor(private http: HttpClient) {
    const storedToken = localStorage.getItem("plaid_access_token")

    if (storedToken) {
      this.accessToken.next(storedToken)
      this.fetchAccounts().subscribe()
    }
  }

  createLinkToken(): Observable<{ link_token: string }> {
    const body = {
      client_id: environment.plaidClientId,
      secret: environment.plaidSecret,
      institution_id: "ins_20",
      initial_products: ["transactions"],
      "options": {
        "webhook": "https://www.plaid.com/webhook"
      }
    }

    return this.http.post<{ link_token: string }>(`${this.baseUrl}sandbox/public_token/create`, body)
  }

  exchangePublicToken(publicToken: string): Observable<string> {
    const body = {
      client_id: environment.plaidClientId,
      secret: environment.plaidSecret,
      public_token: publicToken,
    }

    return this.http.post<any>(`${this.baseUrl}/item/public_token/exchange`, body).pipe(
      tap((response) => {
        const token = response.access_token
        this.accessToken.next(token)
        localStorage.setItem("plaid_access_token", token)
      }),
      switchMap(() => this.fetchAccounts()),
      switchMap(() => of(this.accessToken.value as string)),
    )
  }

  getBalances(): Observable<any> {
    if (!this.accessToken.value) {
      return of({ transactions: [], item: null, total_transactions: 0, request_id: "" })
    }

    const body = {
      client_id: environment.plaidClientId,
      secret: environment.plaidSecret,
      access_token: this.accessToken.value
    }
    return this.http.post<{ link_token: string }>(`${this.baseUrl}/accounts/balance/get`, body)
  }


  fetchAccounts(): Observable<Account[]> {
    if (!this.accessToken.value) {
      return of([])
    }

    const body = {
      client_id: environment.plaidClientId,
      secret: environment.plaidSecret,
      access_token: this.accessToken.value,
    }

    return this.http.post<BalanceResponse>(`${this.baseUrl}/accounts/balance/get`, body).pipe(
      tap((response) => {
        this.accounts.next(response.accounts)
      }),
      catchError((error) => {
        console.error("Error fetching accounts", error)
        return of([])
      }),
      switchMap(() => of(this.accounts.value)),
    )
  }

  getTransactions(startDate: string, endDate: string): Observable<any> {
    if (!this.accessToken.value) {
      return of({ transactions: [], item: null, total_transactions: 0, request_id: "" })
    }

    const body = {
      client_id: environment.plaidClientId,
      secret: environment.plaidSecret,
      access_token: this.accessToken.value,
      start_date: startDate,
      end_date: endDate,
    }

    return this.http.post<TransactionResponse>(`${this.baseUrl}/transactions/get`, body)
  }

  // Get current accounts
  getAccounts(): Observable<Account[]> {
    return this.accounts.asObservable()
  }

  // Check if user is connected to Plaid
  isConnected(): Observable<boolean> {
    return this.accessToken.pipe(switchMap((token) => of(!!token)))
  }

  // Disconnect from Plaid
  disconnect(): void {
    localStorage.removeItem("plaid_access_token")
    this.accessToken.next(null)
    this.accounts.next([])
  }

}
