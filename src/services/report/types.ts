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
