import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DetailPageComponent } from './detail-page/detail-page.component';
import { StartPageComponent } from './start-page/start-page.component';

const routes: Routes = [
  {
    path: '',
    component: StartPageComponent
  },
  {
    path: 'photo',
    component: DetailPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
