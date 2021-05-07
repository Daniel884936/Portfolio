import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import {HostListener} from '@angular/core';
import emailjs, { EmailJSResponseStatus } from 'emailjs-com';
import {environment as env} from '../../../environments/environment'
import Swal from 'sweetalert2'

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
  onSubmit(event: Event):void{
    if(this.form.invalid){
      this.maskAllControlsAsTouched();
      return;
    }
    console.log(this.form);
    this.sendEmail(event);
  }

  public sendEmail(e: Event) {
    const emailConfig = env.emailCofig;
    emailjs.sendForm(emailConfig.SERVICE_ID, emailConfig.TEMPLATE_ID, e.target as HTMLFormElement, env.emailCofig.USER_ID)
      .then((result: EmailJSResponseStatus) => {
        console.log(result.text);
        this.form.reset();
        this.displaySuccessMixinDialog('Sended successfully');
      }, (error) => {
         this.displayErrorDialog(error.text)
        console.log(error.text);
      });
  }


  private  displaySuccessMixinDialog(message:string){
    const Toast = Swal.mixin({
      toast: true,
      position: 'top',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
      }
    })
    Toast.fire({
      icon: 'success',
      title: message
    })
  }

  private  displayErrorDialog(message:string){
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: message
    })
  }

  private maskAllControlsAsTouched():void{
    Object.values(this.form.controls).forEach(control=>{
      if (control.invalid){
        control.markAsTouched();
      }
    })
  }
}
