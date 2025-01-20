import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzModalModule, NzModalService } from 'ng-zorro-antd/modal';
import { User } from '../user';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { CreateComponent } from '../create/create.component';



@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, NzModalModule, RouterModule, NzTableModule, NzButtonModule,NzIconModule],
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

  showCreateModal(): void {
    
    const modalRef = this.modal.create({
      nzTitle: 'Create New User',
      nzContent: CreateComponent, 
      nzFooter: null 
    });

    modalRef.afterClose.subscribe(() => {
      
      this.loadUsers();
    });
  }

  loadUsers(): void {
    this.users = JSON.parse(localStorage.getItem('arr') || '[]') as User[];
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


