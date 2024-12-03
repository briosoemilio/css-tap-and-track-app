export interface GetCategoriesRes {
  statusCode: number;
  message: string;
  data: GetCategoriesResData;
}

interface GetCategoriesResData {
  data: CategoryData[];
  total: number;
  page: number;
  itemsPerPage: number;
}

export interface CategoryData {
  id: number;
  uuid: string;
  name: string;
  metadata: null;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateCategoryRes {
  statusCode: number;
  message: string;
  data: CategoryData;
}
