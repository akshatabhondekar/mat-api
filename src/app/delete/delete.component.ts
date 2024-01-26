import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ProductService } from '../product.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.css']
})
export class DeleteComponent {

  constructor(public matdialog:MatDialogRef<DeleteComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any, public productservice:ProductService, private toaster:ToastrService){}

    onNoClick(): void {
      this.matdialog.close();
      }

    confirmDelete(): void {
      this.productservice.delete(this.data.id).subscribe({
        next: (res) => {
         // dummy api taking time for respone
          // this.toastr.success('User has been successfully deleted!', 'Success');
        },
        error: (error) => {
          // this.toastr.error('Failed to delete the user. Please try again later.', 'Error');
        },
      });
      
    }
}
