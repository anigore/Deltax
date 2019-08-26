import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) { }

  commanURL: 'http://localhost:3000';

  getMovielistURL = 'http://localhost:3000/deltax/movieList/';
  addMovieURL = 'http://localhost:3000/deltax/addMovie/';
  addActorURL = 'http://localhost:3000/deltax/addActor/';
  getActors = 'http://localhost:3000/deltax/getActors/';
  uploadPhotoURL = 'http://localhost:3000/deltax/uploadPhoto/';

  createMovie(data) {
    return this.http.post<any>(this.addMovieURL, data)
  }

  public uploadPhoto(image: File) {
    const formData = new FormData();
    formData.append('photo', image);

    console.log('form data', formData);
    return this.http.post(this.uploadPhotoURL, formData);
  }

  createActor(data) {
    return this.http.post<any>(this.addActorURL, data)
  }

  fetchMovieList() {
    return this.http.get(this.getMovielistURL);
  }

  fetchActors() {
    return this.http.get(this.getActors);
  }
}
