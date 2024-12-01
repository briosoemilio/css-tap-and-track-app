export interface GetItemRes {
  statusCode: number;
  message: string;
  data: ItemDetails;
}

export interface ItemDetails {
  id: number;
  uuid: string;
  name: string;
  metadata: string;
  status: string;
  categoryName: string;
  locationName: string;
  createdAt: Date;
  updatedAt: Date;
  computerId: null;
}

export interface GetAllItemsRes {
  statusCode: number;
  message: string;
  data: GetAllItemsResData;
}

export interface GetAllItemsResData {
  data: ItemDetails[];
  total: number;
  page: number;
  itemsPerPage: number;
}

export interface CreateItemRes {
  statusCode: number;
  message: string;
  data: ItemDetails;
}

export interface UpdateItemLocationRes {
  statusCode: number;
  message: string;
  data: ItemDetails;
}

export interface UpdateItemStatusRes {
  statusCode: number;
  message: string;
  data: ItemDetails;
}
