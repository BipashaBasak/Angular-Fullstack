import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../services/auth.service';
import { BackendService } from '../services/backend.service';

@Component({
  selector: 'app-activity',
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.scss']
})
export class ActivityComponent implements OnInit {

  activities: any = [];
  updateForm!: FormGroup;
  submitForm = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private backendService: BackendService,
    private authService: AuthService,
    private toastr: ToastrService,
  ) { }

  ngOnInit(): void {

    this. getUserActivities();
    

    this.updateForm = this.fb.group({

      id: ['', Validators.required],
      title: ['', Validators.required],
      description: ['', Validators.required],

    });

  }

  getUserActivities() {
    const payload = {
      userId: this.authService.getLoggedInUserId()
    }

    this.backendService.getUserActivities(payload).subscribe((data: any) => {
      this.activities = data.data;
      // console.log(this.activities);
    }, err => {
      console.log(err)
    
    });
  }


  updateSubmit(form: FormGroup) {

    console.log(form.value);

    const payload = {
      id: form.value.id,
      userId: this.authService.getLoggedInUserId(),
      title: form.value.title,
      description: form.value.description
    }

    this.backendService.updateActivity(payload).subscribe((data: any) => {
      if (data.status === 'success') {
        this.toastr.success(data.message, 'success');
      } else {
        this.toastr.error(data.message, 'Error');
      }

      form.reset();
      // this.toastr.success('Activity Updated!', 'Successfully');
      this.getUserActivities();

      this.router.navigate(['home']);
      
    }, err => {
      console.log(err);


    });
  }

}