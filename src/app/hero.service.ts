import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import {catchError, map, tap } from 'rxjs/operators';
import {HttpClient, HttpHeaders} from '@angular/common/http';

import { Hero } from './hero';
import { HEROES } from './mock-heroes';
import { MessageService } from './message.service';

const httpOptions =  { headers : new HttpHeaders({'Content-Type' : 'application/json'}) }

@Injectable()
export class HeroService {
  private heroesUrl = 'api/heroes';  // URL to web api
  
  constructor(private messageService : MessageService
              , private http : HttpClient) { }

  getHeroes() : Observable<Hero[]>{
    return this.http.get<Hero[]>(this.heroesUrl)
    .pipe(
      tap(heroes => this.log("Heroes have being fetched successfully.")),
      catchError(this.handleError('getHeroes', [])));
  }

  getHero(id : number) : Observable<Hero>{
    const url = `${this.heroesUrl}/${id}`;
    return this.http.get<Hero>(url)
    .pipe(
      tap(_ => this.log(`Hero ${id} fetched.`),
      catchError(this.handleError<Hero>(`getHero id=${id}`)))
    );
  }

  updateHero(hero : Hero) : Observable<any>{
    return this.http.put(this.heroesUrl, hero, httpOptions)
    .pipe(
      tap(_ => this.log(`Hero ${hero.id} updated.`)),
      catchError(this.handleError<any>('updateHero'))
    );
  }

  addHero(hero : Hero) :Observable<Hero>{
    return this.http.post(this.heroesUrl, hero, httpOptions)
    .pipe(
      tap((hero : Hero) => this.log(`New Hero added with ID = ${hero.id}`)),
      catchError(this.handleError<Hero>('addHero'))
    );
  }


/** DELETE: delete the hero from the server */
deleteHero (hero: Hero | number): Observable<Hero> {
  const id = typeof hero === 'number' ? hero : hero.id;
  const url = `${this.heroesUrl}/${id}`;

  return this.http.delete<Hero>(url, httpOptions).pipe(
    tap(_ => this.log(`deleted hero id=${id}`)),
    catchError(this.handleError<Hero>('deleteHero'))
  );
}

 searchHeroes(term: string): Observable<Hero[]> {
    if (!term.trim()) {
      // if not search term, return empty hero array.
      return of([]);
    }
    return this.http.get<Hero[]>(`api/heroes/?name=${term}`).pipe(
      tap(_ => this.log(`found heroes matching "${term}"`)),
      catchError(this.handleError<Hero[]>('searchHeroes', []))
    );
  }
  
  /** Log a HeroService message with the MessageService */
  private log(message: string) {
    this.messageService.addMessage('HeroService: ' + message);
  }

  /**
 * Handle Http operation that failed.
 * Let the app continue.
 * @param operation - name of the operation that failed
 * @param result - optional value to return as the observable result
 */
private handleError<T> (operation = 'operation', result?: T) {
  return (error: any): Observable<T> => {

    // TODO: send the error to remote logging infrastructure
    console.error(error); // log to console instead

    // TODO: better job of transforming error for user consumption
    this.log(`${operation} failed: ${error.message}`);

    // Let the app keep running by returning an empty result.
    return of(result as T);
  };
}
}
