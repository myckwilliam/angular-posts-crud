import { Observable } from 'rxjs';
import { Component, inject, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Post } from 'src/app/models/post';
import { Router } from '@angular/router';

@Component({
  selector: 'app-posts-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './posts-card.component.html',
  styleUrls: ['./posts-card.component.css'],
})
export class PostsCardComponent {
  @Input() posts$: Observable<Post[]> = new Observable<Post[]>();

  private router = inject(Router);

  navigateToForm(id: number) {
    this.router.navigate([`form/${id}`]);
  }
}
