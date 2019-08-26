/* ** this is the custom validation class in which we write
 reusable custome validation function to check the data fields ** */

 
 import {AbstractControl} from '@angular/forms';
 import { from } from 'rxjs';
 
 export class CustomValidation {
      
 
   /* ** this custom validation function check the username pattern ** */
 static dateOfBirthValidator(){
     return (control:AbstractControl) : {[key : string] : any} | null => {
     const dateOfBirth : string = control.value;
     
     const currentDate = new Date();
     
     
     if(dateOfBirth) {
       return null;
     } 
     else{
       return { 'dateOfBirthField' : true };
     }
   };
 }
 }  