import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="bg-white p-6 rounded-lg shadow-sm">
      <div class="flex justify-between items-center mb-4">
        <h2 class="text-lg">{{currentMonth}} {{currentYear}}</h2>
        <div class="flex gap-2">
          <button 
            class="p-1 hover:bg-gray-100 rounded"
            (click)="previousMonth()"
          >
            ←
          </button>
          <button 
            class="p-1 hover:bg-gray-100 rounded"
            (click)="nextMonth()"
          >
            →
          </button>
        </div>
      </div>

      <div class="grid grid-cols-7 gap-1 text-center text-sm">
        <div class="font-medium">Su</div>
        <div class="font-medium">Mo</div>
        <div class="font-medium">Tu</div>
        <div class="font-medium">We</div>
        <div class="font-medium">Th</div>
        <div class="font-medium">Fr</div>
        <div class="font-medium">Sa</div>

        @for (day of calendarDays; track day.date) {
          <div 
            class="p-2 hover:bg-gray-100 cursor-pointer rounded"
            [class.text-gray-400]="!day.isCurrentMonth"
          >
            {{day.date}}
          </div>
        }
      </div>
    </div>
  `
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