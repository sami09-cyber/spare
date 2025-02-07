import { Component } from '@angular/core';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.css'
})
export class CalendarComponent {
  currentMonth = 'January';
  currentYear = 2025;
  calendarDays = this.generateCalendarDays();

  generateCalendarDays() {
    // This is a simplified version. You would want to implement proper calendar logic
    const days = [];
    for (let i = 1; i <= 31; i++) {
      days.push({
        date: i,
        isCurrentMonth: true
      });
    }
    return days;
  }

  previousMonth() {
    // Implement previous month logic
  }

  nextMonth() {
    // Implement next month logic
  }
}
