import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonService } from 'src/app/services/common/common.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {
  posts:any;
  postsForm: boolean = false;
  addButton: boolean = true;
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
    this.getPosts();
 }

 addPost() {
  this.addButton = false;
    this.postsForm = true;
 }

 get tags() {
  return this.postForm.get('tags') as FormArray;
}

addTag() {
  this.tags.push(this.formBuilder.control(''));
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
}

getPosts() {
  let user_id = localStorage.getItem('user_id');
  console.log(user_id);
  this.commonService.getPosts(user_id).subscribe((res)=>{
    this.posts = res;
  })
}
}
