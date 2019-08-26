import { Component, OnInit } from '@angular/core';
import { HttpService } from '../shared/http.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-movieslist',
  templateUrl: './movieslist.component.html',
  styleUrls: ['./movieslist.component.css']
})
export class MovieslistComponent implements OnInit {

  movieList: [];

  constructor(private http: HttpService,
    private router: Router) { }

  ngOnInit() {
    this.http.fetchMovieList().subscribe((res: any) => {
      this.movieList = res.movies;
    })
  }

  editMovie(movieId:number) {
    this.router.navigate(['editmovie',movieId]);
  }
}
