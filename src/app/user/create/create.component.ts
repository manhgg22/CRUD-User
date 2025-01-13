import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzAlertModule } from 'ng-zorro-antd/alert';

@Component({
  selector: 'app-create',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, NzAlertModule, NzButtonModule, NzInputModule],
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent {
  form!: FormGroup;

  constructor(public userService: UserService, private router: Router) {}

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

  submit() {
    if (this.form.valid) {
      console.log(this.form.value);
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

      this.userService.create(newUser).subscribe(() => {
        alert('User created successfully');
        this.router.navigateByUrl('/home');
      });
    }
  }

  goBack(): void {
    this.router.navigate(['/home']);
  }
}
