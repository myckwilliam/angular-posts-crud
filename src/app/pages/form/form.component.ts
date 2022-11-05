import { BehaviorSubject, take } from 'rxjs';
import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { PostService } from 'src/app/services/post.service';
import { LoadingComponent } from 'src/app/shared/loading/loading.component';
import {
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, LoadingComponent],
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
})
export class FormComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private postService = inject(PostService);
  private fb = inject(NonNullableFormBuilder);

  private postId: string | null = this.route.snapshot.paramMap.get('postId');

  isLoading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  form = this.fb.group({
    id: [{ value: '', disabled: true }],
    title: ['', [Validators.required]],
    body: ['', [Validators.required]],
  });

  ngOnInit(): void {
    if (this.postId) {
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

  handleSubmit() {
    console.log(this.form.get('title'));
  }
}
