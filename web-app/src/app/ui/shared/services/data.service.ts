import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private displaySource = new BehaviorSubject(false);
  display = this.displaySource.asObservable();

  constructor() {
  }

  displayTerms(display: boolean) {
    this.displaySource.next(display);
  }
}
