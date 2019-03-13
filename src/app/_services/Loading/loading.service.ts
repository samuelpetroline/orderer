import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable()
export class LoadingService {

  private source = new BehaviorSubject(false);
  public status = this.source.asObservable();

  getStatus(): Observable<boolean> {
    return this.source;
  }

  setStatus(status: boolean) {
    this.source.next(status);
  }

  showLoader(): void {
    this.setStatus(true);
  }

  hideLoader(): void {
    this.setStatus(false);
  }

}
