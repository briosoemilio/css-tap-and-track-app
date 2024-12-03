export interface GetComputerLogRes {
  statusCode: number;
  message: string;
  data: ComputerLogDetails;
}

export interface ComputerLogDetails {
  id: number;
  uuid: string;
  startedAt: Date;
  endedAt: null;
  endedBy: number;
  createdAt: Date;
  updatedAt: Date;
  user: User;
  computer: Computer;
}

interface Computer {
  id: number;
  uuid: string;
  name: string;
  metadata: string;
  monitorName: string;
  keyboardName: string;
  mouseName: string;
  systemUnitName: string;
  locationName: string;
  others: string[];
  createdAt: Date;
  updatedAt: Date;
  lastLogUUID: string;
}

interface User {
  id: number;
  uuid: string;
  email: string;
  password: string;
  name: string;
  role: string;
  yearSection: string;
  idNumber: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface EndComputerLogRes {
  statusCode: number;
  message: string;
  data: ComputerLog;
}

export interface CreateComputerLogRes {
  statusCode: number;
  message: string;
  data: ComputerLog;
}

export interface ComputerLog {
  id: number;
  uuid: string;
  userId: number;
  computerId: number;
  startedAt: Date;
  endedAt: Date;
  endedBy: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface GetAllComputerLogsRes {
  statusCode: number;
  message: string;
  data: GetAllComputerLogsData;
}

export interface GetAllComputerLogsData {
  data: ComputerLog[];
  total: number;
  page: number;
  itemsPerPage: number;
}
