import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../services/auth.service';
import { BackendService } from '../services/backend.service';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.scss']
})
export class DeleteComponent implements OnInit {
  
  activities: any = [];
  deleteForm!: FormGroup;
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

    this.deleteForm = this.fb.group({
      id: ['', Validators.required],
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

  deleteSubmit(form: FormGroup) {

    console.log(form.value);

    const payload = {
      id: form.value.id
    }

    this.backendService.deleteActivity(payload).subscribe((data: any) => {
      if (data.status === 'success') {
        this.toastr.success(data.message, 'success');
      } else {
        this.toastr.error(data.message, 'Error');
      }
      // console.log(data);
      form.reset();
    
      this.getUserActivities();
      
      this.router.navigate(['home']);
    }, err => {
      console.log(err);

    });

  }


}
