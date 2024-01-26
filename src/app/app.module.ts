import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { EditComponent } from './edit/edit.component';
import { AllproductComponent } from './allproduct/allproduct.component';
import { RouterModule, Routes } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DeleteComponent } from './delete/delete.component'
import { ToastrModule } from 'ngx-toastr';
import { MatFormFieldModule } from '@angular/material/form-field';
import { AddDialogComponent } from './add-dialog/add-dialog.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatInputModule } from '@angular/material/input';


// this is for ngx pagination module
import { NgxPaginationModule } from 'ngx-pagination';


const routes :Routes=[
  { path:'',component:AllproductComponent},
  { path:'Data',component:AllproductComponent}
]


@NgModule({
  declarations: [
    AppComponent,
    EditComponent,
    AllproductComponent,
    DeleteComponent,
    AddDialogComponent,
    
    
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatIconModule,
    MatMenuModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatTableModule,
    MatPaginatorModule,
    ToastrModule.forRoot({
      positionClass: 'toast-bottom-right', 
      preventDuplicates: true, 
      timeOut: 3000, 
    }),
    RouterModule.forRoot(routes),
    NgxPaginationModule,
    MatInputModule,
   

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
