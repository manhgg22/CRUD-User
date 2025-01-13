import { Component, Output, EventEmitter, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { UserService } from '../user.service';
import { User } from '../user';
import { CommonModule } from '@angular/common';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzAlertComponent } from 'ng-zorro-antd/alert';

@Component({
  selector: 'app-edit',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, NzAlertComponent, NzButtonModule, NzFormModule, NzInputModule, NzGridModule],
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  @Input() user!: User;
  @Output() update = new EventEmitter<User>();
  form!: FormGroup;

  constructor(
    public userService: UserService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    if (!this.user) {
      const id = Number(this.route.snapshot.paramMap.get('id'));
      const users = JSON.parse(localStorage.getItem('arr') || '[]') as User[];
      this.user = users.find(u => u.id === id) || {} as User;
    }
    this.initializeForm();
  }

  initializeForm(): void {
    this.form = new FormGroup({
      name: new FormControl(this.user?.name, [Validators.required]),
      email: new FormControl(this.user?.email, [Validators.required, Validators.email]),
      phone: new FormControl(this.user?.phone, Validators.required)
    });
  }

  get f() {
    return this.form.controls;
  }

  submit(): void {
    if (this.form.valid) {
      const updatedUser: User = {
        ...this.user,
        ...this.form.value
      };
      const users = JSON.parse(localStorage.getItem('arr') || '[]') as User[];
      const index = users.findIndex(u => u.id === updatedUser.id);
      if (index !== -1) {
        users[index] = updatedUser;
        localStorage.setItem('arr', JSON.stringify(users));
      }
      alert('Data Updated Successfully');
      this.update.emit(updatedUser);
      this.goBack();  
    }
  }

  goBack(): void {
    this.router.navigate(['/home']);  
  }
}
