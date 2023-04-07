import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  name: string = "";
  email: string = "";
  password: string = "";
  cin: string = "";


  constructor(private http: HttpClient) {

  }
  save() {

    // cin to be changed to a dynamic value
    let bodyData = {
      "name": this.name,
      "email": this.email,
      "password": this.password,
      "cin": "12332112"
    };
    this.http.post("http://localhost:8080/customers/new", bodyData, { responseType: 'text' }).subscribe((resultData: any) => {
      console.log(resultData);
      alert("Employee Registered Successfully");
    }, (err) => {
      console.log(err);
    });
    ;
  }

}
