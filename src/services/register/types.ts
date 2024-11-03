export interface RegisterRes {
  statusCode: number;
  message: string;
  data: Data;
}

export interface Data {
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
