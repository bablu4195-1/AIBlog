import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PostsRoutingModule } from './posts-routing.module';
import { PostComponent } from './post/post.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CryptoComponent } from './crypto/crypto.component';
import { NgChartsModule } from 'ng2-charts';
import { NavigationComponent } from '../navigation/navigation.component';
import { PostsViewComponent } from './posts-view/posts-view.component';


@NgModule({
  declarations: [
    PostComponent,
    CryptoComponent,
    NavigationComponent,
    PostsViewComponent
  ],
  imports: [
    CommonModule,
    PostsRoutingModule,
    ReactiveFormsModule,
    NgChartsModule
  ]
})
export class PostsModule { }
