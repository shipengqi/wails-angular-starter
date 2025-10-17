import { Component, ViewEncapsulation } from '@angular/core';

declare global {
  interface Window {
    backend: any;
  }
}

@Component({
  selector: 'app-topbar',
  imports: [],
  templateUrl: './topbar.html',
  styleUrl: './topbar.less'
})
export class Topbar {
  async runCommand(cmd: string) {
    const result = await window.backend.App.RunCommand(cmd);
    console.log(result);
  }
}
