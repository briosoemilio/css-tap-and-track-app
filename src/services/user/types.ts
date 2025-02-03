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
  metadata: string;
  cardKey: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ChangeSectionRes {
  statusCode: number;
  message: string;
  data: UserDetails;
}

export interface ChangePasswordRes {
  statusCode: number;
  message: string;
  data: UserDetails;
}

export interface WriteCardKeyRes {
  statusCode: number;
  message: string;
  data: UserDetails;
}

export interface CardKeyCheckRes {
  statusCode: number;
  message: string;
  data: { isCardKeyUsed: boolean };
}
