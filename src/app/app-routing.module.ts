import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { MovieslistComponent } from './movieslist/movieslist.component';
import { AddmovieComponent } from './addmovie/addmovie.component';
import { AddActorComponent } from './add-actor/add-actor.component';


const routes: Routes = [
  { path: '', component: MovieslistComponent },
  { path: 'movieslist', component: MovieslistComponent },
  { path: 'addmovie', component: AddmovieComponent },
  { path: 'editmovie/:id', component: AddmovieComponent },

  // { path: '**', component: InvalidComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
