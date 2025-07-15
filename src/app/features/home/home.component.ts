import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import Swiper from 'swiper';
import 'swiper/css';
import { EventsService } from '../../core/services/events.service';
import { baseImageUrl, Testimonials } from '../../shared/utils/utils';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  @ViewChild('parentElement') cardContainer: ElementRef;
  events: any = [];
  cardContainerheight: number = 0;
  carousel = [
    '../../../assets/carousel/001.jpg',
    '../../../assets/carousel/002.jpg',
    '../../../assets/carousel/003.jpg',
    '../../../assets/carousel/004.jpg',
    '../../../assets/carousel/005.jpg',
    '../../../assets/carousel/006.jpg',
    '../../../assets/carousel/007.jpg',
  ];
  testimonials: any = [];

  swiper: any = {};
  isLoading: boolean = true;

  constructor(private router: Router, private es: EventsService) {
    this.getEvents();
    this.swiper = new Swiper('.swipertag', {
      slidesPerView: 1,
      spaceBetween: 30,
      // pagination: {
      //   clickable: true,
      // },
      breakpoints: {
        0: {
          slidesPerView: 1,
        },
        768: {
          slidesPerView: 2,
        },
        1024: {
          slidesPerView: 3,
        },
      },
      // loop: true,
      // spaceBetween: 30,

      // // If we need pagination
      pagination: {
        el: '.swiper-pagination',
      },

      // Navigation arrows
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
    });
  }
  ngOnInit(): void {
    setTimeout(() => {
      this.getEvents();
    });

    const priority = Math.floor(Math.random() * 2) + 1;

    this.testimonials = Testimonials.filter(
      (testimonial) => testimonial.priority === priority
    );
  }

  getEvents(): void {
    this.es.getEvents().subscribe((events: any) => {
      this.isLoading = false;
      this.events = events
        .map((event: any) => ({
          ...event,
          imagePath: `${baseImageUrl}/${event.imagePath}`,
        }))
        .filter((e: any) => e.eventType === 'image')
        .sort(
          (a: any, b: any) =>
            new Date(b.eventDate).getTime() - new Date(a.eventDate).getTime()
        )
        .slice(0, 3);
    });
  }

  readMore(path: string): void {
    this.router.navigate([path]);
  }

  navigateToGallery(): void {
    this.router.navigate(['/gallery-events']);
  }
}
