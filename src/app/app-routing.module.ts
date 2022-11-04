import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/home/home.component').then((c) => c.HomeComponent),
  },
  {
    path: 'form',
    loadComponent: () =>
      import('./pages/form/form.component').then((c) => c.FormComponent),
  },
  {
    path: 'form/:postId',
    loadComponent: () =>
      import('./pages/form/form.component').then((c) => c.FormComponent),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
