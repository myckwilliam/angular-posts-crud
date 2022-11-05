import { BehaviorSubject, take } from 'rxjs';
import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { PostService } from 'src/app/services/post.service';
import { LoadingComponent } from 'src/app/shared/loading/loading.component';
import {
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Post } from 'src/app/models/post';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, LoadingComponent],
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
})
export class FormComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private postService = inject(PostService);
  private fb = inject(NonNullableFormBuilder);

  private postId: string | null = this.route.snapshot.paramMap.get('postId');

  isLoading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  isUpdate = false;

  form = this.fb.group({
    id: [{ value: '', disabled: true }],
    title: ['', [Validators.required]],
    body: ['', [Validators.required]],
  });

  ngOnInit(): void {
    if (this.postId) {
      this.isUpdate = true;
      this.isLoading$.next(true);
      this.postService
        .getOnePost(this.postId)
        .pipe(take(1))
        .subscribe((data: { title: string; body: string }) => {
          const { title, body } = data;
          this.form.patchValue({
            title,
            body,
          });
          this.isLoading$.next(false);
        });
    }
  }

  onCreate() {
    const { title, body } = this.form.value;
    this.postService
      .createPost({ title, body })
      .pipe(take(1))
      .subscribe({
        next: (data) => {
          console.log(data);
          this.router.navigate(['']);
        },
        error: (err) => {
          console.log(err);
        },
      });
  }

  onUpdate() {
    const { title, body } = this.form.value;
    this.postId &&
      this.postService
        .updatePost(this.postId, { title, body })
        .pipe(take(1))
        .subscribe({
          next: (data) => {
            console.log(data);
            this.router.navigate(['']);
          },
          error: (err) => {
            console.log(err);
          },
        });
  }

  onRemove() {
    this.postId &&
      this.postService
        .removePost(this.postId)
        .pipe(take(1))
        .subscribe({
          next: (data) => {
            console.log(data);
            this.router.navigate(['']);
          },
          error: (err) => {
            console.log(err);
          },
        });
  }
}
