import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const BASE_URL = ["http://localhost:8080/"]

@Injectable({
  providedIn: 'root'
})
export class JwtService {

  constructor(private http: HttpClient) { }

  register(signRequest:any): Observable<any>{
    return this.http.post(BASE_URL+'auth/register',signRequest)
  }

  login(loginRequest: any): Observable<any> {
    return this.http.post(BASE_URL + 'auth/login', loginRequest)
  }

  loadUsers(): Observable<any>{
    const headers = this.createAuthorizationHeader(); // Crear las cabeceras
    const options = headers ? { headers } : {}; // Solo incluir cabeceras si existen
    return this.http.get(BASE_URL + 'api/users/public', options)
  }

  deleteUser(email:string): Observable<any>{
    const headers = this.createAuthorizationHeader(); // Crear las cabeceras
    const options = headers ? { headers } : {}; // Solo incluir cabeceras si existen
    console.log(options)
    return this.http.delete(BASE_URL + 'api/users/admin/' + email, options)

  }


  private createAuthorizationHeader() {
      const jwtToken = localStorage.getItem('jwt');
      if (jwtToken) {
        return new HttpHeaders().set(
          "Authorization", "Bearer " + jwtToken
        )
      } else {
        console.log("JWT token not found in local storage");
        return null
      }
 
  }
}
