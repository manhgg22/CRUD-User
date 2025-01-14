import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzModalModule, NzModalService } from 'ng-zorro-antd/modal';
import { User } from '../user';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, NzModalModule, RouterModule, NzTableModule, NzIconModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  users: User[] = [];

  constructor(private modal: NzModalService, private message: NzMessageService) {}

  ngOnInit(): void {
    const storedUsers = JSON.parse(localStorage.getItem('arr') || '[]') as User[];
    if (storedUsers.length > 0) {
      this.users = storedUsers;
    } else {
      alert('No data found in localStorage');
    }
  }

  deleteUser(id: number): void {
    this.modal.confirm({
      nzTitle: 'Are you sure you want to delete this user?',
      nzContent: 'This action cannot be undone.',
      nzOnOk: () => {
        const storedUsers = JSON.parse(localStorage.getItem('arr') || '[]') as User[];
        const updatedUsers = storedUsers.filter(user => user.id !== id);
        localStorage.setItem('arr', JSON.stringify(updatedUsers));
        this.users = updatedUsers;
        this.message.success('User deleted successfully');
      }
    });
  }
}
