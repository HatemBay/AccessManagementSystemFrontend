import { AuthService } from '../../services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ChangeDetectorRef, Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { map, tap } from 'rxjs';
import { CustomerService } from 'src/app/services/customer/customer.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  email: string = "";
  password: string = "";
  snackBar: any;
  errorMessage: string = "";
  hasError: boolean = false;
  loginForm: any;
  constructor(private router: Router, private route: ActivatedRoute, private customerService: CustomerService,
    private authService: AuthService, private cdRef: ChangeDetectorRef, private fb: FormBuilder) {
    if (localStorage.getItem("user-info")) {
      const userInfo = authService.getUserDetails();
      if (userInfo && userInfo !== null) {
        if (userInfo.role === "ADMIN")
          this.router.navigateByUrl("/dashboard")
        else if (userInfo.role === "CUSTOMER") {
          this.router.navigateByUrl("/customer-dashboard")
        }
      }
    }
  }

  ngOnInit() {
    // if (this.authService.isLoggedIn()) {
    //   this.router.navigate(["dashboard"]);
    // }
    this.loginForm = this.fb.group({
      email: ["", Validators.required],
      password: ["", Validators.required],
    });
    this.loginForm.valueChanges.subscribe((data: any) =>
      this.onLoginFormValueChange(data)
    );
  }

  // save changes in credentials
  private onLoginFormValueChange(data: any): void {
    this.email = data.email;
    this.password = data.password;
  }

  public login(): void {
    // sessionStorage.removeItem("app.token");
    this.authService.login(this.email, this.password).pipe(tap(() => { localStorage.setItem("user-email", this.email) }))
      .subscribe((resultData: any) => {
        console.log(this.email);

        if (resultData.message === "Email does not exist") {

          alert("Email does not exist");

        }
        else if (resultData.message === "Login Success") {
          this.customerService.findByEmail(this.email).subscribe(data => {
            localStorage.setItem("user-info", JSON.stringify(data));
            if (data.role === "ADMIN") {
              this.router.navigateByUrl("/dashboard")
            } else if (data.role === "CUSTOMER") {
              this.router.navigateByUrl("/customer-dashboard")
            }
          })
        }
        else {
          alert("Incorrect Email or Password");
        }

      },
        (err) => {
          console.log(err);
          this.cdRef.detectChanges();
        });
  }

}
