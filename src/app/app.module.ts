import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';

import { HttpModule } from '@angular/http';
import { DataService } from './data.service';
import { AddPersonComponent } from './add-person/add-person.component';
import { EditPersonComponent } from './edit-person/edit-person.component';
import { DeletePersonComponent } from './delete-person/delete-person.component';
import { DetailsPersonComponent } from './details-person/details-person.component';

// const appRoutes: Routes = [
//   {
//     path: 'person',
//     component: BookComponent,
//     data: { title: 'List People' }
//   },
//   {
//     path: 'book-details/:id',
//     component: BookDetailComponent,
//     data: { title: 'Person Details' }
//   },
//   {
//     path: 'book-create',
//     component: BookCreateComponent,
//     data: { title: 'Create Person' }
//   },
//   {
//     path: 'book-edit/:id',
//     component: BookEditComponent,
//     data: { title: 'Edit Person' }
//   },
//   {
//     path: '',
//     redirectTo: '/person',
//     pathMatch: 'full'
//   }
// ];

@NgModule({
  declarations: [
    AppComponent,
    AddPersonComponent,
    EditPersonComponent,
    DeletePersonComponent,
    DetailsPersonComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    // RouterModule.forRoot(
    //   appRoutes,
    //   { enableTracing: true }
    // )
  ],
  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
