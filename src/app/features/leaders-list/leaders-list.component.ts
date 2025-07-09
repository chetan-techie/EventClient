import { Component } from '@angular/core';
import { leaders } from '../../shared/utils/utils';

@Component({
  selector: 'app-leaders-list',
  templateUrl: './leaders-list.component.html',
  styleUrl: './leaders-list.component.css',
})
export class LeadersListComponent {
  get leaders() {
    return leaders;
  }
}
