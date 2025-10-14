import { PLATFORM_ID, inject } from '@angular/core';
import { DOCUMENT, isPlatformServer } from '@angular/common';

export function stopAppLoader(): () => void {
  const doc: Document = inject(DOCUMENT);
  const ssr = isPlatformServer(inject(PLATFORM_ID));
  if (ssr) {
    return () => {};
  }
  const body = doc.querySelector<HTMLBodyElement>('body')!;
  body.style.overflow = 'hidden';
  let done = false;

  return () => {
    if (done) return;

    done = true;
    const appLoader = doc.querySelector<HTMLElement>('.app-loader');
    if (appLoader == null) return;

    const CLS = 'app-loader-hidden';
    appLoader.addEventListener('transitionend', () => {
      appLoader.className = CLS;
    });
    appLoader.className += ` ${CLS}-add-active`;
    body.style.overflow = '';
  };
}