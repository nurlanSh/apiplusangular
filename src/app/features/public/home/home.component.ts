import { Component, OnInit } from '@angular/core';
import { BlogPostService } from '../../blog-post/services/blog-post.service';
import { Observable, map, take } from 'rxjs';
import { BlogPost } from '../../blog-post/models/blog-post.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  blogs$?: Observable<BlogPost[]>;
  page: number = 1;  
  pageSize: number = 6;  
  totalPageCount: number = 1; 
  totalBlogPostCount: number = 0;

  constructor(private blogPostService: BlogPostService){
    
  }
  
  ngOnInit(): void {
    this.loadAllBlogPosts();
  }

  loadAllBlogPosts() {
    this.blogPostService.getAllBlogPosts().subscribe(
      (      blogs: string | any[]) => {
        this.totalBlogPostCount = blogs.length;
        this.calculateTotalPageCount();
        this.paginateBlogPosts();
      },
      (      error: any) => {
        console.error('Error loading blog posts', error);
      }
    );
  }

  calculateTotalPageCount() {
    this.totalPageCount = Math.ceil(this.totalBlogPostCount / this.pageSize);
  }

  paginateBlogPosts() {
    this.blogs$ = this.blogPostService.getAllBlogPosts().pipe(
      // Paginate the data using the slice operator
      map((blogs) => blogs.slice(
        (this.page - 1) * this.pageSize,
        this.page * this.pageSize
      ))
    );
  }

  goToPage(pageNumber: number) {
    this.page = pageNumber;
    this.paginateBlogPosts();
  }

  generatePageNumbers(): number[] {
    const maxPagesToShow = 5; // Set the maximum number of pages to show
    const pages = [1]; // Add the first page as a fixed element
  
    if (this.totalPageCount > 1) {
      let startPage = Math.max(2, this.page - Math.floor(maxPagesToShow / 2));
      const endPage = Math.min(this.totalPageCount, startPage + maxPagesToShow - 2);
  
      // If the start page is too close to the beginning, shift it to ensure it shows maxPagesToShow - 1 pages
      if (endPage - startPage + 1 < maxPagesToShow - 1) {
        startPage = Math.max(2, endPage - maxPagesToShow + 2);
      }
  
      // Add adjacent pages to the right
      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }
    }
  
    return pages;
  }

}