import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  search(keyword: string){
    console.log(`search for products by value : ${keyword}`);
    this.router.navigateByUrl(`/search/${keyword}`);
  }

}