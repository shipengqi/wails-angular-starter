import { provideRouter, withHashLocation } from '@angular/router';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { inject, provideAppInitializer, ApplicationConfig, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';

import { en_US, provideNzI18n } from 'ng-zorro-antd/i18n';
import { provideTranslateHttpLoader } from '@ngx-translate/http-loader';
import { provideTranslateService, TranslateService } from '@ngx-translate/core';

import { routes } from './app.routes';

registerLocaleData(en);

const L10NInitializer = () => {
  const _translate = inject(TranslateService);
  console.log(`browser languages reported: ${navigator.languages}`);
  console.log(`setting user default language of : ${navigator.language}`);

  // always use the base language vs. language-tag
  const languageFamily = navigator.language.split('-');
  return _translate.use(languageFamily[0]);
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes, withHashLocation()), 
    provideNzI18n(en_US), 
    provideHttpClient(
      withFetch(),
      withInterceptors([])
    ),
    provideTranslateService({
      loader: provideTranslateHttpLoader({
          prefix: '/assets/i18n/',
          suffix: '.json'
      }),
      defaultLanguage: 'en'
    }),
    provideAppInitializer(L10NInitializer)
  ]
};
