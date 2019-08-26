import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpService } from '../shared/http.service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-add-actor',
  templateUrl: './add-actor.component.html',
  styleUrls: ['./add-actor.component.css']
})
export class AddActorComponent implements OnInit {

  actorsForm: FormGroup;
  constructor(private fb: FormBuilder,
    private http: HttpService,
    private router: Router,
    private location: Location) { }

  validationMessages = {
    'actorName': {
      'required': 'required field.',
    },

    'sex': {
      'required': 'required field.',
    },

    'dateOfBirth': {
      'required': 'required field.',
    },

    'bio': {
      'required': 'required field.'
    },
  };

  formErrors = {
    'actorName': '',
    'sex': '',
    'dateOfBirth': '',
    'bio': ''
  };

  ngOnInit() {


    this.actorsForm = this.fb.group({
      actorName: ['', Validators.required],
      sex: ['', Validators.required],
      dateOfBirth: ['', Validators.required],
      bio: ['', Validators.required],
    })

    this.actorsForm.valueChanges.subscribe((data) => {
      this.logValidationErrors(this.actorsForm);
    });
  }

  logValidationErrors(group: FormGroup = this.actorsForm): void {
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



  onClick() {
    this.http.createActor(this.actorsForm.value).subscribe((res: any) => {
      if (res.status == true) {
        this.actorsForm.reset()
        alert(res.message)
        this.actorsForm.setValue({
          actorName: '',
          sex: '',
          dateOfBirth: '',
          bio: ''
        });
        this.router.navigate(['/addmovie'])
      }
      else {
        alert(res.message)
      }

    })

  }
}
