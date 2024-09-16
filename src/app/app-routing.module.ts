import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeListComponent } from '../components/add-details/employee-list/employee-list.component';

const routes: Routes = [
  {
  path:'employee-list',component:EmployeeListComponent
  },
  {path:'',redirectTo:'/employee-list',pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
