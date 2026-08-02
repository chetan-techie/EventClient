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
      studentName: 'Shravya M',
      class: '7B',
      achievement:
        'Karnataka State Amature Yoga Sports Association organized Yogasana Sports Championship on 6th and 7th June at Yellapura in which Shravya M of class 7B secured Fourth Place.',
      imageUrl: '../../../assets/hallofFame/yogasanaShravya7B.jpg',
    },
    {
      id: 2,
      studentName: 'Nanaiah C M',
      class: '8B',
      achievement:
        'INTERNATIONAL OKINAWA SHORIN KAI KOBUDO, Bogadi organized International Level Karate Championship on 5th April 2026 in which Nanaiah C M of 8B secured First Rank in Black Belt 1st DAN and completed Kobudo examination successfully.',
      imageUrl: '../../../assets/hallofFame/nanaiah8B.jpg',
    },
    {
      id: 3,
      studentName: 'Dhanvitha',
      class: '10C',
      achievement:
        '26th June 2026: Dhanvitha of 10C secured Independent Voice of the House award in the YIP, Quorum Hotel Mysore.',
      imageUrl: '../../../assets/hallofFame/dhanvitha10C.jpg',
    },
    {
      id: 4,
      studentName: 'Smt. Amulya H. L',
      class: 'Faculty',
      achievement:
        '5th July 2026: National Level Open Yogasana Sports Championship – 2026. Smt. Amulya H. L represented the school and participated in the championship held at University Yoga Bhavana, Mysuru.',
      imageUrl: '../../../assets/hallofFame/amulyaFaculty.jpg',
    },
    {
      id: 5,
      studentName: 'Arnav S & Sanvi A V',
      class: '8C & 9C',
      achievement:
        'JSS Mahavidyapeetha organized Open Day 2026 on 6th June 2026 in which Arnav S of 8C bagged first prize on the theme Health and Sanvi A V of 9C secured first place on the theme Environment.',
      imageUrl: '../../../assets/hallofFame/arnavSanvi.jpg',
    },
    {
      id: 6,
      studentName: 'Students',
      class: '5C, 6C, 5A, 7B',
      achievement:
        'Adhya Gangamma of 5C, Dhyuthishree D. of 6C and Bhuvana Santhosh of 5A secured Distinction and Kaveri M. of 7B secured I class in the Bharatanatyam Examination conducted by Akhila Bharatiya Gandharva Mahavidyalaya Mandal, Mumbai.',
      imageUrl: '../../../assets/hallofFame/bhartanatyamfeb26.jpg',
    },
    {
      id: 7,
      studentName: 'Arnav S',
      class: '7 STD',
      achievement:
        'Took part in the Viksit Bharat Buildathon (VBB) 2025 and successfully submitted an innovative idea/prototype addressing real-world community challenges. He has successfully completed the Design Thinking & Innovation Course as part of School Innovation Marathon 2025-26.',
      imageUrl: '../../../assets/hallofFame/ArnavS.jpg',
    },
    {
      id: 8,
      studentName: 'Deekshitha Salagundi',
      class: '10C',
      achievement:
        'Awarded the Certificate of Excellence at the National-level YIP held in Delhi for her outstanding performance and commendable achievement.',
      imageUrl: '../../../assets/hallofFame/deekshitha10C_1.jpg',
    },
    {
      id: 9,
      studentName: 'Deekshitha Salagundi',
      class: '10C',
      achievement:
        'Selected for National Level Young Indians Parliament (YIP) -2025 which will be held in Delhi.',
      imageUrl: '../../../assets/hallofFame/deekshitha10C.jpg',
    },
    {
      id: 10,
      studentName: 'Vaibhav Vittal',
      class: '9B',
      achievement:
        'Selected for state level wrestling competition - 2025 organised by : Department of Physical Education.',
      imageUrl: '../../../assets/hallofFame/vaibhav9b.jpg',
    },
    {
      id: 11,
      studentName: 'Sushruth',
      class: '10C',
      achievement:
        'Selected for state level wrestling competition - 2025. Organised by : Department of Physical Education',
      imageUrl: '../../../assets/hallofFame/sushruth10C.jpg',
    },
    {
      id: 12,
      studentName: 'Srujan S',
      class: '10A',
      achievement:
        'Selected for state level Handball-2025. Organised by : Department of Physical Education',
      imageUrl: '../../../assets/hallofFame/srujan10A.jpg',
    },
    {
      id: 13,
      studentName: 'Gowrishree S',
      class: '9C',
      achievement: 'Group Level Best Cadet in NCC 3 Kar Battalion',
      imageUrl: '../../../assets/hallofFame/thumbnail1.jpg',
    },
    {
      id: 14,
      studentName: 'Pareekshith Raj P',
      class: '8C',
      achievement: 'Bagged prizes in Bhagavad Gita and Singing Competitions',
      imageUrl: '../../../assets/hallofFame/thumbnail2.jpg',
    },
    {
      id: 15,
      studentName: 'Pranamya Prasad',
      class: '8C',
      achievement: 'Bagged prizes in Karate Competitions',
      imageUrl: '../../../assets/hallofFame/thumbnail3.jpg',
    },
  ];

  swiper: any = {};
  isLoading: boolean = true;

  constructor(
    private router: Router,
    private es: EventsService,
  ) {
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
      (testimonial) => testimonial.priority === priority,
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
            new Date(b.eventDate).getTime() - new Date(a.eventDate).getTime(),
        )
        .slice(0, 3);

      this.videoEvents = events
        .filter((e: any) => e.eventType === 'video' && e.active)
        .sort(
          (a: any, b: any) =>
            new Date(b.eventDate).getTime() - new Date(a.eventDate).getTime(),
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
