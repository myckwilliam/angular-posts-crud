import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostService } from 'src/app/services/post.service';
import { Observable, take } from 'rxjs';
import { Post } from 'src/app/models/post';
import { PostsCardComponent } from 'src/app/shared/posts-card/posts-card.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, PostsCardComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  posts$: Observable<Post[]> = new Observable<Post[]>();

  constructor(private postService: PostService) {}

  ngOnInit(): void {
    this.posts$ = this.postService.getPosts().pipe(take(1));
  }
}
