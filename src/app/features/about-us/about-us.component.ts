import { Component } from '@angular/core';
import { busdrivers, faculty, nonFaculty } from '../../shared/utils/utils';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrl: './about-us.component.css',
})
export class AboutUsComponent {
  faculty = faculty;
  nonfaculty = nonFaculty;
  busdrivers = busdrivers;
  constructor() {
    window.scrollTo(0, 0);
  }
}
