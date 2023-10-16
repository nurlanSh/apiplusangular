import { Component, OnDestroy } from '@angular/core';
import { AddCategoryRequest } from '../models/add-category-request.model';
import { CategoryService } from '../services/category.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent implements OnDestroy {

  constructor(private categoryService: CategoryService, private router: Router){
    this.model = {
      name:'',
      urlHandle:''
    };
  }

  model: AddCategoryRequest;
  private addCategorySubscription?: Subscription;

  onFormSubmit(){
    this.addCategorySubscription = this.categoryService.addCategory(this.model)
    .subscribe({
      next: (responese) => {
        this.router.navigateByUrl('/admin/categories')
      }
    }) 
  }

  ngOnDestroy(): void {
    this.addCategorySubscription?.unsubscribe();
  }
}
