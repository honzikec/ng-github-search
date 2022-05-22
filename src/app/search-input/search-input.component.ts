import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ghs-search-input',
  templateUrl: './search-input.component.html',
  styleUrls: ['./search-input.component.scss']
})
export class SearchInputComponent implements OnInit {

  public searchQuery = '';

  constructor() { }

  ngOnInit(): void {
  }

}
