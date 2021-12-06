import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class BackendService {

  constructor(
    private httpClient: HttpClient,
    private authService: AuthService
  ) { }

  register(payload: any) {
    return this.httpClient.post('http://localhost/php-rest-practise/api/register.php', payload);
  }

  
  login(payload: any) {

    return this.httpClient.post('http://localhost/php-rest-practise/api/login.php', payload);

  }

    
  userProfile() {

    const header = {
      headers: new HttpHeaders()
        .set('Authorization', 'Bearer ' + this.authService.getToken())
    };

    const body = {
      "id": this.authService.getLoggedInUserId()
    }

    return this.httpClient.post('http://localhost/php-rest-practise/api/user-profile.php', body, header);
  }


  getUserActivities(payload: any) {
    const header = {
      headers: new HttpHeaders()
        .set('Authorization', 'Bearer ' + this.authService.getToken())
    };

    return this.httpClient.post('http://localhost/php-rest-practise/api/get-user-activities.php', payload, header);
  }
  

  addActivity(payload: any) {
     
    const header = {
      headers: new HttpHeaders()
         .set('Authorization', 'Bearer ' + this.authService.getToken())
    };

    return this.httpClient.post('http://localhost/php-rest-practise/api/add-user-activities.php', payload, header);
  }


  updateActivity(payload: any) {
    const header = {
      headers: new HttpHeaders()
        .set('Authorization', 'Bearer ' + this.authService.getToken())
    };

    return this.httpClient.post('http://localhost/php-rest-practise/api/update-activities.php', payload, header);
  }

  
  deleteActivity(payload: any) {
    const header = {
      headers: new HttpHeaders()
        .set('Authorization', 'Bearer ' + this.authService.getToken())
    };

    return this.httpClient.post('http://localhost/php-rest-practise/api/delete-activities.php', payload, header);
  }

}

