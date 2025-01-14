import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../user';  
import { CommonModule } from '@angular/common';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzAlertModule } from 'ng-zorro-antd/alert';
import { EditComponent } from '../edit/edit.component';

@Component({
  selector: 'app-view',
  standalone: true,
  imports: [CommonModule, NzInputModule, NzButtonModule, NzAlertModule, EditComponent],
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {
  user: User | undefined;  
  editMode = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router 
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    const users = JSON.parse(localStorage.getItem('arr') || '[]') as User[]; 
    this.user = users.find(u => u.id === id);
  }

  goBack(): void {
    this.router.navigate(['/home']);  
  }

  onUpdate(updatedUser: User): void {
    this.user = updatedUser;
    this.editMode = false;
  }

  toggleEditMode(): void {
    this.router.navigate([`/edit/${this.user?.id}`]);
  }
}
