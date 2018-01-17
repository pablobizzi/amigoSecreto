import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { DataService } from './../services/data.service';

@Component({
  selector: 'app-edit-person',
  templateUrl: './edit-person.component.html',
  styleUrls: ['./edit-person.component.css']
})
export class EditPersonComponent implements OnInit {

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

  updatePerson(id) {
    this._dataService.updateUser(id, this.person).subscribe(res => {
      this.router.navigate(['/all']);
    },
      error => {
        console.log(error);
      });
  }

}
