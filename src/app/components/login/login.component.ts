import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: false
})
export class LoginComponent implements OnInit {

  constructor(
    private router: Router,
    private localStorageService: LocalStorageService,
    private httpService: HttpService  
  ) { }

  public user = new FormControl('');
  public password = new FormControl('');

  ngOnInit() {
    this.localStorageService.setItem('loggedIn', false); 
  }

  login() {
    const payload = {
      name: this.user.value,
      password: this.password.value
    };

    this.httpService.post('get-user', payload)
      .subscribe((response: any) => {  
        console.log('response from server', response);  
        if (response.ok) {
          this.localStorageService.setItem('loggedIn', true); 
          this.router.navigate(['/home']);
        } else {
          alert(response.message);
        }
      });
  }
}



  /*console.log('User: ', this.user.value );
    console.log('Password: ', this.password.value);
    if(this.user.value === 'admin' && this.password.value === 'Admin123'){
      this.localStorageService.setItem('logedIn', true);
      this.router.navigate(['/home']);
    } else {
      alert('User or password incorrect');
    }
    
  }
} */