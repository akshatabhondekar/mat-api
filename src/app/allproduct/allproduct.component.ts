import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '../product.service';
import { MatDialog } from '@angular/material/dialog';
import { DeleteComponent } from '../delete/delete.component';
import { ToastrService } from 'ngx-toastr';
import { EditComponent } from '../edit/edit.component';
import { Paginate } from '../paginate';
import { MatMenu } from '@angular/material/menu';
import { MatPaginator } from '@angular/material/paginator';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-allproduct',
  templateUrl: './allproduct.component.html',
  styleUrls: ['./allproduct.component.css']
})
export class AllproductComponent implements OnInit {

  displayedColumns: string[] = [ 'title', 'discription', 'price'];
  paginatedData: Paginate = {
    limit: 10,
    skip: 0,
    total: 20
  };

  // this is mgx pagination config for current page and page size
  p:any = 1
  pageSize: number = 5; 
  


  productData: any;
  Data:any;
  formData:any
  filteredProducts: any;
  userForm! : FormGroup
  
  searchTerm: string = '';

  


  
 constructor(
  private router: Router,
  private productservice:ProductService,
  private matDialog:MatDialog,
  private toster:ToastrService,
  private formBuilder:FormBuilder
 ){
  this.userForm = this.formBuilder.group({
      filterText :[''] 
  })
 }



  ngOnInit(): void {
     this.userForm = this.formBuilder.group({
      firstName :['', Validators.required],
      lastName:['', Validators.required],
      mobileNumber:['', Validators.required],
     })
this.getProduct()

  }
getProduct(){
  this.productservice.product().subscribe((res:any)=>{
    console.log(res);
    debugger
    //see blow res assign to productData
    this.productData = res
    console.log(this.productData);
    
    
   })
}
  delete(id:number, title:string, description:string, price:number){
  
    const matDialog = this.matDialog.open(DeleteComponent, {
     data:{
      id: id,
      title: title,
      discription: description,
      price: price,
     }

    });
    matDialog.afterClosed().subscribe(result => {
      if (result) {
        debugger
      
        this.toster.success('product has been successfully deleted!', 'Success');

      } else {

        this.toster.error('product  not Deleted.', 'Cancel ');
      }
  })

  }

  editProduct(id:number, title:string, description:string, price:number){
    const matDialog = this.matDialog.open(EditComponent, {
      width: '500px', // Set your desired width here
      maxHeight: '90vh', // Set a maximum height in viewport height units

      data:{
        id: id,
        title: title,
      description: description,
      price: price
      }
    });

    matDialog.afterClosed().subscribe(result => {
      if(result){
        const editProduct = [...this.productData];

        for (let i = 0; i < editProduct.length; i++){
          if(editProduct[i].id) {
            editProduct[i].title = this.productservice.editProduct;
            editProduct[i].discription = this.productservice.editProduct;
            editProduct[i].price = this.productservice.editProduct;
            break;
          }
        }

        this.Data = editProduct;
        this.toster.success('Product has been updated SucessFully', 'Success');
      } else {

      }
    })
  }

  loadData() {
    this.productservice.getPaginationData(this.paginatedData.skip, this.paginatedData.limit).subscribe({
      next: (data: any) => {
        debugger
        //response data
        this.Data = data.product;
      },
      error: (error: any) => {
        this.toster.error('Error fetching data:', error);
      }
    });
  }

  onPageChange(event: any) {
    debugger
    console.log(event, "eventevent");
    this.paginatedData.skip = event.pageIndex * this.paginatedData.limit;
    this.paginatedData.limit = event.pageSize;
    this.loadData();
  }

  getSearchText(text:any){
    //now getting search value in text and print on console
   var filterProduct = this.productData.filter((ob:any)=>ob.title.toLowerCase().includes(text.toLowerCase()))
  console.log(text,"texttexttexttexttext");
  console.log(filterProduct,"filterProductfilterProductfilterProductfilterProductfilterProductfilterProduct");
  //here we will assign our filterProduct to productData 
this.productData = filterProduct

//now will give condtion if input box is empty or it does not contain any text then showing all products
if(text=="" ||text==null){

// here we will call api funcation for fetch products again and assign to productData

//below function will call api and fetch products and assign again productsData
this.getProduct()
}
  }



  Submit(){  
    if(this.userForm.valid){
// make api call here and pass form data
    } else{
// if form is invalid then show alert msg here
alert("Form is Invalid please fill all required firlds")

    }
   console.log("this function is called");
   
  }
}
