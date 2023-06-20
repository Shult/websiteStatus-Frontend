import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WebsiteComponent } from './components/website.component';

const routes: Routes = [
  { path: 'websites', component: WebsiteComponent },
  { path: '', redirectTo: '/websites', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
