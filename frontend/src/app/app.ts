import { Title } from '@angular/platform-browser';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Component, OnInit, DestroyRef, inject, signal } from '@angular/core';
import { Router, RouterOutlet, RouterLink, RouteConfigLoadStart, NavigationError, NavigationEnd } from '@angular/router';

import { TranslateService } from '@ngx-translate/core';

import { stopAppLoader } from './core/utils/preloader';
import { WindowSetTitle } from '../../wailsjs/runtime/runtime';

@Component({
  selector: 'app-root',
  imports: [
    RouterLink,
    RouterOutlet
],
  standalone: true,
  templateUrl: './app.html',
  styleUrl: './app.less'
})
export class App implements OnInit {
  protected readonly title = signal('frontend');
  private readonly _router = inject(Router);
  private _destroyRef = inject(DestroyRef);


  private stopAppLoader = stopAppLoader();

  constructor(
    private _translate: TranslateService,
    private _title: Title
  ) {}

  ngOnInit(): void {
    let configLoad = false;
    this._router.events.pipe(takeUntilDestroyed(this._destroyRef)).subscribe(ev => {
      if (ev instanceof RouteConfigLoadStart) {
        configLoad = true;
      }
      if (configLoad && ev instanceof NavigationError) {
        // Todo Prompts that the page needs to be refreshed (new version), or fails to load
      }
      if (ev instanceof NavigationEnd) {
        this.stopAppLoader();

        const route = this._router.routerState.snapshot.root;
        this.setTitle(route);
      }
    });
  }

  private setTitle(route: any): void {
    let title = '';
    while (route) {
      if (route.data && route.data['title']) {
        title = route.data['title'];
        break;
      }
      route = route.firstChild;
    }
    if (title === '') {
      title = 'Polaris';
    } else {
      title = 'Polaris - ' + this._translate.instant(title);
    }

    // browser
    this._title.setTitle(title);
    // wails
    WindowSetTitle(title);
  }
}
