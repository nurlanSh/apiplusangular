import { Component, OnInit } from '@angular/core';
import { BlogPostService } from '../services/blog-post.service';
import { Observable, map } from 'rxjs';
import { BlogPost } from '../models/blog-post.model';

@Component({
  selector: 'app-blogpost-list',
  templateUrl: './blogpost-list.component.html',
  styleUrls: ['./blogpost-list.component.css']
})
export class BlogpostListComponent implements OnInit {
  blogPosts$?: Observable<BlogPost[]>;
  page: number = 1;  
  pageSize: number = 5;  
  totalPageCount: number = 1; 
  totalBlogPostCount: number = 0;
  
  constructor(private blogPostService: BlogPostService) { }
  
  ngOnInit(): void {
    this.loadAllBlogPosts();
  }

  loadAllBlogPosts() {
    this.blogPostService.getAllBlogPosts().subscribe(
      blogPosts => {
        this.totalBlogPostCount = blogPosts.length;
        this.calculateTotalPageCount();
        this.paginateBlogPosts();
      },
      error => {
        console.error('Error loading blog posts', error);
      }
    );
  }

  calculateTotalPageCount() {
    this.totalPageCount = Math.ceil(this.totalBlogPostCount / this.pageSize);
  }

  paginateBlogPosts() {
    this.blogPosts$ = this.blogPostService.getAllBlogPosts().pipe(
      // Paginate the data using the slice operator
      map((blogPosts) => blogPosts.slice(
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
