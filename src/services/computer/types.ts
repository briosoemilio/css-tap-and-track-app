export interface GetComputerRes {
  statusCode: number;
  message: string;
  data: ComputerDetails;
}

export interface ComputerDetails {
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
  status: string;
  isArchived: boolean;
}

export interface GetComputerStatusRes {
  statusCode: number;
  message: string;
  data: ComputerStatusDetails;
}

export interface ComputerStatusDetails {
  computerStatus: string;
  inRepairComponents: InRepairComponent[];
}

export interface InRepairComponent {
  id: number;
  name: string;
  uuid: string;
  status: string;
}

export interface GetAllComputersRes {
  statusCode: number;
  message: string;
  data: GetAllComputersResData;
}

export interface GetAllComputersResData {
  data: ComputerDetails[];
  total: number;
  page: number;
  itemsPerPage: number;
}

export interface CreateComputerRes {
  statusCode: number;
  message: string;
  data: ComputerDetails;
}

export interface ArchiveComputerRes {
  statusCode: number;
  message: string;
  data: ComputerDetails;
}

export interface UnarchiveComputerRes {
  statusCode: number;
  message: string;
  data: ComputerDetails;
}
