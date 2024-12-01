export interface GetUserDetailsRes {
  statusCode: number;
  message: string;
  data: UserDetails;
}

export interface GetAllUsersRes {
  statusCode: number;
  message: string;
  data: { data: UserDetails[] };
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

export interface ChangeSectionRes {
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
  isLogged: boolean;
  createdAt: Date;
  updatedAt: Date;
}
