export interface LoginRes {
  statusCode: number;
  message: string;
  data: Data;
}

interface Data {
  token: string;
}

export interface CheckAdminRes {
  statusCode: number;
  message: string;
  data: CheckAdminResData;
}

export interface CheckAdminResData {
  isAdmin: boolean;
  message: string;
}
