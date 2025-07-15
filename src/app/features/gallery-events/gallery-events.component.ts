import { Component, OnInit } from '@angular/core';
import { EventsService } from '../../core/services/events.service';
import { baseImageUrl } from '../../shared/utils/utils';

@Component({
  selector: 'app-gallery-events',
  templateUrl: './gallery-events.component.html',
  styleUrls: ['./gallery-events.component.scss'],
})
export class GalleryEventsComponent implements OnInit {
  events: any = [];
  isLoading: boolean = true;

  constructor(private es: EventsService) {}

  ngOnInit(): void {
    this.es.getEvents().subscribe((events: any) => {
      this.isLoading = false;
      this.events = events
        .map((event: any) => {
          return {
            ...event,
            imagePath: `${baseImageUrl}/${event.imagePath}`,
          };
        })
        .filter((e: any) => e.eventType === 'image')
        .sort(
          (a: any, b: any) =>
            new Date(b.eventDate).getTime() - new Date(a.eventDate).getTime()
        );
    });
  }
}
