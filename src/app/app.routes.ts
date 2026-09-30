import { Routes } from '@angular/router';
import { TodoComponent } from './todo/todo.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { TodoDetailComponent } from './todo/todo-detail/todo-detail.component';
import { AccountComponent } from './pages/settings/account/account.component';
import { ProfileComponent } from './pages/settings/profile/profile.component';
import { SettingsComponent } from './pages/settings/settings.component';
export const routes: Routes = [
  { path: '', redirectTo: 'todos', pathMatch: 'full' },
  { path: 'todos/:id', component: TodoDetailComponent, title: 'Todo Detail' },

  { path: 'todos', component: TodoComponent,  title: 'All Todos' },
  { path: 'about',
    loadComponent: () =>
        import('./pages/about/about.component')
        .then(m => m.AboutComponent),
    title: 'About' },
{ path: 'settings',
  component: SettingsComponent,
  title: 'Settings',
  children: [

    { path: '', redirectTo: 'profile', pathMatch: 'full' },

    { path: 'profile', component: ProfileComponent, title: 'Profile' },
    { path: 'account', component: AccountComponent, title: 'Account' }

  ] },
  { path: '**', component: NotFoundComponent, title: 'Not Found' }

];
