import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { User } from './model/admin.model';
import { UserDetailComponent } from './user-detail/user-detail.component';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent {
  users: User[] = [
    {
      id: '1',
      email: 'abc@gmail.com',
      firstName: 'John',
      lastName: 'Doe',
      roles: ['Admin']
    },
    {
      id: '2',
      email: 'bcd@gmail.com',
      firstName: 'Jane',
      lastName: 'Doe',
      roles: ['Manager']
    },
    {
      id: '3',
      email: 'efg@gmail.com',
      firstName: 'Tom',
      lastName: 'Smith',
      roles: ['Agent']
    },
    {
      id: '4',
      email: 'qwe@gmail.com',
      firstName: 'Jerry',
      lastName: 'Smith',
      roles: ['Admin']
    },
    {
      id: '1',
      email: 'abc@gmail.com',
      firstName: 'John',
      lastName: 'Doe',
      roles: ['Admin']
    },
    {
      id: '2',
      email: 'bcd@gmail.com',
      firstName: 'Jane',
      lastName: 'Doe',
      roles: ['Manager']
    },
    {
      id: '3',
      email: 'efg@gmail.com',
      firstName: 'Tom',
      lastName: 'Smith',
      roles: ['Agent']
    },
    {
      id: '4',
      email: 'qwe@gmail.com',
      firstName: 'Jerry',
      lastName: 'Smith',
      roles: ['Admin']
    },
    {
      id: '1',
      email: 'abc@gmail.com',
      firstName: 'John',
      lastName: 'Doe',
      roles: ['Admin']
    },
    {
      id: '2',
      email: 'bcd@gmail.com',
      firstName: 'Jane',
      lastName: 'Doe',
      roles: ['Manager']
    },
    {
      id: '3',
      email: 'efg@gmail.com',
      firstName: 'Tom',
      lastName: 'Smith',
      roles: ['Agent']
    },
    {
      id: '4',
      email: 'qwe@gmail.com',
      firstName: 'Jerry',
      lastName: 'Smith',
      roles: ['Admin']
    }
  ]

  selectedUser: User = {
    id: '100',
    firstName: 'Zack',
    lastName: 'Yu',
    email: 'aa@aa.com'
  };
  sidebarVisible: boolean = false;

  searchText: string = '';

  @ViewChild('userDetail') userDetail?: UserDetailComponent;

  show(user: User): void {
    console.log(user)
  }


  onSelectUser(event: any, user: User): void {
    this.sidebarVisible = true;
    this.selectedUser.firstName = user.firstName;
    this.selectedUser.id = user.id;

    if (this.userDetail) {
      this.userDetail.onNotify();
    }
  }

  onNotify(event: string): void {
    console.log(event);
  }
}
