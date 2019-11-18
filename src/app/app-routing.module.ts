import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SearchCriteriaComponent } from './search-criteria/search-criteria.component';
import { EventListComponent } from './event-list/event-list.component';
import { BucketlistPageComponent } from './bucketlist-page/bucketlist-page.component';

const routes: Routes = [
  // { path: "search", component: SearchCriteriaComponent },
  { path: 'event-list', component: EventListComponent },
  { path: 'bucketlist', component: BucketlistPageComponent },
  { path: '', redirectTo: '/event-list', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
