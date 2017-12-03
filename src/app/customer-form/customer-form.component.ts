import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

import { CityService } from '../Services/City-Service';
import { Customer } from '../models/customer';
import { CustomerService } from '../Services/Customer-Service';
import { AppValidators } from '../app-validators';


@Component({
  selector: 'app-customer-form',
  templateUrl: './customer-form.component.html',
  styleUrls: ['./customer-form.component.css']
})
export class CustomerFormComponent implements OnInit {
  // Citylist and CustomerList array
  cityList: string[] = [];
  customerList: Customer[] = [];
  // customer instance
  customer: Customer =  new Customer();
  form: FormGroup;
  @Input() showDetail = false;
  // constructor dependency injection
  constructor(private cityService: CityService, private formBuilder: FormBuilder, private customerService: CustomerService) {
    this.createForm();
  }
  // validating the form using formbuilder
  private createForm() {
    this.form = this.formBuilder.group({
      name: ['', Validators.compose( [Validators.required, Validators.pattern('[A-Za-z]*')])],
      phone: ['', Validators.compose([Validators.required, Validators.pattern('[0-9]*'), AppValidators.onlyThreeDigitsAllowed])],
      email: ['', Validators.required],
      city: ['', Validators.required]
    });
  }
  // initializing the form on ngOnInit and calling the service
  ngOnInit() {
  this.customer.name = '';
  this.customer.email = '';
  this.customer.phone = 0;
  this.cityList = this.cityService.getCityList();
  this.customerList = this.customerService.getCustomerList();
  }
  // on form submit calling the onSave method to add a customer using Customer Service
  onSave(Values) {
    this.customer.name = Values.name;
    this.customer.email = Values.email;
    this.customer.phone = Values.phone;
    this.customer.city = Values.city;
    this.customerService.storeCustomer(this.customer);
    this.customer = new Customer();
    this.showDetail = true;
    }
  }


