export interface Series{
    name: string;
    value: number;
  }
  
export interface CalendarData{
    series: Series[]
    name: string
}


export interface HeatMapFilter{
  cuartel: "Q1" | "Q2" | "Q3" | "Q4";
  year: string
}