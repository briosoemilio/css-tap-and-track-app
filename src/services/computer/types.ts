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