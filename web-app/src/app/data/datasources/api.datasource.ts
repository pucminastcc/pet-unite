import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {IApiDatasource} from '../../core/datasources/iapi.datasource';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiDatasource implements IApiDatasource {

  private readonly options: any;

  constructor(private readonly http: HttpClient) {
    this.options = {
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        Accept: 'application/json'
      }
    };
  }

  get<T>(url: string, accessToken?: string, options?: any): Observable<T> {
    // @ts-ignore
    return this.http.get<T>(url, {
      headers: {
        ...this.options.headers,
        Authorization: 'Bearer ' + accessToken
      },
      ...options
    });
  }

  post<T>(url: string, body: any | null, accessToken?: string, options?: any): Observable<T> {
    // @ts-ignore
    return this.http.post<T>(url, JSON.stringify(body), {
      headers: {
        ...this.options.headers,
        Authorization: 'Bearer ' + accessToken
      },
      ...options
    });

  }

  put<T>(url: string, body: any | null, accessToken?: string, options?: any): Observable<T> {
    // @ts-ignore
    return this.http.put<T>(url, JSON.stringify(body), {
      headers: {
        ...this.options.headers,
        Authorization: 'Bearer ' + accessToken
      },
      ...options
    });
  }

  patch<T>(url: string, body: any | null, accessToken?: string, options?: any): Observable<T> {
    // @ts-ignore
    return this.http.patch<T>(url, JSON.stringify(body), {
      headers: {
        ...this.options.headers,
        Authorization: 'Bearer ' + accessToken
      },
      ...options
    });
  }

  delete<T>(url: string, accessToken?: string, options?: any): Observable<T> {
    // @ts-ignore
    return this.http.delete<T>(url, {
      headers: {
        ...this.options.headers,
        Authorization: 'Bearer ' + accessToken
      },
      ...options
    });
  }
}
