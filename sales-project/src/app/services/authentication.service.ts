import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthenticationRequest } from '../modules/security/AuthenticationRequest';
import { map } from 'rxjs/operators';
import { AuthenticationResponse } from '../modules/security/AuthenticationResponse';
import { JwtTokenService } from './jwt-token.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private baseurl = 'http://localhost:8005/ECommerce/authentication-api/authenticate';
  constructor(private httpClient: HttpClient, private jwtTokenService: JwtTokenService) { }

  generateToken() {
    this.getToken().subscribe();
  }

  private getToken() {
    console.log(`generateToken:: before generate Token`);

    const request = new AuthenticationRequest(`username`, `mXV8Ybzb^Sy2v!TfN-?87#B6`);

    return this.httpClient.post<AuthenticationResponse>(this.baseurl, request).pipe(
      map(
        (authenticationResponse: AuthenticationResponse) => {
          console.log(authenticationResponse.token);
          this.jwtTokenService.saveToken(authenticationResponse.token);
          console.log(`generateToken:: after generate Token`);
        }
      )
    );
  }

}

