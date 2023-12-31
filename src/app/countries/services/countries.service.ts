import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { Country } from '../interfaces/country';

@Injectable({ providedIn: 'root' })
export class CountriesService {
  private url = 'https://restcountries.com/v3.1';

  constructor(private httpClient: HttpClient) {}

  searchCountryByAlfaCode(code: string): Observable<Country | null> {
    const url = `${this.url}/alpha/${code}`;

    return this.httpClient.get<Country[]>(url).pipe(
      map((countries) => (countries.length > 0 ? countries[0] : null)),
      catchError((error) => of(null))
    );
  }

  searchCapital(term: string): Observable<Country[]> {
    const url = `${this.url}/capital/${term}`;

    return this.httpClient
      .get<Country[]>(url)
      .pipe(catchError((error) => of([])));
  }

  searchCountry(term: string): Observable<Country[]> {
    const url = `${this.url}/name/${term}`;

    return this.httpClient
      .get<Country[]>(url)
      .pipe(catchError((error) => of([])));
  }

  searchRegion(region: string): Observable<Country[]> {
    const url = `${this.url}/region/${region}`;
    return this.httpClient
      .get<Country[]>(url)
      .pipe(catchError((error) => of([])));
  }
}
