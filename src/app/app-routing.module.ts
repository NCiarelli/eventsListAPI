import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SearchCriteriaComponent } from './search-criteria/search-criteria.component';
import { EventListComponent } from './event-list/event-list.component';
import { BucketlistPageComponent } from './bucketlist-page/bucketlist-page.component';

const routes: Routes = [
  { path: 'bucketlist', component: BucketlistPageComponent },
  { path: 'event-list/:page', component: EventListComponent },
  { path: '', redirectTo: '/event-list/0', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
