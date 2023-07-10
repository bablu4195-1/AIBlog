import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PostsRoutingModule } from './posts-routing.module';
import { PostComponent } from './post/post.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CryptoComponent } from './crypto/crypto.component';
import { NgChartsModule } from 'ng2-charts';


@NgModule({
  declarations: [
    PostComponent,
    CryptoComponent
  ],
  imports: [
    CommonModule,
    PostsRoutingModule,
    ReactiveFormsModule,
    NgChartsModule
  ]
})
export class PostsModule { }
