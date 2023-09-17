import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-posts-view',
  templateUrl: './posts-view.component.html',
  styleUrls: ['./posts-view.component.scss']
})
export class PostsViewComponent implements OnInit{
  @ViewChild('sideNav') sideNav: ElementRef | undefined;

  width: string = '100%';

  constructor(private changeDetectorRef: ChangeDetectorRef) { }

  ngAfterViewInit(): void {
    if (this.sideNav) {
      const element = this.sideNav.nativeElement;
      this.width = (window.innerWidth - element.offsetWidth) + 'px';
      this.changeDetectorRef.detectChanges();
    }
  }

  ngOnInit(): void {
  }

}
