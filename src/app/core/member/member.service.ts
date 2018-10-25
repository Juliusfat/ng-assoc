import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { switchMap, catchError } from 'rxjs/operators';
import { Member } from './member.model';
import { ApiService } from '../api/api.service';
import { environment } from '../../../environments/environment';
import { HttpParams } from '@angular/common/http';
import { v4 as uuid } from 'uuid';

// by Guillaume Deblock

@Injectable({
  providedIn: 'root'
})
export class MemberService {
  
  private apiURL:string = `${environment.apiUrl}/members`;
  currentUser: BehaviorSubject<Member> = new BehaviorSubject<Member>(null);
  currentUser$: Observable<Member> = this.currentUser.asObservable();

  constructor(private api: ApiService) { }

  /**
   * Get user for a specified email of null
   * @param email 
   * @returns Observable<Member|null>
   */
  private getMemberByEmail(email:string) : Observable<Member|null> {
    let params = { params: new HttpParams().set('email', email) }
    return this.api.http.get<Member[]>(this.apiURL, params).pipe(
      switchMap((results) => {
        if (results.length === 1) {
          return of(results[0]);
        } else {
          return of(null);
        }
      })
    )
  }

  /**
   * Log a member/admin in
   * @param { string } email 
   * @param { string } password 
   * @returns Promise<null>
   */
  login(email:string, password:string): Promise<Member> {
    return new Promise((resolve, reject) => {
      if (!email || !password) {
        reject('Please specify email and password');
      }
      this.getMemberByEmail(email).subscribe((result:Member|null) => {
        if (result) {          
          if (result.password === password) {
            this.currentUser.next(result);
            resolve(result);
          } else {
            reject('Mot de passe invalide.');
          }
        } else {
          reject(`Aucun membre avec correspondant à l'email ${email}.`);
        }
      })
    })      
  }
  
  /**
   * Log a member/admin out
   * @returns Promise<null>
   */
  logout(): Promise<null> {
    return new Promise(resolve => {
      this.currentUser.next(null);
      resolve();
    })
  }
  
  /**
   * Get all members
   * @returns Observable<Member[]>
   */
  getMembers(): Observable<Member[]> {
    return this.api.http.get<Member[]>(this.apiURL);
  }

  /**
   * Returning a user according to her/his id
   * @param id 
   * @returns Observable<Member|null>
   */
  getMemberById(id:string): Observable<Member|null> {
    return this.api.http.get<Member>(`${this.apiURL}/${id}`).pipe(
      catchError(err => of(null))
    );
  }

  /**
   * Update a user according to her/his id
   * @param id 
   * @param modifications 
   */
  updateUserById(id:string, modifications:{ [prop:string]:any }) : Observable<Member|null> {
    return this.api.http.patch<Member>(`${this.apiURL}/${id}`, modifications).pipe(
      catchError(() => of(null))
    );
  }

  /**
   * Adding a member
   * @param { string } firstname 
   * @param { string } lastname 
   * @param { string } email 
   * @returns Promise<Member>
   */
  addMember(firstname:string, lastname:string, email:string): Promise<Member> {
    return new Promise((resolve, reject) => {
      if (firstname && lastname && email) {
        this.api.http.post<Member>(this.apiURL, { firstname, lastname, email, id:uuid(), role:[], password:null })
          .subscribe(resolve, reject);
      } else {
        reject(`Veuillez préciser un prénom, un nom et un email.`);
      }
    })    
  }

  /**
   * delete a member according to his/her id
   * @param { string } id 
   * @returns Promise<null>
   */
  deleteMember(id:string): Promise<null> {
    return new Promise((resolve, reject) => {
      let sub = this.api.http.delete(`${this.apiURL}/${id}`).subscribe(resolve, reject, () => {        
        sub.unsubscribe();
      })
    })
    
  }

}