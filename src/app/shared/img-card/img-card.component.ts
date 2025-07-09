import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-img-card',
  templateUrl: './img-card.component.html',
  styleUrl: './img-card.component.css',
})
export class ImgCardComponent {
  @Input()
  card: any = null;
  get url() {
    return (
      'url("../../../../assets/photos/leaders/' + this.card.profile + '.jpg")'
    );
  }
}
