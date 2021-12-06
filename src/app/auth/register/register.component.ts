import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BackendService } from 'src/app/services/backend.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerForm!: FormGroup;
  submitForm = false;

  constructor(
    private fb: FormBuilder,
    private backendService: BackendService,
    private router: Router,
    private toastr: ToastrService
    
  ) { }

  ngOnInit(): void {

    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required]
   
    });
  }

  registerSubmit(form: FormGroup) {
    this.submitForm = true;
    // console.log(form.value);

    this.backendService.register(form.value).subscribe(data => {
      
      console.log(data);
      this.toastr.success('Registration Done!', 'Successfully');
      this.router.navigate(['']);
    }, err => {
      console.log(err);

    });
  }
}
