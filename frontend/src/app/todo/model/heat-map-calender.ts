export interface Series{
    name: string;
    value: number;
  }
  
export interface CalendarData{
    series: Series[]
    name: string
}
export type Cuartel=  "Q1" | "Q2" | "Q3" | "Q4";

export interface HeatMapFilter{
  cuartel: Cuartel;
  year: string
}