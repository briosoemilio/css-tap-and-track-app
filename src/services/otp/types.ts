export interface CreateOtpRes {
  statusCode: number;
  message: string;
  data: Data;
}

export interface Data {
  email: string;
  otp: string;
}
