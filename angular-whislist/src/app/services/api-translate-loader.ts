import { HttpClient } from '@angular/common/http';
import { TranslateLoader } from '@ngx-translate/core';
import { Observable } from 'rxjs';

/**
 * Custom TranslateLoader that carga los labels desde el backend API.
 * GET /api/translations/:lang
 */
export class ApiTranslateLoader implements TranslateLoader {
  constructor(private http: HttpClient) {}

  getTranslation(lang: string): Observable<any> {
    return this.http.get(`/api/translations/${lang}`);
  }
}

export function createApiTranslateLoader(http: HttpClient): ApiTranslateLoader {
  return new ApiTranslateLoader(http);
}
