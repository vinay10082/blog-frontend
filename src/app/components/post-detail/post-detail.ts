import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { BlogService, Post, Comment } from '../../services/blog';

@Component({
  selector: 'app-post-detail',
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './post-detail.html',
  styleUrl: './post-detail.css'
})
export class PostDetailComponent implements OnInit {
  post: Post | null = null;
  comments: Comment[] = [];
  loading = true;
  newCommentContent = '';
  submittingComment = false;

  constructor(
    private route: ActivatedRoute,
    private blogService: BlogService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loadPostData(Number(id));
    }
  }

  loadPostData(id: number): void {
    this.blogService.getPost(id).subscribe({
      next: (post) => {
        this.post = post;
        this.loadComments(id);
        this.cdr.markForCheck();
      },
      error: (err) => {
        console.error('Error fetching post', err);
        this.loading = false;
        this.cdr.markForCheck();
      }
    });
  }

  loadComments(postId: number): void {
    this.blogService.getComments(postId).subscribe({
      next: (comments) => {
        this.comments = comments || [];
        this.loading = false;
        this.cdr.markForCheck();
      },
      error: (err) => {
        console.error('Error fetching comments', err);
        this.loading = false;
        this.cdr.markForCheck();
      }
    });
  }

  submitComment(): void {
    if (!this.newCommentContent.trim() || !this.post?.id) return;
    
    this.submittingComment = true;
    this.cdr.markForCheck();
    
    const newComment: Comment = {
      postId: this.post.id,
      content: this.newCommentContent
    };

    this.blogService.createComment(newComment).subscribe({
      next: (comment) => {
        this.comments.push(comment);
        this.newCommentContent = '';
        this.submittingComment = false;
        this.cdr.markForCheck();
      },
      error: (err) => {
        console.error('Error creating comment', err);
        this.submittingComment = false;
        this.cdr.markForCheck();
      }
    });
  }
}
