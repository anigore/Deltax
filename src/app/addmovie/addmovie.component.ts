import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpService } from '../shared/http.service';
import { Router, ActivatedRoute } from '@angular/router';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-addmovie',
  templateUrl: './addmovie.component.html',
  styleUrls: ['./addmovie.component.css']
})


export class AddmovieComponent implements OnInit {
  actors: any;
  selectedActors: any;
  movieForm: FormGroup;
  modalRef: BsModalRef;
  image: File
  movieId: any

  constructor(private fb: FormBuilder,
    private http: HttpService,
    private router: Router,
    private modalService: BsModalService,
    private activatedRoute: ActivatedRoute) { }

  validationMessages = {
    'movieName': {
      'required': 'required field.',
    },

    'yearOfRelease': {
      'required': 'required field.',
      'pattern': 'year is not right it should be 4 digits'

    },

    'plot': {
      'required': 'required field.'
    },

    'poster': {
      'required': 'required field.'
    },

    'actors': {
      'required': 'required field.'
    }
  };

  formErrors = {
    'movieName': '',
    'yearOfRelease': '',
    'plot': '',
    'poster': '',
    'actors': ''
  };

  ngOnInit() {

    this.activatedRoute.paramMap.subscribe(params => {
      this.movieId = params.get('id');
      console.log('id - ', this.movieId);
      if (this.movieId) {
        this.getSingleMovie(this.movieId);
      }
    })

    this.fetchActors();

    this.movieForm = this.fb.group({
      movieName: ['', Validators.required,],
      yearOfRelease: ['', [Validators.required, Validators.pattern('^[1-9][0-9]{3}$')]],
      plot: ['', Validators.required],
      poster: ['', Validators.required],
      actors: ['', Validators.required]
    })


    this.movieForm.valueChanges.subscribe((data) => {
      this.logValidationErrors(this.movieForm);
    });
  }

  logValidationErrors(group: FormGroup = this.movieForm): void {
    Object.keys(group.controls).forEach((key: string) => {
      const abstractControl = group.get(key);

      this.formErrors[key] = '';
      if (abstractControl && !abstractControl.valid && (abstractControl.touched || abstractControl.dirty)) {
        const messages = this.validationMessages[key];

        for (const errorkey in abstractControl.errors) {
          if (errorkey) {
            this.formErrors[key] += messages[errorkey] + ' ';

          }
        }
      }

      if (abstractControl instanceof FormGroup) {
        this.logValidationErrors(abstractControl);
      }
    });
  }

  uploadPoster(event) {
    this.image = event.files[0];
    this.http.uploadPhoto(this.image).subscribe((res: any) => {
      if (res.status == 'success') {
        this.movieForm.get('poster').setValue(res.docs);
      }
      else {
        alert(res.err)
      }
    });

  }

  getSingleMovie(movieId) {
    this.http.getSingleMovie(movieId).subscribe((res: any) => {
      console.log(res.docs)

      this.movieForm.patchValue({
        movieName: res.docs.movieName,
        yearOfRelease: res.docs.yearOfRelease,
        plot: res.docs.plot,
        poster:res.docs.poster,
        actors: res.docs.actors
      })

    })
  }

  fetchActors() {
    this.http.fetchActors().subscribe((res: any) => {
      if (res.status == true) {
        this.actors = res.actors
      }
      else {
        alert("Something is wrong");
        this.router.navigate(['/addmovie'])
      }

    })
  }
  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  refresh() {
    this.fetchActors();
    this.modalRef.hide()
  }


  onClick() {
    if (this.movieId) {
      this.http.updateMovie(this.movieForm.value, this.movieId).subscribe((res: any) => {
        if (res.status == true) {
          alert(res.message)
          this.router.navigate(['/movieslist'])
        }
        else {
          alert(res.err)
        }
      })
    } else {
      this.http.createMovie(this.movieForm.value).subscribe((res: any) => {
        if (res.status == true) {
          alert(res.message)
          this.router.navigate(['/movieslist'])
        }
        else {
          alert(res.err)
        }
      })
    }
  }
}
