import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

import { DataService } from './../services/data.service';

@Component({
  selector: 'app-add-person',
  templateUrl: './add-person.component.html',
  styleUrls: ['./add-person.component.css']
})
export class AddPersonComponent implements OnInit {

  person = {};

  constructor(private http: HttpClient, private router: Router, private _dataService: DataService) { }

  ngOnInit() {
  }

  savePerson() {
    this._dataService.saverUser(this.person).subscribe(res => {
      this.router.navigate(['/all']);
    },
      error => {
        console.log(error);
      });
  }

}
