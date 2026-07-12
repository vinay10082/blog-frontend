import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home';
import { PostDetailComponent } from './components/post-detail/post-detail';
import { CreatePostComponent } from './components/create-post/create-post';
import { LoginComponent } from './components/login/login';
import { RegisterComponent } from './components/register/register';
import { ProfileComponent } from './components/profile/profile';
import { authGuard } from './auth.guard';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'profile', component: ProfileComponent, canActivate: [authGuard] },
  { path: 'post/new', component: CreatePostComponent, canActivate: [authGuard] },
  { path: 'post/:id', component: PostDetailComponent },
  { path: '**', redirectTo: '' }
];
