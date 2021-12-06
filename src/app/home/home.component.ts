import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../services/auth.service';
import { BackendService } from '../services/backend.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  activities: any = [];
  activityForm!: FormGroup;
  submitForm = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private backendService: BackendService,
    private authService: AuthService,
    private toastr: ToastrService,
  ) { }

  ngOnInit(): void {

    this.activityForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
    });

    this.userProfile();
    this.getUserActivities();
  }


  logout() {
    localStorage.setItem('authData', null || '{}');
    this.router.navigate(['']);

  }

  userProfile() {
    this.backendService.userProfile().subscribe(data => {
      // console.log(data);

    }, err => {
      console.log(err)
    });
  }

  getUserActivities() {
    const payload = {
      userId: this.authService.getLoggedInUserId()
    }

    this.backendService.getUserActivities(payload).subscribe((data: any) => {
      this.activities = data.data;
      console.log(this.activities);
    }, err => {
      console.log(err)


    });
  }

  


  activitySubmit(form: FormGroup) {

    console.log(form.value);

    const payload = {
      userId: this.authService.getLoggedInUserId(),
      title: form.value.title,
      description: form.value.description
    }

    this.backendService.addActivity(payload).subscribe(data => {
      console.log(data);
      form.reset();
      this.toastr.success('Activity Added!', 'Successfully');
      this.getUserActivities();

    }, err => {
      console.log(err);


    });
  }


}
