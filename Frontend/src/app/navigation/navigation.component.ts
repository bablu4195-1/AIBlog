import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit{
  selected:boolean = false;
  admin_nav_group_data: any = [
   {
    name: 'Home',
    icon: 'post_add',
    route: '/admin/posts',
    submenu: [
      {
        name: 'Posts',
        icon: 'people',
        route: '/admin/users'
      },
      {
        name: 'Users',
        icon: 'people',
        route: '/admin/users'
      },
      {
        name: 'Categories',
        icon: 'people',
        route: '/admin/categories'
      }
    ]
    },
    {
    name: 'Posts',
    icon: 'people',
    route: '/admin/users',submenu: [
      {
        name: 'Posts',
        icon: 'people',
        route: '/admin/users'
      },
      {
        name: 'Users',
        icon: 'people',
        route: '/admin/users'
      },
      {
        name: 'Categories',
        icon: 'people',
        route: '/admin/categories'
      },
    ]
    },
    {
    name: 'Users',
    icon: 'people',
    route: '/admin/users',submenu: [
      {
        name: 'Posts',
        icon: 'people',
        route: '/admin/users'
      },
      {
        name: 'Users',
        icon: 'people',
        route: '/admin/users'
      },
      {
        name: 'Categories',
        icon: 'people',
        route: '/admin/categories'
      },
    ]
    },
    {
      name: 'Categories',
      icon: 'category',
      route: '/admin/categories',submenu: [
        {
          name: 'Posts',
          icon: 'people',
          route: '/admin/users'
        },
        {
          name: 'Users',
          icon: 'people',
          route: '/admin/users'
        },
        {
          name: 'Categories',
          icon: 'people',
          route: '/admin/categories'
        },
      ]
    }
   ];
   ngOnInit(): void {
    this.admin_nav_group_data
   }
   clickEvent(i:any){
    // this.admin_nav_group_data[i]['selected'] = !this.admin_nav_group_data[i]['selected'];
    for (let index = 0; index < this.admin_nav_group_data.length; index++) {
      if (index == i) {
        if (this.admin_nav_group_data[index]['selected'] == true){
          this.admin_nav_group_data[index]['selected'] = false;
        } 
        else {
          this.admin_nav_group_data[index]['selected'] = true;
        }
      }
    }
   }
}
