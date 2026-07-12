import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BlogService, Post } from '../../services/blog';

@Component({
  selector: 'app-home',
  imports: [CommonModule, RouterModule],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class HomeComponent implements OnInit {
  posts: Post[] = [];
  loading = true;

  constructor(private blogService: BlogService, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.blogService.getPosts().subscribe({
      next: (data) => {
        this.posts = data;
        this.loading = false;
        this.cdr.markForCheck();
      },
      error: (err) => {
        console.error('Error fetching posts', err);
        this.loading = false;
        this.cdr.markForCheck();
      }
    });
  }
}
