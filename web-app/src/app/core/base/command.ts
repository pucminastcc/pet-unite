import {Observable} from 'rxjs';

export interface Command<S, T> {
  execute(params: S): Observable<T>
}
