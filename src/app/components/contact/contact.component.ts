import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder, Validators, FormControl} from '@angular/forms';
import {HostListener} from '@angular/core';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  form: FormGroup;
  constructor(private readonly _formBuilder: FormBuilder) {
    this.buildForm();
   }

   hasRequieredError(controlName: string):boolean{
     const control = this.form.get(controlName);
     return control.errors?.required && control.touched;
   }

   hasEmailError(controlName: string):boolean{
    const control = this.form.get(controlName);
    return control.errors?.email && control.touched;
  }

   hasAnyError(controlName: string):boolean{
    const control = this.form.get(controlName);
    return control.errors && control.touched;
  }

  ngOnInit(): void {
  }

  private buildForm(): void{
    this.form = this._formBuilder.group({
      name : ['', Validators.required],
      email : ['', [Validators.required, Validators.email]],
      description : ['', Validators.required]
    })
  }

@HostListener('submit',['$event'])
  onSubmit():void{
    if(this.form.invalid){
      Object.values(this.form.controls).forEach(control=>{
        if (control.invalid){
          control.markAsTouched();
        }
      })
    }
    console.log(this.form);
  }
}
