import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { DataService } from './../services/data.service';

@Component({
  selector: 'app-details-person',
  templateUrl: './details-person.component.html',
  styleUrls: ['./details-person.component.css']
})
export class DetailsPersonComponent implements OnInit {

  person = {};

  constructor(private router: Router, private route: ActivatedRoute, private _dataService: DataService) { }

  ngOnInit() {
    this.getBookDetail(this.route.snapshot.params['id']);
  }

  getBookDetail(id) {
    this._dataService.getUser(id)
      .subscribe(res => {
        console.log(res);
        this.person = res
      });
  }

  deletePerson(id) {
    this._dataService.deleteUser(id)
      .subscribe(res => {
        console.log(res);
        this.router.navigate(['/all']);
      });
  }
}
