import { Component, OnInit } from '@angular/core';

interface HallOfFameEntry {
  id: number;
  studentName: string;
  class: string;
  achievement: string;
  imageUrl: string;
  externalLink?: string;
}

@Component({
  selector: 'app-hall-of-fame',
  templateUrl: './hall-of-fame.component.html',
  styleUrls: ['./hall-of-fame.component.css'],
})
export class HallOfFameComponent implements OnInit {
  hallOfFameEntries: HallOfFameEntry[] = [];

  constructor() {}

  ngOnInit(): void {
    this.loadHallOfFameData();
  }

  loadHallOfFameData(): void {
    // Mock data - will be replaced with API call later
    this.hallOfFameEntries = [
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
  }

  // Method to be used when API is ready
  // loadHallOfFameFromAPI(): void {
  //   this.hallOfFameService.getHallOfFameEntries().subscribe({
  //     next: (data: HallOfFameEntry[]) => {
  //       this.hallOfFameEntries = data;
  //     },
  //     error: (error) => {
  //       console.error('Error loading Hall of Fame data:', error);
  //     }
  //   });
  // }
}
