import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PostsViewComponent } from './posts-view/posts-view.component';
import { PostComponent } from './post/post.component';

const routes: Routes = [
  {
    path:"", component:PostsViewComponent,
    children: [
      {
        path:"post",
        component:PostComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PostsRoutingModule { }
