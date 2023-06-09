import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, tap } from 'rxjs';
import { Customer } from './customer/customer';
import { CustomerService } from './customer/customer.service';

export interface UserDetails {
  _id: string;
  email: string;
  name: string;
  cin: string;
  role: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUri: string;

  constructor(private http: HttpClient, private customerService: CustomerService) {
    this.baseUri = 'http://localhost:8080';
  }

  login(email: string, password: string): Observable<Customer> {
    return this.http.post(this.baseUri + "/users/login", { email: email, password: password });
  }

  logout(): Observable<void> {
    return this.http.get(this.baseUri + "/users/logout").pipe(map(() => { localStorage.removeItem("user-email") }));
  }

  private getStorage(): string {
    return localStorage.getItem("user-email")!;
  }



  public isLoggedIn(): boolean {
    const userEmail = this.getStorage();
    console.log(localStorage.getItem("user-email"));

    if (userEmail && userEmail !== null) {
      return true;
    } else {
      return false;
    }
  }

  public getUserDetails(): Customer {
    return JSON.parse(localStorage.getItem("user-info") || "")
  }

}
