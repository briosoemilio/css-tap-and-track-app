export interface CreateReportRes {
  statusCode: number;
  message: string;
  data: Data;
}

export interface Data {
  id: number;
  uuid: string;
  itemId: number;
  reportedBy: number;
  remarks: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface GetReportListRes {
  statusCode: number;
  message: string;
  data: Data;
}

export interface Data {
  data: ReportDetails[];
  total: number;
  page: number;
  itemsPerPage: number;
}

export interface ReportDetails {
  id: number;
  uuid: string;
  itemId: number;
  reportedBy: number;
  remarks: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface GenerateReportRes {
  statusCode: number;
  message: string;
  data: GenerateReportResData;
}

export interface GenerateReportResData {
  reportStart: Date;
  reportEnd: Date;
  reportsGenerated: number;
  mostReportedItem: MostReportedItem;
  topReporter: TopReporter;
  categoryReportCounts: CategoryReportCounts;
  locationWithMostReports: LocationWithMostReports;
}

export interface CategoryReportCounts {
  MOUSE?: number;
  MONITOR?: number;
  KEYBOARD?: number;
  SYSTEM_UNIT?: number;
}

export interface LocationWithMostReports {
  locationName: string;
  count: number;
}

export interface MostReportedItem {
  item: Item;
  count: number;
}

export interface Item {
  name: string;
  category: string;
  location: string;
}

export interface TopReporter {
  user: User;
  count: number;
}

export interface User {
  name: string;
  email: string;
  yearSection: string;
}
