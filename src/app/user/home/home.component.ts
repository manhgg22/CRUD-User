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

  ngOnInit(): void {
    const storedUsers = JSON.parse(localStorage.getItem('arr') || '[]') as User[];
    if (storedUsers.length > 0) {
      this.users = storedUsers;
    } else {
      alert('No data found in localStorage');
    }
  }

  deleteUser(id: number): void {
    const storedUsers = JSON.parse(localStorage.getItem('arr') || '[]') as User[];
    const updatedUsers = storedUsers.filter(user => user.id !== id);
    localStorage.setItem('arr', JSON.stringify(updatedUsers));
    this.users = updatedUsers;
    alert('User deleted successfully');
  }
}
