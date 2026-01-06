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
  videoEvents: any = [];
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
  hallOfFameEntries = [
    {
      id: 1,
      studentName: 'Deekshitha Salagundi',
      class: '10C',
      achievement:
        'Awarded Certificate of Excellence at National-level YIP, Delhi for outstanding performance.',
      imageUrl: '../../../assets/hallofFame/deekshitha10C_1.jpg',
    },
    {
      id: 1,
      studentName: 'Deekshitha Salagundi',
      class: '10C',
      achievement:
        'Selected for National Level YIP which will be held in Delhi',
      imageUrl: '../../../assets/hallofFame/deekshitha10C.jpg',
    },
    {
      id: 2,
      studentName: 'Vaibhav Vittal',
      class: '9B',
      achievement: 'Selected for state level wrestling competition',
      imageUrl: '../../../assets/hallofFame/vaibhav9b.jpg',
    },
    {
      id: 3,
      studentName: 'Sushruth',
      class: '10C',
      achievement: 'Selected for state level wrestling competition',
      imageUrl: '../../../assets/hallofFame/sushruth10C.jpg',
    },
    {
      id: 4,
      studentName: 'Srujan S',
      class: '10A',
      achievement: 'Selected for state level Handball',
      imageUrl: '../../../assets/hallofFame/srujan10A.jpg',
    },
    {
      id: 5,
      studentName: 'Gowrishree S',
      class: '9C',
      achievement: 'Group Level Best Cadet in NCC 3 Kar Battalion',
      imageUrl: '../../../assets/hallofFame/thumbnail1.jpg',
    },
    {
      id: 6,
      studentName: 'Pareekshith Raj P',
      class: '8C',
      achievement: 'Bagged prizes in Bhagavad Gita and Singing Competitions',
      imageUrl: '../../../assets/hallofFame/thumbnail2.jpg',
    },
    {
      id: 7,
      studentName: 'Pranamya Prasad',
      class: '8C',
      achievement: 'Bagged prizes in Karate Competitions',
      imageUrl: '../../../assets/hallofFame/thumbnail3.jpg',
    },
  ];

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

      this.videoEvents = events
        .filter((e: any) => e.eventType === 'video' && e.active)
        .sort(
          (a: any, b: any) =>
            new Date(b.eventDate).getTime() - new Date(a.eventDate).getTime()
        )
        .slice(0, 3);
    });
  }

  getYouTubeEmbedUrl(url: string | undefined): string {
    if (!url) return '';

    // Convert YouTube URL to embed URL
    const videoId = this.extractYouTubeVideoId(url);
    return videoId ? `https://www.youtube.com/embed/${videoId}` : url;
  }

  readMore(path: string): void {
    this.router.navigate([path]);
  }

  navigateToGallery(type?: string): void {
    if (type === 'video') {
      this.router.navigate(['/events-video']);
      return;
    }
    this.router.navigate(['/gallery-events']);
  }

  navigateToHoF(): void {
    this.router.navigate(['/hallOfFame']);
  }

  private extractYouTubeVideoId(url: string | undefined): string | null {
    if (!url) return null;

    const regex =
      /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/;
    const match = url.match(regex);
    return match ? match[1] : null;
  }
}
