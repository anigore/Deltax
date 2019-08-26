import { Component, OnInit } from '@angular/core';
import { HttpService } from '../shared/http.service';

@Component({
  selector: 'app-movieslist',
  templateUrl: './movieslist.component.html',
  styleUrls: ['./movieslist.component.css']
})
export class MovieslistComponent implements OnInit {

  movieList: [];

  constructor(private http: HttpService, ) { }

  ngOnInit() {
    this.http.fetchMovieList().subscribe((res: any) => {
      this.movieList = res.movies;
      console.log('list>>>>>>>!', this.movieList)

    })

  }

  editMovie(movieId){

  }
}
