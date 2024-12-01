export interface GetAllLocationsRes {
  statusCode: number;
  message: string;
  data: GetAllLocationsResData;
}

interface GetAllLocationsResData {
  data: LocationDetails[];
  total: number;
  page: number;
  itemsPerPage: number;
}

export interface LocationDetails {
  id: number;
  uuid: string;
  name: string;
  floor: string;
  metadata: null;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateLocationRes {
  statusCode: number;
  message: string;
  data: LocationDetails;
}
