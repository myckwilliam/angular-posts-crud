import { Observable } from 'rxjs';
import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Post } from 'src/app/models/post';

@Component({
  selector: 'app-posts-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './posts-card.component.html',
  styleUrls: ['./posts-card.component.css'],
})
export class PostsCardComponent implements OnInit {
  @Input() posts$: Observable<Post[]> = new Observable<Post[]>();

  constructor() {}

  ngOnInit(): void {}
}
