import { Component, OnInit } from '@angular/core';

interface MonthlyReport {
  id: string;
  month: string;
  year: number;
  pdfUrl: string;
  title: string;
}

interface YearlyReports {
  year: number;
  reports: MonthlyReport[];
}

@Component({
  selector: 'app-monthly-reports',
  templateUrl: 'monthly-reports.component.html',
  styleUrls: ['monthly-reports.component.css'],
})
export class MonthlyReportsComponent implements OnInit {
  yearlyReports: YearlyReports[] = [];
  selectedReport: MonthlyReport | null = null;
  showPopup = false;

  // Mock data - replace with actual API call
  private mockData: MonthlyReport[] = [
    {
      id: '1',
      month: 'January',
      year: 2025,
      pdfUrl: 'assets/monthlyReport/January2025.pdf',
      title: 'January 2025 Report',
    },
    {
      id: '2',
      month: 'February',
      year: 2025,
      pdfUrl: 'assets/monthlyReport/February2025.pdf',
      title: 'February 2025 Report',
    },
    {
      id: '3',
      month: 'March',
      year: 2025,
      pdfUrl: 'assets/monthlyReport/March2025.pdf',
      title: 'March 2025 Report',
    },
    {
      id: '4',
      month: 'April',
      year: 2025,
      pdfUrl: 'assets/monthlyReport/April2025.pdf',
      title: 'April 2025 Report',
    },
    {
      id: '5',
      month: 'May',
      year: 2025,
      pdfUrl: 'assets/monthlyReport/May2025.pdf',
      title: 'May 2025 Report',
    },
    {
      id: '6',
      month: 'June',
      year: 2025,
      pdfUrl: 'assets/monthlyReport/June2025.pdf',
      title: 'June 2025 Report',
    },
    {
      id: '7',
      month: 'July',
      year: 2025,
      pdfUrl: 'assets/monthlyReport/July2025.pdf',
      title: 'July 2025 Report',
    },
    {
      id: '8',
      month: 'August',
      year: 2025,
      pdfUrl: 'assets/monthlyReport/August2025.pdf',
      title: 'August 2025 Report',
    },
    {
      id: '9',
      month: 'September',
      year: 2025,
      pdfUrl: 'assets/monthlyReport/September2025.pdf',
      title: 'September 2025 Report',
    },
  ];

  ngOnInit(): void {
    this.loadReports();
  }

  loadReports(): void {
    // Group reports by year
    const groupedByYear = this.mockData.reduce((acc, report) => {
      const existing = acc.find((item) => item.year === report.year);
      if (existing) {
        existing.reports.push(report);
      } else {
        acc.push({ year: report.year, reports: [report] });
      }
      return acc;
    }, [] as YearlyReports[]);

    // Sort years in descending order
    this.yearlyReports = groupedByYear.sort((a, b) => b.year - a.year);
  }

  openReport(report: MonthlyReport): void {
    this.selectedReport = report;
    this.showPopup = true;
    document.body.style.overflow = 'hidden';
  }

  closePopup(): void {
    this.showPopup = false;
    this.selectedReport = null;
    document.body.style.overflow = 'auto';
  }
}
