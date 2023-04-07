import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from '../../app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CustomersListComponent } from 'src/app/pages/customers-list/customers-list.component';
import { CustomersFormComponent } from 'src/app/pages/customers-form/customers-form.component';



@NgModule({
  declarations: [],
  imports: [
    CommonModule, BrowserModule, AppRoutingModule, HttpClientModule, FormsModule, ReactiveFormsModule
  ]
})
export class CustomerLayoutModule { }
