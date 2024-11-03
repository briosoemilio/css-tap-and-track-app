export interface LoginRes {
  statusCode: number;
  message: string;
  data: Data;
}

interface Data {
  token: string;
}
