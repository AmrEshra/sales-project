import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AuthenticationService } from './authentication.service';
import { map } from 'rxjs/internal/operators/map';
import { AuthenticationResponse } from '../modules/security/AuthenticationResponse';

describe('AuthenticationService', () => {
  let service: AuthenticationService;
  let httpTestingController: HttpTestingController;

  console.log(`get Token`);
  console.log(`get Tokendfdfdsf`);
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthenticationService]
    });

    service = TestBed.inject(AuthenticationService);
    httpTestingController = TestBed.inject(HttpTestingController);

  });

  it('should get Token here', () => {

    expect(service).toBeTruthy();
    const token = service.generateToken();

  });
});
