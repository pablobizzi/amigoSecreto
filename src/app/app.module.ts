import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';

import { HttpModule } from '@angular/http';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { DataService } from './services/data.service';

import { AddPersonComponent } from './add-person/add-person.component';
import { EditPersonComponent } from './edit-person/edit-person.component';
import { DetailsPersonComponent } from './details-person/details-person.component';
import { AllComponent } from './all/all.component';

const appRoutes: Routes = [
  {
    path: 'all',
    component: AllComponent,
    data: { title: 'Book List' }
  },
  {
    path: 'personDetails/:id',
    component: DetailsPersonComponent,
    data: { title: 'Person Details' }
  },
  {
    path: 'addPerson',
    component: AddPersonComponent,
    data: { title: 'Add Person' }
  },
  {
    path: 'personEdit/:id',
    component: EditPersonComponent,
    data: { title: 'Edit Person' }
  },
  {
    path: '',
    redirectTo: '/all',
    pathMatch: 'full'
  }
];

@NgModule({
  declarations: [
    AppComponent,
    AddPersonComponent,
    EditPersonComponent,
    DetailsPersonComponent,
    AllComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    HttpModule,
    FormsModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true }
    )
  ],
  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
