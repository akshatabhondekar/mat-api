import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ProductService } from '../product.service';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  productForm!: FormGroup;
  submitted = false;
  
  constructor(public dialog: MatDialogRef<EditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, public productservice: ProductService, private formBuilder: FormBuilder, private routes: ActivatedRoute) { }

  ngOnInit(): void {
    this.productForm = this.formBuilder.group({
      id: ['', Validators.required],
      title: ['', Validators.required],
      description: ['', Validators.required],
      price: ['', Validators.required]
    });

  }

  getErrorMessage() {
    return "error"
  }



  onSubmit() {
    this.submitted = true;
    if (this.productForm.invalid) {
      return;
    }
    var id = this.data.id
    this.productservice.editProduct(id, this.productForm).subscribe(
      (res) => {
        console.log('Product updated SucessFully:', res);

      },
      (error) => {
        console.error('Error updated product', error);
      }
    );

  }

//   onSubmit(){  
//     if(this.productForm.valid){
//  } else{

// alert("Form is Invalid please fill all required firlds")

//     }
//    console.log("this function is called");
   
//   }

// onSubmit() {
//   this.productservice.editProduct(this.data.id, this.data.formData).subscribe(
//     (res) => { 
//       console.log('Product edited successfully:', res);
//     },

// (error) => {
//   console.error('Error editing product:', error);

// }
// );
// }

  onNoClick() {
    this.dialog.close();
  }


}
