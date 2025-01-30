import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomePageComponent} from './home-page/home-page.component';
import {JobCreateComponent} from './job-create/job-create.component';
import {JobListComponent} from './job-list/job-list.component';
import {JobEditComponent} from './job-edit/job-edit.component';

const routes: Routes = [

  { path: '', redirectTo: 'jobs/create', pathMatch: 'full' }, // Redirect default path to JobCreateComponent
  { path: 'jobs/create', component: JobCreateComponent, title: 'JobCreate' },
  { path: 'jobs', component: JobListComponent, title: 'Jobs List' },
  { path: 'jobs/edit/:jobid', component: JobEditComponent, title: 'JobEdit' },
  { path: '**', redirectTo: 'jobs/create' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
