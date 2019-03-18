import { Injectable, Injector, NgModule } from '@angular/core';
import { HttpInterceptor, HttpEvent, HttpRequest, HttpHandler, HttpClientModule, HTTP_INTERCEPTORS, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { AuthenticationService } from 'app/_services/authentication/authentication.service';
import { catchError } from 'rxjs/operators/catchError';

@NgModule({
  imports: [HttpClientModule],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpsRequestInterceptor,
      multi: true,
    },
  ],
})

@Injectable()
export class HttpsRequestInterceptor implements HttpInterceptor {

  private authService: AuthenticationService;

  constructor(
    private injector: Injector
  ) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.authService = this.injector.get(AuthenticationService);

    let token = this.authService.getToken();
    if (token) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
    }

    console.log(request);
    return next.handle(request);
  }

}


