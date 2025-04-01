import { Injectable } from '@angular/core';
import {BehaviorSubject, catchError, map, Observable, of, switchMap, tap, timer} from "rxjs";
import {Account, BalanceResponse, environment, TransactionResponse} from "../models/models";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ApiPlaidService {
  // private baseUrl = "https://sandbox.plaid.com"
  private accessToken = new BehaviorSubject<string | null>(null)
  private accounts = new BehaviorSubject<Account[]>([])

  constructor(private http: HttpClient) {
    const storedToken = localStorage.getItem("plaid_access_token")

    if (storedToken) {
      this.accessToken.next(storedToken)
      // this.fetchAccounts().subscribe()
    }
  }

  createLinkToken(): Observable<any> {
    const body = {
      client_id: environment.plaidClientId,
      secret: environment.plaidSecret,
      institution_id: "ins_20",
      initial_products: ["transactions"],
      "options": {
        "webhook": "https://www.plaid.com/webhook"
      }
    }

    return this.http.post<any>(`/api/sandbox/public_token/create`, body)
  }

  exchangePublicToken(publicToken: string): Observable<any> {
    const body = {
      client_id: environment.plaidClientId,
      secret: environment.plaidSecret,
      public_token: publicToken,
    }

    return this.http.post<any>(`/api/item/public_token/exchange`, body).pipe(
      tap((response) => {
        const token = response.access_token
        this.accessToken.next(token)
        localStorage.setItem("plaid_access_token", token)
      }),
      // switchMap(() => this.fetchAccounts()),
      switchMap(() => of(this.accessToken.value as string)),
    )
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

    return this.http.post<BalanceResponse>(`/api/accounts/balance/get`, body).pipe(
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

  getTransactions(startDate: string, endDate: string): Observable<TransactionResponse> {
    return this.createLinkToken().pipe(
      tap(linkResponse => console.log('Le create Link Token est:', linkResponse)),
      switchMap(linkResponse => this.exchangePublicToken(linkResponse.public_token)),
      tap(exchangeResponse => console.log('Le exchange Public Token est:', exchangeResponse)),
      switchMap(exchangeResponse => timer(6000).pipe(switchMap(() => {
        const body = {
          client_id: environment.plaidClientId,
          secret: environment.plaidSecret,
          access_token: exchangeResponse,
          start_date: startDate,
          end_date: endDate,
        };

        console.log("XXXXXXTest: ", body)
        // setTimeout(() => {
        //   return this.http.post<TransactionResponse>(`/api/transactions/get`, body);
        // }, 5000)
        return this.http.post<TransactionResponse>(`/api/transactions/get`, body);
      })))
    );
  }

  getAccounts(): Observable<Account[]> {
    return this.accounts.asObservable()
  }

  isConnected(): Observable<boolean> {
    return this.accessToken.pipe(switchMap((token) => of(!!token)))
  }

  disconnect(): void {
    localStorage.removeItem("plaid_access_token")
    this.accessToken.next(null)
    this.accounts.next([])
  }
}
