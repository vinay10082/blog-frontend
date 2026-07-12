import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { BlogService, Post } from '../../services/blog';

@Component({
  selector: 'app-create-post',
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './create-post.html',
  styleUrl: './create-post.css'
})
export class CreatePostComponent {
  post: Post = {
    title: '',
    content: ''
  };
  submitting = false;

  constructor(
    private blogService: BlogService,
    private router: Router
  ) {}

  submitPost(): void {
    if (!this.post.title.trim() || !this.post.content.trim()) return;

    this.submitting = true;
    this.blogService.createPost(this.post).subscribe({
      next: (createdPost) => {
        this.submitting = false;
        if (createdPost && createdPost.id) {
          this.router.navigate(['/post', createdPost.id]);
        } else {
          this.router.navigate(['/']);
        }
      },
      error: (err) => {
        console.error('Error creating post', err);
        this.submitting = false;
      }
    });
  }
}
