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
        studentName: 'Deekshitha Salagundi',
        class: '10C',
        achievement:
          'Selected for National Level Young Indians Parliament (YIP) -2025 which will be held in Delhi.',
        imageUrl: '../../../assets/hallofFame/deekshitha10C.jpg',
      },
      {
        id: 2,
        studentName: 'Vaibhav Vittal',
        class: '9B',
        achievement:
          'Selected for state level wrestling competition - 2025 organised by : Department of Physical Education.',
        imageUrl: '../../../assets/hallofFame/vaibhav9b.jpg',
      },
      {
        id: 3,
        studentName: 'Sushruth',
        class: '10C',
        achievement:
          'Selected for state level wrestling competition - 2025. Organised by : Department of Physical Education',
        imageUrl: '../../../assets/hallofFame/sushruth10C.jpg',
      },
      {
        id: 4,
        studentName: 'Srujan S',
        class: '10A',
        achievement:
          'Selected for state level Handball-2025. Organised by : Department of Physical Education',
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
