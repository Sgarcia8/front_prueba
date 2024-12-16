import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { JwtService } from '../../services/jwt.service';

@Component({
  standalone: false,
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;

  constructor(
    private service: JwtService,
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
    })
  }

  submitForm() {
    this.service.login(this.loginForm.value).subscribe(
      (response) => {
        console.log(response)
        if (response.token != null) {

          alert("Se ha logueado con exito");
          const jwtToken = response.token;
          const user = response.user;
          localStorage.setItem('jwt', jwtToken);
          localStorage.setItem('user', JSON.stringify(user))
          this.router.navigateByUrl("/dashboard");
        }
      }
    )
  }

}
