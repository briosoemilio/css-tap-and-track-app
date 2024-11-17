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
