import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Pokemon} from "./models";

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(private http: HttpClient) {}

  private baseUrl = "https://pokeapi.co/api/v2";

  public getPokemon(id: number): Observable<Pokemon> {
    return this.http.get<Pokemon>(this.baseUrl+"/pokemon/"+id);
  }

  public getPokemonList(limit: number = 10, offset: number = 0): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/pokemon?limit=${limit}&offset=${offset}`);
  }
}
