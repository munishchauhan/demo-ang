import { MatSnackBar } from '@angular/material/snack-bar';
import { ServiceUnavailableTrackService } from './../services/service-unavailable-track.service';
import { Observable, throwError } from 'rxjs';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';

@Injectable()
export class ServiceUnavailableInterceptor implements HttpInterceptor {
    private isExceptionHandled: boolean = false;

    constructor(private serviceUnavailableTrackService: ServiceUnavailableTrackService,
        private alertService: MatSnackBar) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<any> {
        return next.handle(request).pipe(
            catchError((error: HttpErrorResponse) => {
                if (error.status === 403 || error.status === 502 || error.status === 503 || error.status === 0) {
                    this.serviceUnavailableTrackService.emitServiceUnavailableError();

                    if (!this.isExceptionHandled) {
                        this.alertService.open(`
                            <h5 class='text-center text-danger'><strong>API is down.<strong></h5>
                            <h5 class='text-center'>We are sorry, but the further actions are not allowed.</h5>
                            <h5 class='text-center'>Try to open application a bit later.</h5>
                        `);

                        this.isExceptionHandled = true;
                    }

                } else {
                    return throwError(error);
                }
            })
        );
    }
}