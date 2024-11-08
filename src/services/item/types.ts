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
