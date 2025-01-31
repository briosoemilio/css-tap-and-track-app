export interface CreateMaintenanceRes {
  statusCode: number;
  message: string;
  data: MaintenanceDetails;
}

export interface MaintenanceDetails {
  id: number;
  uuid: string;
  computerId: number;
  scheduledBy: number;
  scheduleDate: Date;
  createdAt: Date;
  updatedAt: Date;
  isDone: boolean;
}

export interface GetAllMaintenanceRes {
  statusCode: number;
  message: string;
  data: GetAllMaintenanceResData;
}

export interface GetAllMaintenanceResData {
  data: MaintenanceDetails[];
  total: number;
  page: number;
  itemsPerPage: number;
}

export interface MarkAsDoneRes {
  statusCode: number;
  message: string;
  data: MaintenanceDetails;
}