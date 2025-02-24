export enum StatisticsDateRange {
   WEEK = "week",
   MONTH = "month",
   YEAR = "year",
}
export interface DataItem {
   date: string;
   speed: number;
   accuracy: number;
}

export interface GroupedDataItem {
   date: string;
   speed: number;
   accuracy: number;
   count: number
}