import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WebsiteComponent } from './components/website.component';
import { CompareLogsComponent } from './compare-logs/compare-logs.component'

const routes: Routes = [
  { path: 'websites', component: WebsiteComponent },
  { path: '', redirectTo: '/websites', pathMatch: 'full' },
  { path: 'logs-compare', component: CompareLogsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
