import { Component, OnInit, Signal, WritableSignal, effect, signal } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonService } from 'src/app/services/common/common.service';


type Post = {
  "_id": string;
  "title": string;
  "content": string;
  "author": string;
  "comments": string;
  "tags": string[];
  "views": number;
  "date": string;
  "__v": number;
  "username": string;
};


@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {
  posts: WritableSignal<Array<any>> = signal([]);
  postings:any = [];
  updatePost: boolean = true;
  postsForm: boolean = false;
  addButton: boolean = true;
  postData:any = {}
  postForm: FormGroup = new FormGroup({});
 constructor(private commonService: CommonService, private formBuilder: FormBuilder) {}
  ngOnInit(): void {
   this.postForm =  this.formBuilder.group({
      title: ['', Validators.required],
      content: ['', Validators.required],
      // author: ['', Validators.required],
      // username: ['', Validators.required],
      tags: this.formBuilder.array([]),
      // views: [0],
    });
    // this.redditPosts();
    this.gettingPosts();
    // this.getPosts();

 }

 addPost() {
   this.addButton = false;
    this.postsForm = true;
 }
 cancelPosts() {
  this.addButton = true;
  this.postsForm = false;
  this.updatePost = !this.updatePost;
 }
 get tags() {
  return this.postForm.get('tags') as FormArray;
}

addTag() {
  this.tags.push(this.formBuilder.control(''));
}

addUpdatedTag() {
  this.postData.tags.push(this.formBuilder.control(''));
}

removeUpdatedTag(index: number,tag:any) {
  console.log(this.postData.tags)
  this.postData.tags.splice(index,1);
}

removeTag(index: number) {
  this.tags.removeAt(index);
}

getErrorMessage(fieldName: string) {
    let errorMessage = "";
    const fieldWord = this.postForm.get(fieldName);
    if(fieldWord?.errors?.['invalid']){
      errorMessage = `${fieldName} is required`;
    }
}

onSubmit() {
if(this.postForm.valid){
  let user_id = localStorage.getItem('user_id');
  console.log(user_id);
  let payloadValue = {
    ...this.postForm.value,
    author : user_id
  }
  this.commonService.addPost(payloadValue).subscribe((res)=>{
    console.log(res);
  },(error)=>{
    console.log('Error Message', error);
  })
}
this.postsForm = !this.postsForm;
}

onUpdateSubmit(id:number) {
  if(this.postForm.valid){
    let user_id = localStorage.getItem('user_id');
    let payloadValue = {
      ...this.postData,
      author : user_id
    }
    console.log(payloadValue);
    this.commonService.updatePost(payloadValue,id).subscribe((res)=>{
      console.log(res);
    },(error)=>{
      console.log('Error Message', error);
    })
  }
  this.updatePost = !this.updatePost;
  this.getPosts();
}


getPosts() {
  let user_id = localStorage.getItem('user_id');
  this.commonService.getPosts(user_id).subscribe((res)=>{
    console.log("every interval",res);
    this.postings = res;
    this.posts.set(this.postings);
  },(error)=>{
    console.log('Error Message', error);
  })
}

gettingPosts() {
  setInterval(()=>{
    console.log("every 9 seconds")
    this.getPosts();
  },9000)
}

redditPosts() {
  this.commonService.redditPosts().subscribe((res)=>{
    console.log(res);
  })
}

updatingPost(index:number,post:any){
  console.log(post)
  this.postData = post;
  this.updatePost = !this.updatePost;
}



}
