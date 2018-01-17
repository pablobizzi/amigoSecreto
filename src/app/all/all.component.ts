import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';

import { DataService } from './../services/data.service';

@Component({
  selector: 'app-all',
  templateUrl: './all.component.html',
  styleUrls: ['./all.component.css']
})
export class AllComponent implements OnInit {

  users: Array<any> = [];

  constructor(private _dataService: DataService, private router: Router) {
  }

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers(){
    this._dataService.getUsers()
      .subscribe(res => this.users = res);
      console.log('Saiu gestUsers');
  }

  goToAdd() {
    this.router.navigate(['/addPerson']);
  }

  async generateFriends() {

    let array = this.users;

    var match: any = {};

    if (!array || !array.length) {
      return null;
    }

    var santas = array.slice();
    this.shuffle(santas);

    for (var i = 0; i < santas.length; i++) {
      var santa = santas[i]._id,
        recipient;
      if (i !== santas.length - 1) {
        recipient = santas[i + 1].name;
      } else {
        recipient = santas[0].name;
      }

      match.name = santas[i].name;
      match.email = santas[i].email;
      match.secretSanta = recipient;

      await this.updatePerson(santa, match, !(i < santas.length - 1));
    }
  };

  shuffle(array) {
    var n = array.length,
      i,
      j;

    while (n) {
      i = Math.floor(Math.random() * n--);

      j = array[n];
      array[n] = array[i];
      array[i] = j;
    }
  }

  async updatePerson(id,person,get) {
    this._dataService.updateUser(id, person).subscribe(res => {
      console.log('Success');
      if(get){
        this.getUsers();
      }
    },
      error => {
        console.log(error);
      });
  }

}
