import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

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
  user!: User;
  form!: FormGroup;

  @ViewChild('nameDisplay', { static: true }) nameDisplay!: ElementRef; 

  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    const users = JSON.parse(localStorage.getItem('arr') || '[]') as User[];
    this.user = users.find(u => u.id === id) || ({} as User);
    this.initializeForm();
   
    this.updateNameDisplay(this.user?.name);
    this.form.get('name')?.valueChanges.subscribe(value => {
      this.updateNameDisplay(value);
    });
  }

  initializeForm(): void {
    this.form = new FormGroup({
      name: new FormControl(this.user?.name, [Validators.required]),
      email: new FormControl(this.user?.email, [Validators.required, Validators.email]),
      phone: new FormControl(this.user?.phone, [Validators.required])
    });
  }

  updateNameDisplay(value: string): void {
    if (this.nameDisplay) {
      this.nameDisplay.nativeElement.textContent = value || 'No Name';
    }
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
      this.goBack();
    }
  }

  goBack(): void {
    this.router.navigate(['/home']);
  }
}