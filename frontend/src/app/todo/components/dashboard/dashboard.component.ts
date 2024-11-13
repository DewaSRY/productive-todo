import { Component } from '@angular/core';


interface Series{
  name: string;
  value: number;
}

interface CalendarData{
  series: Series[]
  name: string
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
  
export class DashboardComponent {
  
}
