import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, map } from 'rxjs';
import { AuthService } from './auth.service';
import { CustomerService } from './customer/customer.service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {
  role: any;
  constructor(private router: Router, private authService: AuthService, private customerService: CustomerService) { }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | boolean {

    const email = localStorage.getItem("user-email");
    if (email !== null) {
      const expectedRole = route.data.expectedRole;
      return this.customerService.findByEmail(email).pipe(map(data => {
        if (expectedRole == JSON.parse(JSON.stringify(data)).role) {
          return true;
        }
        this.router.navigateByUrl('/forbidden');
        return false;
      }));
    }
    return false;
  }
}
