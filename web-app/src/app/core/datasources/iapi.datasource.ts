import {Observable} from 'rxjs';

export abstract class IApiDatasource {
  abstract get<T>(url: string, accessToken?: string, options?: any): Observable<T>;

  abstract post<T>(url: string, body: any | null, accessToken?: string, options?: any): Observable<T>;

  abstract put<T>(url: string, body: any | null, accessToken?: string, options?: any): Observable<T>;

  abstract patch<T>(url: string, body: any | null, accessToken?: string, options?: any): Observable<T>;

  abstract delete<T>(url: string, accessToken?: string, options?: any): Observable<T>;
}
