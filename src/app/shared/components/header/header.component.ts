import { Component, Input, NgZone } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  @Input()
  isAdmin: boolean = false;
  isMenuCollapsed: boolean = true;

  constructor(private ngZone: NgZone) {}

  triggerTimeout(): void {
    this.ngZone.runOutsideAngular(() => {
      setTimeout(() => {
        this.ngZone.run(() => {
          // Your code here
        });
      }, 3000);
    });
  }

  logout(): void {
    // Your code here
  }
}
