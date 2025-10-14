import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'dashboard',
        loadComponent: () => import('./components/dashboard/dashboard').then(x => x.Dashboard),
        data: {
          title: 'dashboard.title',
          guard: 'root'
        }
    },
    {
        path: 'settings',
        loadComponent: () => import('./components/settings/settings').then(x => x.Settings),
        data: {
          title: 'settings.title',
          guard: 'root'
        }
    },
];
