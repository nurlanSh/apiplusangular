import { Component, OnInit } from '@angular/core';
import { BlogPostService } from '../services/blog-post.service';
import { Observable } from 'rxjs';
import { BlogPost } from '../models/blog-post.model';

@Component({
  selector: 'app-blogpost-list',
  templateUrl: './blogpost-list.component.html',
  styleUrls: ['./blogpost-list.component.css']
})
export class BlogpostListComponent implements OnInit {

  blogPosts$?: Observable<BlogPost[]>;

  page: number = 1;       // Current page
  pageSize: number = 5;  // Items per page

    totalItemCount: number = 0;

  constructor(private blogPostService: BlogPostService) {
    
  }

  ngOnInit(): void {
    this.loadBlogPosts();
  }

  loadBlogPosts() {
    // Fetch blog posts for the current page and page size
    this.blogPosts$ = this.blogPostService.getAllBlogPosts(this.page, this.pageSize);
  }
  goToPage(pageNumber: number) {
    this.page = pageNumber;
    this.loadBlogPosts();
  }

  generatePageNumbers(): number[] {
    const totalPageCount = 10; 
        return Array.from({ length: totalPageCount }, (_, i) => i + 1);
  }

}

  // nextPage() {
  //   // Go to the next page
  //   this.page++;
  //   this.loadBlogPosts();
  // }

  // previousPage() {
  //   // Go to the previous page, if not on the first page
  //   if (this.page > 1) {
  //     this.page--;
  //     this.loadBlogPosts();
  //   }
  // }


  // ngOnInit(): void {
  //   // get alll blogposts
  //   this.blogPosts$ = this.blogPostService.getAllBlogPosts();
  // }
