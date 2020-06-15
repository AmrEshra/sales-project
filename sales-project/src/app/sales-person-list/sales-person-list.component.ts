import { Component, OnInit } from '@angular/core';
import { SalesPerson } from './SalesPerson';

@Component({
  selector: 'app-sales-person-list',
  templateUrl: './sales-person-list.component.html',
  styleUrls: ['./sales-person-list.component.css']
})
export class SalesPersonListComponent implements OnInit {

   person1 = new SalesPerson(`Amr`, `Ali`, `amr@gmail.com`, 2000);
   person2 = new SalesPerson(`Ola`, `Magdy`, `ola@gmail.com`, 6000);
   
   // create an array of objects
  salesPersonList: SalesPerson[] = [
    this.person1,
    this.person2
  ];


  constructor() { }

  ngOnInit(): void {
  }

}
