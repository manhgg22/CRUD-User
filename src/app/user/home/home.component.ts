import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { UserService } from '../user.service';
import { User } from '../user';
import { NzTableQueryParams } from 'ng-zorro-antd/table';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule, NzTableModule, NzIconModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  users: any[] = [];
  total = 0;
  loading = true;
  pageSize = 5;
  pageIndex = 1;

  constructor(private userService: UserService, private http: HttpClient) {}

  ngOnInit(): void {
    const temp = new BehaviorSubject(JSON.parse(localStorage.getItem('arr') ?? ''));
    console.log(temp.value?.length);

    if (temp.value?.length > 0) {
      this.users = [...temp.value].slice(0, this.pageSize);
      this.total = 10;
      this.pageSize = this.pageSize;
      this.pageIndex = 1;
      console.log(this.total, this.pageSize, this.pageIndex);
    } else {
      this.loadDataFromServer(this.pageIndex, this.pageSize);
    }
  }

  onPageIndexChange($event: any) {
    this.pageIndex = $event;
    const temp = new BehaviorSubject(JSON.parse(localStorage.getItem('arr') ?? ''));
    console.log(temp.value?.length);
    const value = temp.value.slice(($event - 1) * this.pageSize, this.pageSize * this.pageIndex);
    this.users = [...value];
    console.log(value);
  }

  pageSizeChanged($event: any) {
    this.pageIndex = 1;
    this.pageSize = $event;
    
  }

  loadDataFromServer(pageIndex: number, pageSize: number): void {
    this.loading = false;
    this.getUsers(pageIndex, pageSize).subscribe(data => {
      const item = data.slice(0, 6);
      localStorage.setItem("arr", JSON.stringify(item));
      console.log(data);
      this.loading = false;
      this.total = item.length;
      this.users = item;
    });
  }

  getUsers(pageIndex: number, pageSize: number): Observable<User[]> {
    return this.http.get<User[]>(`https://jsonplaceholder.typicode.com/users?_page=${pageIndex}&_limit=${pageSize}`)
      .pipe(catchError(() => of([])));
  }

  deleteUser(id: number): void {
    const users = JSON.parse(localStorage.getItem('arr') || '[]') as User[];
    const updatedUsers = users.filter(user => user.id !== id);
    localStorage.setItem('arr', JSON.stringify(updatedUsers));
    this.users = this.users.filter(item => item.id !== id);
    alert('User deleted successfully');
  }

  onQueryParamsChange(params: NzTableQueryParams): void {
    const { pageSize, pageIndex } = params;
    this.pageSize = pageSize;
    this.pageIndex = pageIndex;
    this.loadDataFromServer(pageIndex, pageSize);
  }
}
