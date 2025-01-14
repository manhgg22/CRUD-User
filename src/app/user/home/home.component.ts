import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { User } from '../user';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule, NzTableModule, NzIconModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  users: User[] = [];
  total = 0;
  pageSize = 5;
  pageIndex = 1;

  ngOnInit(): void {
    const storedUsers = JSON.parse(localStorage.getItem('arr') || '[]') as User[];
    if (storedUsers.length > 0) {
      this.total = storedUsers.length;
      this.pageIndex = 1;
      this.pageSize = 5; // Hoặc giá trị mặc định
      this.users = storedUsers.slice(0, this.pageSize);
    } else {
      alert('No data found in localStorage');
    }
  }

  onPageIndexChange($event: number): void {
    this.pageIndex = $event;
    const storedUsers = JSON.parse(localStorage.getItem('arr') || '[]') as User[];
    const startIndex = (this.pageIndex - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.users = storedUsers.slice(startIndex, endIndex);
  }

  pageSizeChanged($event: number): void {
    this.pageSize = $event;
    this.pageIndex = 1; // Reset về trang đầu tiên
    const storedUsers = JSON.parse(localStorage.getItem('arr') || '[]') as User[];
    this.users = storedUsers.slice(0, this.pageSize);
  }

  deleteUser(id: number): void {
    const storedUsers = JSON.parse(localStorage.getItem('arr') || '[]') as User[];
    const updatedUsers = storedUsers.filter(user => user.id !== id);
    localStorage.setItem('arr', JSON.stringify(updatedUsers));
    this.total = updatedUsers.length;
    const startIndex = (this.pageIndex - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.users = updatedUsers.slice(startIndex, endIndex);
    alert('User deleted successfully');
  }
}
