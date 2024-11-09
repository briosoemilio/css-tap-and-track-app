export interface GetUserDetailsRes {
  statusCode: number;
  message: string;
  data: UserDetails;
}

export interface UserDetails {
  id: number;
  uuid: string;
  email: string;
  password: string;
  name: string;
  role: string;
  yearSection: null;
  idNumber: string;
  createdAt: Date;
  updatedAt: Date;
}
