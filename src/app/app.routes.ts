import { Routes } from '@angular/router';
import { HomeComponent } from './user/home/home.component';
import { CreateComponent } from './user/create/create.component';
import { EditComponent } from './user/edit/edit.component';
import { ViewComponent } from './user/view/view.component';

export const routes: Routes = [

  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'create', component: CreateComponent },
  { path: 'edit/:id', component: EditComponent },
  { path: 'view/:id', component: ViewComponent },
  { path: '**', redirectTo: 'home' }
];
