import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Demand } from './demand';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DemandService {
  private baseUri: string;

  constructor(private http: HttpClient) {
    this.baseUri = 'http://localhost:8080/demands';
  }

  public findById(id: number): Observable<Demand> {
    return this.http.get(`${this.baseUri}/${id}`);
  }
  public update(demand: Demand, id: number) {
    return this.http.put(`${this.baseUri}/${id}`, demand);
  }
  public findAll(): Observable<Demand[]> {
    // return this.http.get<Demand[]>(`${this.baseUri}`);
    return this.http.get<Demand[]>(this.baseUri + '/get-all');
  }
  public findAllByUserId(userId: number): Observable<Demand[]> {
    // return this.http.get<Demand[]>(`${this.baseUri}`);
    return this.http.get<Demand[]>(this.baseUri + '/get-all/user/' + userId);
  }
  public save(demand: Demand) {
    return this.http.post<Demand>(this.baseUri + '/new', demand);
  }

  public delete(demand: Demand) {
    return this.http.delete<Demand>(`${this.baseUri}/delete/${demand.id}`);
  }
}
