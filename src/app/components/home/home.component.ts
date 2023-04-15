import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime, filter } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'front-end-internship-assignment-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  bookSearch: FormControl;
  searchedBooks: any[];

  constructor(private http: HttpClient) {
    this.bookSearch = new FormControl('');
    this.searchedBooks = [];
    
  }

  trendingSubjects: Array<any> = [
    { name: 'JavaScript' },
    { name: 'CSS' },
    { name: 'HTML' },
    { name: 'Harry Potter' },
    { name: 'Crypto' },
  ];

  
  ngOnInit(): void {
    this.bookSearch.valueChanges
    .pipe(
      debounceTime(300),
      ).
      subscribe((value: string) => {
        console.log(value);
        this.http.get('https://openlibrary.org/search.json?q=' + value)
        .subscribe((response: any) => {
          // Handle API response
          this.searchedBooks = response.docs;
          // Process the response data as needed
        }, (error: any) => {
          // Handle API error
          console.error(error);
        });
      });
  }
}
