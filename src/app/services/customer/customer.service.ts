import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Customer } from './customer';
import { Observable } from 'rxjs';

@Injectable()
export class CustomerService {
  private baseUri: string;

  constructor(private http: HttpClient) {
    this.baseUri = 'http://localhost:8080/users';
  }

  public findById(id: number): Observable<Customer> {
    return this.http.get(`${this.baseUri}/${id}`);
  }
  public findByEmail(email: string): Observable<Customer> {
    return this.http.get(`${this.baseUri}/email/${email}`);
  }
  public update(customer: Customer, id: number) {
    return this.http.put(`${this.baseUri}/${id}`, customer);
  }
  public findAll(): Observable<Customer[]> {
    // return this.http.get<Customer[]>(`${this.baseUri}`);
    return this.http.get<Customer[]>(this.baseUri + '/get-all');
  }

  public save(customer: Customer) {
    return this.http.post<Customer>(this.baseUri + '/new', customer);
  }

  public delete(customer: Customer) {
    return this.http.delete<Customer>(`${this.baseUri}/delete/${customer.id}`);
  }
}
