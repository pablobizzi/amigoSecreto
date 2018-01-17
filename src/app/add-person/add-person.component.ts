import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-add-person',
  templateUrl: './add-person.component.html',
  styleUrls: ['./add-person.component.css']
})
export class AddPersonComponent implements OnInit {

  person = {};

  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit() {
  }

  savePerson() {
    this.http.post('/person', this.person)
      .subscribe(res => {
        const id = res['_id'];
        this.router.navigate(['/details-person', id]);
      }, (err) => {
        console.log(err);
      }
      );
  }

}
