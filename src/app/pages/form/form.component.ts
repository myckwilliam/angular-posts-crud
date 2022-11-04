import { take } from 'rxjs';
import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
})
export class FormComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private postService = inject(PostService);

  private postId: string | null = this.route.snapshot.paramMap.get('postId');
  id: number = NaN;

  ngOnInit(): void {
    if (this.postId) {
      this.id = +this.postId;
      this.postService.getOnePost(this.id).pipe(take(1)).subscribe(console.log);
    }
  }
}
