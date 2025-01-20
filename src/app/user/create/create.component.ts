import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzAlertModule } from 'ng-zorro-antd/alert';
import { NzModalModule, NzModalService } from 'ng-zorro-antd/modal';
import { NzMessageService } from 'ng-zorro-antd/message';


@Component({
  selector: 'app-create',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, NzAlertModule, NzButtonModule, NzInputModule,NzModalModule],
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {
  form!: FormGroup;

  constructor(private modal: NzModalService, private message: NzMessageService) {}

  ngOnInit() {
    this.form = new FormGroup({
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      phone: new FormControl('', Validators.required)
    });
  }

  get f() {
    return this.form.controls;
  }

  submit(): void {
    if (this.form.valid) {
      const storedUsers = JSON.parse(localStorage.getItem('arr') || '[]');

      const newId = storedUsers.length > 0
        ? Math.max(...storedUsers.map((user: any) => user.id)) + 1
        : 1;

      const newUser = {
        id: newId,
        ...this.form.value
      };

      const updatedUsers = [...storedUsers, newUser];
      localStorage.setItem('arr', JSON.stringify(updatedUsers));

      this.message.success('User created successfully');
      this.modal.closeAll(); 

    
    }
  }
}